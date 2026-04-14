import { describe, it, expect } from 'vitest';
import {
  astrandAgeFactor,
  astrandRhymingCycle,
  beepTest,
  bmiFromImperial,
  bruceTreadmill,
  cooper12Min,
  harvardStepTest,
  km2_4Run,
  lbToKg,
  mile1Run,
  mile1_5Run,
  mile1_5Walk,
  milesToMeters,
  mmSsToMinutes,
  nonExerciseEstimator,
  queensCollegeStepTest,
  restingHrMethod,
  rockport1MileWalk,
  sixMinuteWalk,
  ymca3MinStepTest,
  ymcaCycleErgometer,
  yoYoIR1,
} from '@/lib/formulas';

const close = (actual: number, expected: number, tol = 0.2) => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tol);
};

describe('unit converters', () => {
  it('lbToKg', () => close(lbToKg(150), 68.04));
  it('milesToMeters', () => close(milesToMeters(1), 1609.344, 0.01));
  it('mmSsToMinutes', () => close(mmSsToMinutes(10, 30), 10.5, 0.001));
});

describe('Cooper 12-min run', () => {
  it('2800m → ~51.4', () => close(cooper12Min({ distanceMeters: 2800 }), 51.37));
  it('2400m → ~42.4', () => close(cooper12Min({ distanceMeters: 2400 }), 42.41));
  it('1600m → ~24.5', () => close(cooper12Min({ distanceMeters: 1600 }), 24.48));
});

describe('1.5-mile run', () => {
  it('10:30 → ~49.5', () => close(mile1_5Run({ timeMinutes: 10.5 }), 49.5));
  it('12:00 → ~43.75', () => close(mile1_5Run({ timeMinutes: 12 }), 43.75));
  it('15:00 → ~35.7', () => close(mile1_5Run({ timeMinutes: 15 }), 35.7));
});

describe('1-mile run (George)', () => {
  it('male 160lb 7:30 hr170', () => {
    const v = mile1Run({ sex: 1, weightLb: 160, timeMinutes: 7.5, hrBpm: 170 });
    expect(v).toBeGreaterThan(40);
    expect(v).toBeLessThan(70);
  });
  it('female 130lb 9:00 hr180', () => {
    const v = mile1Run({ sex: 0, weightLb: 130, timeMinutes: 9, hrBpm: 180 });
    expect(v).toBeGreaterThan(25);
    expect(v).toBeLessThan(55);
  });
  it('increases when time decreases', () => {
    const fast = mile1Run({ sex: 1, weightLb: 160, timeMinutes: 6, hrBpm: 170 });
    const slow = mile1Run({ sex: 1, weightLb: 160, timeMinutes: 9, hrBpm: 170 });
    expect(fast).toBeGreaterThan(slow);
  });
});

describe('2.4 km run', () => {
  it('matches 1.5-mile formula', () => {
    const a = km2_4Run({ timeMinutes: 12 });
    const b = mile1_5Run({ timeMinutes: 12 });
    expect(a).toBeCloseTo(b, 6);
  });
});

describe('Rockport 1-mile walk', () => {
  it('45yr male 180lb 14:00 hr140', () => {
    const v = rockport1MileWalk({
      sex: 1,
      age: 45,
      weightLb: 180,
      timeMinutes: 14,
      hrBpm: 140,
    });
    expect(v).toBeGreaterThan(25);
    expect(v).toBeLessThan(55);
  });
  it('30yr female 150lb 15:00 hr150', () => {
    const v = rockport1MileWalk({
      sex: 0,
      age: 30,
      weightLb: 150,
      timeMinutes: 15,
      hrBpm: 150,
    });
    expect(v).toBeGreaterThan(20);
    expect(v).toBeLessThan(45);
  });
  it('decreases with age', () => {
    const young = rockport1MileWalk({
      sex: 1, age: 30, weightLb: 170, timeMinutes: 14, hrBpm: 140,
    });
    const old = rockport1MileWalk({
      sex: 1, age: 60, weightLb: 170, timeMinutes: 14, hrBpm: 140,
    });
    expect(young).toBeGreaterThan(old);
  });
});

describe('1.5-mile walk', () => {
  it('returns plausible value', () => {
    const v = mile1_5Walk({
      sex: 1,
      age: 40,
      weightLb: 180,
      timeMinutes: 22,
      hrBpm: 140,
    });
    expect(v).toBeGreaterThan(20);
    expect(v).toBeLessThan(55);
  });
});

describe('Beep test', () => {
  it('L5 S5 ~31.4', () => close(beepTest({ level: 5, shuttle: 5 }), 31.4, 0.5));
  it('L10 S8 ~49', () => close(beepTest({ level: 10, shuttle: 8 }), 49.4, 1.5));
  it('L13 S10 ~59', () => close(beepTest({ level: 13, shuttle: 10 }), 59.6, 1.5));
});

describe('Yo-Yo IR1', () => {
  it('1000m → 44.8', () => close(yoYoIR1({ distanceMeters: 1000 }), 44.8));
  it('2000m → 53.2', () => close(yoYoIR1({ distanceMeters: 2000 }), 53.2));
  it('500m → 40.6', () => close(yoYoIR1({ distanceMeters: 500 }), 40.6));
});

