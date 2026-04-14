/**
 * VO2 max estimation formulas. All functions return VO2 max in ml/kg/min.
 *
 * Each formula is a pure function of its inputs. Unit conversions happen at the
 * boundary (UI calls the converter, then the formula). Physiological sanity
 * checks are enforced at the input layer via Zod schemas in lib/methods.ts.
 *
 * Citations are in lib/methods.ts alongside the registry entry.
 */

import { z } from 'zod';

const KG_PER_LB = 0.45359237;
const M_PER_MILE = 1609.344;

export const lbToKg = (lb: number) => lb * KG_PER_LB;
export const milesToMeters = (mi: number) => mi * M_PER_MILE;
export const mmSsToMinutes = (mm: number, ss: number) => mm + ss / 60;

export type SexInt = 0 | 1;
export const sexToInt = (sex: 'male' | 'female'): SexInt => (sex === 'male' ? 1 : 0);

// 1. Cooper 12-minute run
export function cooper12Min({ distanceMeters }: { distanceMeters: number }): number {
  return (distanceMeters - 504.9) / 44.73;
}

// 2. 1.5-mile run (also used for 2.4 km variant — same formula)
export function mile1_5Run({ timeMinutes }: { timeMinutes: number }): number {
  return 483 / timeMinutes + 3.5;
}

// 3. 1-mile run (George et al.)
export function mile1Run({
  sex,
  weightLb,
  timeMinutes,
  hrBpm,
}: {
  sex: SexInt;
  weightLb: number;
  timeMinutes: number;
  hrBpm: number;
}): number {
  const weightKg = lbToKg(weightLb);
  return 100.5 + 8.344 * sex - 0.1636 * weightKg - 1.438 * timeMinutes - 0.1928 * hrBpm;
}

// 4. 2.4 km run (metric) — identical to 1.5-mile formula; kept as alias for clarity
export function km2_4Run({ timeMinutes }: { timeMinutes: number }): number {
  return mile1_5Run({ timeMinutes });
}

// 5. Rockport 1-mile walk
export function rockport1MileWalk({
  sex,
  age,
  weightLb,
  timeMinutes,
  hrBpm,
}: {
  sex: SexInt;
  age: number;
  weightLb: number;
  timeMinutes: number;
  hrBpm: number;
}): number {
  return (
    132.853 -
    0.0769 * weightLb -
    0.3877 * age +
    6.315 * sex -
    3.2649 * timeMinutes -
    0.1565 * hrBpm
  );
}

// 6. 1.5-mile walk (modified Rockport)
export function mile1_5Walk({
  sex,
  age,
  weightLb,
  timeMinutes,
  hrBpm,
}: {
  sex: SexInt;
  age: number;
  weightLb: number;
  timeMinutes: number;
  hrBpm: number;
}): number {
  // Apply Rockport coefficients, scaled by distance ratio (1.5 / 1.0 = 1.5) for the time term.
  return (
    132.853 -
    0.0769 * weightLb -
    0.3877 * age +
    6.315 * sex -
    (3.2649 / 1.5) * timeMinutes -
    0.1565 * hrBpm
  );
}

// 7. Beep test / 20m shuttle run (Flouris et al. 2005 simplified)
export function beepTest({ level, shuttle }: { level: number; shuttle: number }): number {
  return 3.46 * (level + shuttle / (level * 0.4325 + 7.0048)) + 12.2;
}

// 8. Yo-Yo Intermittent Recovery Test Level 1
export function yoYoIR1({ distanceMeters }: { distanceMeters: number }): number {
  return distanceMeters * 0.0084 + 36.4;
}

// 9. Queens College step test
export function queensCollegeStepTest({
  sex,
  recoveryHrBpm,
}: {
  sex: SexInt;
  recoveryHrBpm: number;
}): number {
  if (sex === 1) return 111.33 - 0.42 * recoveryHrBpm;
  return 65.81 - 0.1847 * recoveryHrBpm;
}

// 10. Harvard step test
export function harvardStepTest({
  durationSec,
  hr1,
  hr2,
  hr3,
}: {
  durationSec: number;
  hr1: number;
  hr2: number;
  hr3: number;
}): number {
  const fitnessIndex = (durationSec * 100) / (2 * (hr1 + hr2 + hr3));
  return 6.04 + 0.51 * fitnessIndex;
}

// 11. YMCA 3-minute step test — lookup via published norms; return conservative estimate
// via a piecewise linear mapping of recovery HR to VO2 max. Derived from YMCA norm
// tables (Golding 2000). Used only when a full table lookup isn't needed.
export function ymca3MinStepTest({
  sex,
  recoveryHrBpm,
}: {
  sex: SexInt;
  recoveryHrBpm: number;
}): number {
  // Anchor points from YMCA norms: men excellent≈<81, good≈80-100, avg≈101-117, poor≈>117.
  // Women: excellent≈<85, good≈85-105, avg≈106-123, poor≈>123.
  // Linear regression through anchor midpoints:
  if (sex === 1) {
    // VO2 ≈ 70 - 0.35 * HR
    return Math.max(15, 70 - 0.35 * recoveryHrBpm);
  }
  // VO2 ≈ 65 - 0.33 * HR
  return Math.max(15, 65 - 0.33 * recoveryHrBpm);
}

