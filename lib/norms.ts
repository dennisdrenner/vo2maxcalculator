/**
 * VO2 max percentile norms.
 *
 * Source: The Cooper Institute, Dallas, TX. Published VO2 max percentile norms
 * from the Aerobics Center Longitudinal Study. These are the same data underpinning
 * the ACSM Guidelines for Exercise Testing and Prescription, 11th ed., Table 4.7.
 *
 * Values are VO2 max in ml/kg/min, measured on treadmill with open-circuit spirometry.
 * Men and women, 20-79, in 10-year age brackets, at 5/10/25/50/75/90/95 percentiles.
 *
 * Last updated: 2026-04-13. If you update this file, update content on /methodology/ too.
 */

export type Sex = 'male' | 'female';
export type AgeBracket = '20-29' | '30-39' | '40-49' | '50-59' | '60-69' | '70-79';
export type Percentile = 5 | 10 | 25 | 50 | 75 | 90 | 95;

export interface NormEntry {
  sex: Sex;
  ageBracket: AgeBracket;
  percentiles: Record<Percentile, number>;
}

export const AGE_BRACKETS: AgeBracket[] = [
  '20-29',
  '30-39',
  '40-49',
  '50-59',
  '60-69',
  '70-79',
];

export const PERCENTILES: Percentile[] = [5, 10, 25, 50, 75, 90, 95];

export const ACSM_NORMS: NormEntry[] = [
  {
    sex: 'male',
    ageBracket: '20-29',
    percentiles: { 5: 29.0, 10: 32.1, 25: 40.1, 50: 48.0, 75: 55.2, 90: 61.8, 95: 66.3 },
  },
  {
    sex: 'male',
    ageBracket: '30-39',
    percentiles: { 5: 27.2, 10: 30.2, 25: 35.9, 50: 42.4, 75: 49.2, 90: 56.5, 95: 59.8 },
  },
  {
    sex: 'male',
    ageBracket: '40-49',
    percentiles: { 5: 24.2, 10: 26.8, 25: 31.9, 50: 37.8, 75: 45.0, 90: 52.1, 95: 55.6 },
  },
  {
    sex: 'male',
    ageBracket: '50-59',
    percentiles: { 5: 20.9, 10: 22.8, 25: 27.1, 50: 32.6, 75: 39.7, 90: 45.6, 95: 50.7 },
  },
  {
    sex: 'male',
    ageBracket: '60-69',
    percentiles: { 5: 17.4, 10: 19.8, 25: 23.7, 50: 28.2, 75: 34.5, 90: 40.3, 95: 43.0 },
  },
  {
    sex: 'male',
    ageBracket: '70-79',
    percentiles: { 5: 16.3, 10: 17.1, 25: 20.4, 50: 24.4, 75: 30.4, 90: 36.6, 95: 39.7 },
  },
  {
    sex: 'female',
    ageBracket: '20-29',
    percentiles: { 5: 21.7, 10: 23.9, 25: 30.5, 50: 37.6, 75: 44.7, 90: 51.3, 95: 56.0 },
  },
  {
    sex: 'female',
    ageBracket: '30-39',
    percentiles: { 5: 19.0, 10: 20.9, 25: 25.3, 50: 30.2, 75: 36.1, 90: 41.4, 95: 45.8 },
  },
  {
    sex: 'female',
    ageBracket: '40-49',
    percentiles: { 5: 17.0, 10: 18.8, 25: 22.1, 50: 26.7, 75: 32.4, 90: 38.4, 95: 41.7 },
  },
  {
    sex: 'female',
    ageBracket: '50-59',
    percentiles: { 5: 16.0, 10: 17.3, 25: 19.9, 50: 23.4, 75: 27.6, 90: 32.0, 95: 35.9 },
  },
  {
    sex: 'female',
    ageBracket: '60-69',
    percentiles: { 5: 13.4, 10: 14.6, 25: 17.2, 50: 20.0, 75: 23.8, 90: 27.0, 95: 29.4 },
  },
  {
    sex: 'female',
    ageBracket: '70-79',
    percentiles: { 5: 13.1, 10: 13.6, 25: 15.6, 50: 18.3, 75: 20.8, 90: 23.1, 95: 24.1 },
  },
];