describe('Queens College step test', () => {
  it('male HR160 → 44.13', () => close(queensCollegeStepTest({ sex: 1, recoveryHrBpm: 160 }), 44.13));
  it('female HR160 → 36.26', () => close(queensCollegeStepTest({ sex: 0, recoveryHrBpm: 160 }), 36.26));
  it('decreases with higher HR', () => {
    const low = queensCollegeStepTest({ sex: 1, recoveryHrBpm: 140 });
    const high = queensCollegeStepTest({ sex: 1, recoveryHrBpm: 180 });
    expect(low).toBeGreaterThan(high);
  });
});

describe('Harvard step test', () => {
  it('300s duration, HR 80/75/70 → ~40', () => {
    const v = harvardStepTest({ durationSec: 300, hr1: 80, hr2: 75, hr3: 70 });
    close(v, 40.04, 0.5);
  });
  it('short duration gives lower VO2', () => {
    const short = harvardStepTest({ durationSec: 120, hr1: 90, hr2: 85, hr3: 80 });
    const long = harvardStepTest({ durationSec: 300, hr1: 80, hr2: 75, hr3: 70 });
    expect(long).toBeGreaterThan(short);
  });
});

describe('YMCA 3-min step test', () => {
  it('male HR85 → good', () => {
    const v = ymca3MinStepTest({ sex: 1, recoveryHrBpm: 85 });
    expect(v).toBeGreaterThan(35);
  });
  it('female HR130 → poor', () => {
    const v = ymca3MinStepTest({ sex: 0, recoveryHrBpm: 130 });
    expect(v).toBeLessThan(30);
  });
  it('clamps at 15', () => {
    const v = ymca3MinStepTest({ sex: 0, recoveryHrBpm: 220 });
    expect(v).toBeGreaterThanOrEqual(15);
  });
});

describe('Astrand-Rhyming cycle', () => {
  it('returns plausible value for 30yr male', () => {
    const v = astrandRhymingCycle({
      sex: 1,
      age: 30,
      weightKg: 75,
      workloadWatts: 150,
      steadyHrBpm: 150,
    });
    expect(v).toBeGreaterThan(25);
    expect(v).toBeLessThan(70);
  });
  it('age factor at 25 is 1.0', () => expect(astrandAgeFactor(25)).toBeCloseTo(1.0, 2));
  it('age factor at 60 is 0.68', () => expect(astrandAgeFactor(60)).toBeCloseTo(0.68, 2));
});

describe('YMCA cycle ergometer', () => {
  it('returns plausible value', () => {
    const v = ymcaCycleErgometer({
      age: 35,
      hr1: 120,
      hr2: 150,
      workload1Watts: 100,
      workload2Watts: 150,
      weightKg: 75,
    });
    expect(v).toBeGreaterThan(20);
    expect(v).toBeLessThan(70);
  });
});

describe('Resting HR method', () => {
  it('HRmax 190 / HRrest 60 → 48.45', () => {
    close(restingHrMethod({ hrRest: 60, hrMax: 190 }), 48.45);
  });
  it('infers HRmax from age', () => {
    const v = restingHrMethod({ hrRest: 60, age: 30 });
    close(v, 15.3 * (190 / 60));
  });
  it('higher resting HR → lower VO2', () => {
    const low = restingHrMethod({ hrRest: 50, hrMax: 190 });
    const high = restingHrMethod({ hrRest: 80, hrMax: 190 });
    expect(low).toBeGreaterThan(high);
  });
});

describe('Non-exercise estimator', () => {
  it('30yr male PA=5 BMI=24', () => {
    const v = nonExerciseEstimator({ sex: 1, age: 30, bmi: 24, paRating: 5 });
    expect(v).toBeGreaterThan(30);
    expect(v).toBeLessThan(70);
  });
  it('higher activity → higher VO2', () => {
    const sed = nonExerciseEstimator({ sex: 1, age: 30, bmi: 24, paRating: 0 });
    const active = nonExerciseEstimator({ sex: 1, age: 30, bmi: 24, paRating: 7 });
    expect(active).toBeGreaterThan(sed);
  });
});

describe('Bruce treadmill', () => {
  it('male 12 min → ~42', () => close(bruceTreadmill({ sex: 1, timeMinutes: 12 }), 42.42, 0.5));
  it('female 10 min → ~40', () => close(bruceTreadmill({ sex: 0, timeMinutes: 10 }), 39.9, 1));
  it('male longer → higher', () => {
    const a = bruceTreadmill({ sex: 1, timeMinutes: 9 });
    const b = bruceTreadmill({ sex: 1, timeMinutes: 15 });
    expect(b).toBeGreaterThan(a);
  });
});

describe('6-minute walk test', () => {
  it('500m → ~16.4', () => close(sixMinuteWalk({ distanceMeters: 500 }), 16.45));
  it('600m → ~18.7', () => close(sixMinuteWalk({ distanceMeters: 600 }), 18.75));
  it('400m → ~14.1', () => close(sixMinuteWalk({ distanceMeters: 400 }), 14.15));
});

describe('BMI helpers', () => {
  it('imperial 170lb 70in → ~24.4', () => close(bmiFromImperial({ heightIn: 70, weightLb: 170 }), 24.4));
});