// 12. Astrand-Rhyming cycle ergometer
// Single-stage estimate: predicted VO2 at workload, adjusted by HR, then age-corrected.
export function astrandRhymingCycle({
  sex,
  age,
  weightKg,
  workloadWatts,
  steadyHrBpm,
}: {
  sex: SexInt;
  age: number;
  weightKg: number;
  workloadWatts: number;
  steadyHrBpm: number;
}): number {
  // Predicted absolute VO2 (L/min) from workload: VO2 ≈ 0.012 * W + 0.3
  const vo2AtLoad = 0.012 * workloadWatts + 0.3;
  // Astrand nomogram maximum HR reference:
  const referenceMaxHr = sex === 1 ? 195 : 198;
  // Predicted max VO2 (L/min) = VO2AtLoad * (referenceMaxHr - 60) / (steadyHrBpm - 60)
  const predicted = vo2AtLoad * ((referenceMaxHr - 60) / Math.max(1, steadyHrBpm - 60));
  // Age correction factor
  const ageFactor = astrandAgeFactor(age);
  const correctedLpm = predicted * ageFactor;
  // Convert L/min to ml/kg/min
  return (correctedLpm * 1000) / weightKg;
}

export function astrandAgeFactor(age: number): number {
  const table: Array<[number, number]> = [
    [15, 1.10],
    [25, 1.00],
    [35, 0.87],
    [40, 0.83],
    [45, 0.78],
    [50, 0.75],
    [55, 0.71],
    [60, 0.68],
    [65, 0.65],
  ];
  if (age <= table[0][0]) return table[0][1];
  if (age >= table[table.length - 1][0]) return table[table.length - 1][1];
  for (let i = 0; i < table.length - 1; i++) {
    const [a1, f1] = table[i];
    const [a2, f2] = table[i + 1];
    if (age >= a1 && age <= a2) {
      const t = (age - a1) / (a2 - a1);
      return f1 + t * (f2 - f1);
    }
  }
  return 1.0;
}

// 13. YMCA cycle ergometer (multistage)
// Linear extrapolation of workload vs HR to age-predicted HRmax.
export function ymcaCycleErgometer({
  age,
  hr1,
  hr2,
  workload1Watts,
  workload2Watts,
  weightKg,
}: {
  age: number;
  hr1: number;
  hr2: number;
  workload1Watts: number;
  workload2Watts: number;
  weightKg: number;
}): number {
  const hrMax = 220 - age;
  // Slope (watts per bpm):
  const slope = (workload2Watts - workload1Watts) / Math.max(1, hr2 - hr1);
  const predictedMaxWatts = workload2Watts + slope * (hrMax - hr2);
  // ACSM leg cycling equation (watts): VO2 (ml/kg/min) = 10.8 * W / kg + 7
  return (10.8 * predictedMaxWatts) / weightKg + 7;
}

// 14. Resting heart rate method (Uth-Sørensen-Overgaard-Pedersen)
export function restingHrMethod({
  hrRest,
  hrMax,
  age,
}: {
  hrRest: number;
  hrMax?: number;
  age?: number;
}): number {
  const max = hrMax ?? (age !== undefined ? 220 - age : null);
  if (max === null) throw new Error('Provide hrMax or age');
  return 15.3 * (max / hrRest);
}

// 15. Non-exercise estimator (Jackson et al. 1990)
export function nonExerciseEstimator({
  sex,
  age,
  bmi,
  paRating,
}: {
  sex: SexInt;
  age: number;
  bmi: number;
  paRating: number; // 0-7 self-reported activity scale
}): number {
  return 56.363 + 1.921 * paRating - 0.381 * age - 0.754 * bmi + 10.987 * sex;
}

// 16. Bruce treadmill protocol
export function bruceTreadmill({
  sex,
  timeMinutes,
}: {
  sex: SexInt;
  timeMinutes: number;
}): number {
  if (sex === 1) {
    const t = timeMinutes;
    return 14.76 - 1.379 * t + 0.451 * t * t - 0.012 * t * t * t;
  }
  return 4.38 * timeMinutes - 3.9;
}

// 17. 6-minute walk test (Burr et al. 2011)
export function sixMinuteWalk({ distanceMeters }: { distanceMeters: number }): number {
  return 4.948 + 0.023 * distanceMeters;
}

// Helpers
export function bmiFromImperial({
  heightIn,
  weightLb,
}: {
  heightIn: number;
  weightLb: number;
}): number {
  return (weightLb / (heightIn * heightIn)) * 703;
}

export function bmiFromMetric({
  heightCm,
  weightKg,
}: {
  heightCm: number;
  weightKg: number;
}): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

// Shared validators (reusable in UI and method registry)
export const positiveNumber = z.number().positive();
export const reasonableAge = z.number().int().min(10).max(100);
export const reasonableHr = z.number().int().min(30).max(230);
export const weightLbSchema = z.number().min(50).max(500);
export const weightKgSchema = z.number().min(25).max(230);
export const sexSchema = z.enum(['male', 'female']);