/**
 * ACSM fitness categories are derived from percentile bands:
 *   <20th: Poor
 *   20-39th: Fair
 *   40-59th: Average
 *   60-79th: Good
 *   80-94th: Excellent
 *   ≥95th: Superior
 */
export type FitnessCategory =
  | 'Poor'
  | 'Fair'
  | 'Average'
  | 'Good'
  | 'Excellent'
  | 'Superior';

export function ageToBracket(age: number): AgeBracket {
  if (age < 20) return '20-29';
  if (age < 30) return '20-29';
  if (age < 40) return '30-39';
  if (age < 50) return '40-49';
  if (age < 60) return '50-59';
  if (age < 70) return '60-69';
  return '70-79';
}

export function bracketLabel(bracket: AgeBracket): string {
  return bracket.replace('-', '–');
}

export function bracketToDecadeSlug(bracket: AgeBracket): string {
  return bracket.startsWith('20')
    ? '20s'
    : bracket.startsWith('30')
    ? '30s'
    : bracket.startsWith('40')
    ? '40s'
    : bracket.startsWith('50')
    ? '50s'
    : bracket.startsWith('60')
    ? '60s'
    : '70s';
}

export function decadeSlugToBracket(slug: string): AgeBracket | null {
  const map: Record<string, AgeBracket> = {
    '20s': '20-29',
    '30s': '30-39',
    '40s': '40-49',
    '50s': '50-59',
    '60s': '60-69',
    '70s': '70-79',
  };
  return map[slug] ?? null;
}

export const DECADE_SLUGS = ['20s', '30s', '40s', '50s', '60s', '70s'] as const;
export type DecadeSlug = (typeof DECADE_SLUGS)[number];

export function getNorms(age: number, sex: Sex): Record<Percentile, number> {
  const bracket = ageToBracket(age);
  const entry = ACSM_NORMS.find((n) => n.sex === sex && n.ageBracket === bracket);
  if (!entry) throw new Error(`No norms for ${sex} ${bracket}`);
  return entry.percentiles;
}

/**
 * Returns the estimated percentile (0-100) for a VO2 max value.
 * Uses linear interpolation between known percentile breakpoints.
 * Values below p5 return a value <5; values above p95 return a value >95 (capped at 99).
 */
export function getPercentile(vo2max: number, age: number, sex: Sex): number {
  const norms = getNorms(age, sex);
  const points: Array<[Percentile, number]> = PERCENTILES.map((p) => [p, norms[p]]);

  if (vo2max <= points[0][1]) {
    const ratio = vo2max / points[0][1];
    return Math.max(1, Math.round(points[0][0] * ratio));
  }
  if (vo2max >= points[points.length - 1][1]) {
    const last = points[points.length - 1];
    const delta = vo2max - last[1];
    return Math.min(99, Math.round(last[0] + delta * 0.5));
  }

  for (let i = 0; i < points.length - 1; i++) {
    const [p1, v1] = points[i];
    const [p2, v2] = points[i + 1];
    if (vo2max >= v1 && vo2max <= v2) {
      const ratio = (vo2max - v1) / (v2 - v1);
      return Math.round(p1 + ratio * (p2 - p1));
    }
  }

  throw new Error('Unreachable percentile branch');
}

export function getCategory(percentile: number): FitnessCategory {
  if (percentile >= 95) return 'Superior';
  if (percentile >= 80) return 'Excellent';
  if (percentile >= 60) return 'Good';
  if (percentile >= 40) return 'Average';
  if (percentile >= 20) return 'Fair';
  return 'Poor';
}

export function categoryForVo2Max(
  vo2max: number,
  age: number,
  sex: Sex
): { percentile: number; category: FitnessCategory } {
  const percentile = getPercentile(vo2max, age, sex);
  return { percentile, category: getCategory(percentile) };
}
