/**
 * Method registry — the single source of truth tying each test method to its
 * formula, input schema, UI labels, and citation. The calculator component, the
 * /methods hub, and every per-method page iterate this registry.
 */

import {
  astrandRhymingCycle,
  beepTest,
  bruceTreadmill,
  cooper12Min,
  harvardStepTest,
  km2_4Run,
  lbToKg,
  mile1Run,
  mile1_5Run,
  mile1_5Walk,
  milesToMeters,
  nonExerciseEstimator,
  queensCollegeStepTest,
  restingHrMethod,
  rockport1MileWalk,
  sexToInt,
  sixMinuteWalk,
  ymca3MinStepTest,
  ymcaCycleErgometer,
  yoYoIR1,
} from './formulas';

export type UnitSystem = 'imperial' | 'metric';
export type Sex = 'male' | 'female';

export type InputType =
  | 'number'
  | 'time-mmss'
  | 'distance' // unit-aware: meters/miles depending on unit system
  | 'weight' // unit-aware: lb/kg
  | 'height' // unit-aware: in/cm
  | 'sex'
  | 'integer'
  | 'pa-rating';

export interface MethodInput {
  key: string;
  label: string;
  type: InputType;
  help?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface MethodMeta {
  slug: string;
  displayName: string;
  shortName: string;
  category: 'run' | 'walk' | 'cycle' | 'step' | 'shuttle' | 'treadmill' | 'non-exercise';
  equipment: string;
  timeMinutes: number;
  accuracy: 'high' | 'moderate' | 'low';
  description: string;
  citation: string;
  /** Optional PubMed or DOI URL for the primary source. Rendered as link when present. */
  citationUrl?: string;
  inputs: MethodInput[];
  /**
   * Called with a normalized input object (units converted to formula-expected form).
   * The orchestrator in components/Calculator handles conversion via `normalize`.
   */
  compute: (normalized: Record<string, number>) => number;
  /** Converts raw form values (numbers + sex enum) + unit system to formula-ready numbers. */
  normalize: (raw: Record<string, unknown>, units: UnitSystem) => Record<string, number>;
}

export const METHODS: MethodMeta[] = [
  {
    slug: 'cooper-12-minute-run',
    displayName: 'Cooper 12-Minute Run',
    shortName: 'Cooper 12-min',
    category: 'run',
    equipment: 'Track or flat course',
    timeMinutes: 12,
    accuracy: 'high',
    description:
      'Run as far as possible in 12 minutes. VO2 max is estimated from total distance covered.',
    citation:
      'Cooper KH. A means of assessing maximal oxygen intake. JAMA. 1968;203(3):201-204.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/5694044/',
    inputs: [
      {
        key: 'distance',
        label: 'Distance covered in 12 minutes',
        type: 'distance',
        help: 'Total distance — running track laps × 400m if using a track.',
      },
    ],
    compute: ({ distanceMeters }) => cooper12Min({ distanceMeters }),
    normalize: (raw, units) => {
      const d = Number(raw.distance);
      return { distanceMeters: units === 'imperial' ? milesToMeters(d) : d };
    },
  },
  {
    slug: '1-5-mile-run',
    displayName: '1.5-Mile Run',
    shortName: '1.5-mile run',
    category: 'run',
    equipment: 'Track or measured 1.5-mile route',
    timeMinutes: 15,
    accuracy: 'high',
    description:
      'Run 1.5 miles as fast as possible. VO2 max is estimated from total time.',
    citation:
      'ACSM Guidelines for Exercise Testing and Prescription, 11th ed. 2021. Derived from George et al. 1993.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/8455458/',
    inputs: [
      { key: 'timeMm', label: 'Minutes', type: 'integer', min: 5, max: 30 },
      { key: 'timeSs', label: 'Seconds', type: 'integer', min: 0, max: 59 },
    ],
    compute: ({ timeMinutes }) => mile1_5Run({ timeMinutes }),
    normalize: (raw) => ({
      timeMinutes: Number(raw.timeMm) + Number(raw.timeSs) / 60,
    }),
  },
  {
    slug: '1-mile-run',
    displayName: '1-Mile Run',
    shortName: '1-mile run',
    category: 'run',
    equipment: 'Track, heart rate monitor',
    timeMinutes: 10,
    accuracy: 'high',
    description:
      'Run 1 mile as fast as possible. Requires final heart rate. Best for fit college-age adults.',
    citation:
      'George JD, Vehrs PR, Allsen PE, et al. Med Sci Sports Exerc. 1993;25(3):401-406.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/8455458/',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      { key: 'weight', label: 'Weight', type: 'weight' },
      { key: 'timeMm', label: 'Minutes', type: 'integer', min: 4, max: 20 },
      { key: 'timeSs', label: 'Seconds', type: 'integer', min: 0, max: 59 },
      {
        key: 'hr',
        label: 'Heart rate at finish (bpm)',
        type: 'integer',
        min: 80,
        max: 230,
      },
    ],
    compute: ({ sex, weightLb, timeMinutes, hrBpm }) =>
      mile1Run({ sex: sex as 0 | 1, weightLb, timeMinutes, hrBpm }),
    normalize: (raw, units) => {
      const w = Number(raw.weight);
      return {
        sex: sexToInt(raw.sex as Sex),
        weightLb: units === 'imperial' ? w : w / 0.45359237,
        timeMinutes: Number(raw.timeMm) + Number(raw.timeSs) / 60,
        hrBpm: Number(raw.hr),
      };
    },
  },
  {
    slug: '2-4-km-run',
    displayName: '2.4 km Run',
    shortName: '2.4 km run',
    category: 'run',
    equipment: 'Track or measured 2.4 km route',
    timeMinutes: 15,
    accuracy: 'high',
    description:
      'Metric equivalent of the 1.5-mile run (2.4 km ≈ 1.5 mi). Same formula applies.',
    citation: 'Derived from ACSM 11th ed. / George et al. 1993.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/8455458/',
    inputs: [
      { key: 'timeMm', label: 'Minutes', type: 'integer', min: 5, max: 30 },
      { key: 'timeSs', label: 'Seconds', type: 'integer', min: 0, max: 59 },
    ],
    compute: ({ timeMinutes }) => km2_4Run({ timeMinutes }),
    normalize: (raw) => ({
      timeMinutes: Number(raw.timeMm) + Number(raw.timeSs) / 60,
    }),
  },
  {
    slug: 'rockport-1-mile-walk',
    displayName: 'Rockport 1-Mile Walk',
    shortName: 'Rockport walk',
    category: 'walk',
    equipment: 'Track, heart rate monitor',
    timeMinutes: 15,
    accuracy: 'moderate',
    description:
      'Walk 1 mile as briskly as possible. Best option for lower fitness levels and older adults.',
    citation:
      'Kline GM, Porcari JP, Hintermeister R, et al. Med Sci Sports Exerc. 1987;19(3):253-259.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/3600239/',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      { key: 'weight', label: 'Weight', type: 'weight' },
      { key: 'timeMm', label: 'Minutes', type: 'integer', min: 8, max: 30 },
      { key: 'timeSs', label: 'Seconds', type: 'integer', min: 0, max: 59 },
      {
        key: 'hr',
        label: 'Heart rate at finish (bpm)',
        type: 'integer',
        min: 80,
        max: 230,
      },
    ],
    compute: ({ sex, age, weightLb, timeMinutes, hrBpm }) =>
      rockport1MileWalk({
        sex: sex as 0 | 1,
        age,
        weightLb,
        timeMinutes,
        hrBpm,
      }),
    normalize: (raw, units) => {
      const w = Number(raw.weight);
      return {
        sex: sexToInt(raw.sex as Sex),
        age: Number(raw.age),
        weightLb: units === 'imperial' ? w : w / 0.45359237,
        timeMinutes: Number(raw.timeMm) + Number(raw.timeSs) / 60,
        hrBpm: Number(raw.hr),
      };
    },
  },
  {
    slug: '1-5-mile-walk',
    displayName: '1.5-Mile Walk',
    shortName: '1.5-mile walk',
    category: 'walk',
    equipment: 'Track, heart rate monitor',
    timeMinutes: 22,
    accuracy: 'moderate',
    description:
      'Walk 1.5 miles as briskly as possible. Longer variant of Rockport; less validated.',
    citation: 'Modified Rockport (Kline et al. 1987).',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/3600239/',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      { key: 'weight', label: 'Weight', type: 'weight' },
      { key: 'timeMm', label: 'Minutes', type: 'integer', min: 12, max: 40 },
      { key: 'timeSs', label: 'Seconds', type: 'integer', min: 0, max: 59 },
      {
        key: 'hr',
        label: 'Heart rate at finish (bpm)',
        type: 'integer',
        min: 80,
        max: 230,
      },
    ],
    compute: ({ sex, age, weightLb, timeMinutes, hrBpm }) =>
      mile1_5Walk({
        sex: sex as 0 | 1,
        age,
        weightLb,
        timeMinutes,
        hrBpm,
      }),
    normalize: (raw, units) => {
      const w = Number(raw.weight);
      return {
        sex: sexToInt(raw.sex as Sex),
        age: Number(raw.age),
        weightLb: units === 'imperial' ? w : w / 0.45359237,
        timeMinutes: Number(raw.timeMm) + Number(raw.timeSs) / 60,
        hrBpm: Number(raw.hr),
      };
    },
  },
  {
    slug: 'beep-test',
    displayName: 'Beep Test (20m Shuttle)',
    shortName: 'Beep test',
    category: 'shuttle',
    equipment: '20m course, audio track',
    timeMinutes: 10,
    accuracy: 'high',
    description:
      'Multi-stage 20m shuttle run synchronized to audio beeps. Widely used for team sport athletes.',
    citation:
      'Flouris AD, Metsios GS, Koutedakis Y. Br J Sports Med. 2005;39(3):166-170.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/15728696/',
    inputs: [
      { key: 'level', label: 'Final level reached', type: 'integer', min: 1, max: 21 },
      { key: 'shuttle', label: 'Final shuttle within level', type: 'integer', min: 1, max: 16 },
    ],
    compute: ({ level, shuttle }) => beepTest({ level, shuttle }),
    normalize: (raw) => ({
      level: Number(raw.level),
      shuttle: Number(raw.shuttle),
    }),
  },
  {
    slug: 'yo-yo-intermittent-recovery',
    displayName: 'Yo-Yo Intermittent Recovery Test (Level 1)',
    shortName: 'Yo-Yo IR1',
    category: 'shuttle',
    equipment: '20m course, audio track',
    timeMinutes: 15,
    accuracy: 'moderate',
    description:
      '20m shuttles with 10s recovery. Designed for intermittent-sport athletes (soccer, basketball).',
    citation:
      'Bangsbo J, Iaia FM, Krustrup P. Sports Med. 2008;38(1):37-51.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/18081366/',
    inputs: [
      {
        key: 'distance',
        label: 'Total distance covered (m)',
        type: 'number',
        min: 40,
        max: 5000,
      },
    ],
    compute: ({ distanceMeters }) => yoYoIR1({ distanceMeters }),
    normalize: (raw) => ({ distanceMeters: Number(raw.distance) }),
  },
  {
    slug: 'queens-college-step-test',
    displayName: "Queen's College Step Test",
    shortName: "Queen's step",
    category: 'step',
    equipment: '16.25" (41.3 cm) bench, metronome',
    timeMinutes: 3,
    accuracy: 'moderate',
    description:
      "Step on/off a 16.25\" bench for 3 minutes at 24 (men) / 22 (women) steps/min. Recovery HR predicts VO2 max.",
    citation:
      'McArdle WD, Katch FI, Pechar GS, et al. Med Sci Sports. 1972;4(4):182-186.',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      {
        key: 'hr',
        label: 'Recovery heart rate (bpm, 5-20s after finishing)',
        type: 'integer',
        min: 80,
        max: 230,
      },
    ],
    compute: ({ sex, hrBpm }) =>
      queensCollegeStepTest({ sex: sex as 0 | 1, recoveryHrBpm: hrBpm }),
    normalize: (raw) => ({
      sex: sexToInt(raw.sex as Sex),
      hrBpm: Number(raw.hr),
    }),
  },
  {
    slug: 'harvard-step-test',
    displayName: 'Harvard Step Test',
    shortName: 'Harvard step',
    category: 'step',
    equipment: '20" (50 cm) bench, metronome, stopwatch',
    timeMinutes: 5,
    accuracy: 'low',
    description:
      'Step on/off a 20" bench at 30 steps/min for up to 5 minutes. Measures recovery HR at three intervals.',
    citation: 'Brouha L. Res Q. 1943;14:31-36.',
    inputs: [
      { key: 'duration', label: 'Duration completed (seconds, max 300)', type: 'integer', min: 30, max: 300 },
      { key: 'hr1', label: 'HR count 1-1:30 post-exercise (30s)', type: 'integer', min: 20, max: 130 },
      { key: 'hr2', label: 'HR count 2-2:30 post-exercise (30s)', type: 'integer', min: 20, max: 130 },
      { key: 'hr3', label: 'HR count 3-3:30 post-exercise (30s)', type: 'integer', min: 20, max: 130 },
    ],
    compute: ({ durationSec, hr1, hr2, hr3 }) =>
      harvardStepTest({ durationSec, hr1, hr2, hr3 }),
    normalize: (raw) => ({
      durationSec: Number(raw.duration),
      hr1: Number(raw.hr1),
      hr2: Number(raw.hr2),
      hr3: Number(raw.hr3),
    }),
  },
  {
    slug: 'ymca-3-minute-step-test',
    displayName: 'YMCA 3-Minute Step Test',
    shortName: 'YMCA step',
    category: 'step',
    equipment: '12" (30 cm) bench, metronome',
    timeMinutes: 3,
    accuracy: 'moderate',
    description:
      'Step on/off a 12" bench at 24 steps/min for 3 minutes. Recovery HR (1 min) maps to fitness category.',
    citation:
      'Golding LA, ed. YMCA Fitness Testing and Assessment Manual, 4th ed. Human Kinetics; 2000.',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      {
        key: 'hr',
        label: '1-minute recovery heart rate (bpm)',
        type: 'integer',
        min: 60,
        max: 230,
      },
    ],
    compute: ({ sex, hrBpm }) =>
      ymca3MinStepTest({ sex: sex as 0 | 1, recoveryHrBpm: hrBpm }),
    normalize: (raw) => ({
      sex: sexToInt(raw.sex as Sex),
      hrBpm: Number(raw.hr),
    }),
  },
  {
    slug: 'astrand-rhyming-cycle',
    displayName: 'Åstrand-Rhyming Cycle Ergometer',
    shortName: 'Åstrand cycle',
    category: 'cycle',
    equipment: 'Cycle ergometer, heart rate monitor',
    timeMinutes: 6,
    accuracy: 'moderate',
    description:
      'Cycle at steady workload for 6 minutes. Predicts VO2 max from steady-state HR, workload, age, and sex.',
    citation:
      'Åstrand PO, Ryhming I. J Appl Physiol. 1954;7(2):218-221.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/13211501/',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      { key: 'weight', label: 'Weight', type: 'weight' },
      { key: 'workload', label: 'Workload (watts)', type: 'integer', min: 25, max: 500 },
      {
        key: 'hr',
        label: 'Steady-state heart rate (bpm)',
        type: 'integer',
        min: 100,
        max: 200,
      },
    ],
    compute: ({ sex, age, weightKg, workloadWatts, steadyHrBpm }) =>
      astrandRhymingCycle({
        sex: sex as 0 | 1,
        age,
        weightKg,
        workloadWatts,
        steadyHrBpm,
      }),
    normalize: (raw, units) => {
      const w = Number(raw.weight);
      return {
        sex: sexToInt(raw.sex as Sex),
        age: Number(raw.age),
        weightKg: units === 'metric' ? w : lbToKg(w),
        workloadWatts: Number(raw.workload),
        steadyHrBpm: Number(raw.hr),
      };
    },
  },
  {
    slug: 'ymca-cycle-ergometer',
    displayName: 'YMCA Cycle Ergometer (Multistage)',
    shortName: 'YMCA cycle',
    category: 'cycle',
    equipment: 'Cycle ergometer, heart rate monitor',
    timeMinutes: 12,
    accuracy: 'high',
    description:
      'Two-stage submaximal cycle test. Linear extrapolation to age-predicted HRmax.',
    citation:
      'Golding LA, ed. YMCA Fitness Testing and Assessment Manual, 4th ed. 2000. ACSM Guidelines 11th ed.',
    inputs: [
      { key: 'weight', label: 'Weight', type: 'weight' },
      { key: 'workload1', label: 'Stage 1 workload (watts)', type: 'integer', min: 25, max: 500 },
      { key: 'hr1', label: 'Stage 1 steady-state HR (bpm)', type: 'integer', min: 100, max: 200 },
      { key: 'workload2', label: 'Stage 2 workload (watts)', type: 'integer', min: 25, max: 500 },
      { key: 'hr2', label: 'Stage 2 steady-state HR (bpm)', type: 'integer', min: 100, max: 210 },
    ],
    compute: ({
      age,
      weightKg,
      workload1Watts,
      hr1,
      workload2Watts,
      hr2,
    }) =>
      ymcaCycleErgometer({
        age,
        weightKg,
        workload1Watts,
        hr1,
        workload2Watts,
        hr2,
      }),
    normalize: (raw, units) => {
      const w = Number(raw.weight);
      return {
        age: Number(raw.age),
        weightKg: units === 'metric' ? w : lbToKg(w),
        workload1Watts: Number(raw.workload1),
        workload2Watts: Number(raw.workload2),
        hr1: Number(raw.hr1),
        hr2: Number(raw.hr2),
      };
    },
  },
  {
    slug: 'resting-heart-rate',
    displayName: 'Resting Heart Rate Method',
    shortName: 'Resting HR',
    category: 'non-exercise',
    equipment: 'Heart rate monitor (or wrist pulse)',
    timeMinutes: 2,
    accuracy: 'low',
    description:
      'Uth-Sørensen-Overgaard-Pedersen method. Estimates VO2 max from the ratio of HRmax to HRrest.',
    citation:
      'Uth N, Sørensen H, Overgaard K, Pedersen PK. Eur J Appl Physiol. 2004;91(1):111-115.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/14624296/',
    inputs: [
      {
        key: 'hrRest',
        label: 'Resting heart rate (bpm, measured after waking)',
        type: 'integer',
        min: 30,
        max: 120,
      },
      {
        key: 'hrMax',
        label: 'Max heart rate (bpm — leave blank to use 220 − age)',
        type: 'integer',
        min: 120,
        max: 230,
      },
    ],
    compute: ({ age, hrRest, hrMax }) =>
      restingHrMethod({
        hrRest,
        hrMax: hrMax || undefined,
        age,
      }),
    normalize: (raw) => ({
      age: Number(raw.age),
      hrRest: Number(raw.hrRest),
      hrMax: raw.hrMax ? Number(raw.hrMax) : 0,
    }),
  },
  {
    slug: 'non-exercise-estimator',
    displayName: 'Non-Exercise Estimator',
    shortName: 'Non-exercise',
    category: 'non-exercise',
    equipment: 'None',
    timeMinutes: 1,
    accuracy: 'moderate',
    description:
      'Jackson et al. 1990. Estimates VO2 max from sex, age, BMI, and self-reported activity level.',
    citation:
      'Jackson AS, Blair SN, Mahar MT, et al. Med Sci Sports Exerc. 1990;22(6):863-870.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/2287267/',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      { key: 'weight', label: 'Weight', type: 'weight' },
      { key: 'height', label: 'Height', type: 'height' },
      {
        key: 'paRating',
        label: 'Activity rating (0 = sedentary, 7 = competitive endurance athlete)',
        type: 'pa-rating',
      },
    ],
    compute: ({ sex, age, bmi, paRating }) =>
      nonExerciseEstimator({
        sex: sex as 0 | 1,
        age,
        bmi,
        paRating,
      }),
    normalize: (raw, units) => {
      const w = Number(raw.weight);
      const h = Number(raw.height);
      let bmi: number;
      if (units === 'imperial') {
        bmi = (w / (h * h)) * 703;
      } else {
        const m = h / 100;
        bmi = w / (m * m);
      }
      return {
        sex: sexToInt(raw.sex as Sex),
        age: Number(raw.age),
        bmi,
        paRating: Number(raw.paRating),
      };
    },
  },
  {
    slug: 'bruce-treadmill-protocol',
    displayName: 'Bruce Treadmill Protocol',
    shortName: 'Bruce protocol',
    category: 'treadmill',
    equipment: 'Treadmill',
    timeMinutes: 15,
    accuracy: 'high',
    description:
      'Standard clinical stress test: treadmill speed and grade increase every 3 minutes until exhaustion.',
    citation:
      'Bruce RA, Kusumi F, Hosmer D. Am Heart J. 1973;85(4):546-562. Women: Pollock ML et al. 1982.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/4632004/',
    inputs: [
      { key: 'sex', label: 'Sex', type: 'sex' },
      { key: 'timeMm', label: 'Minutes completed', type: 'integer', min: 3, max: 30 },
      { key: 'timeSs', label: 'Seconds', type: 'integer', min: 0, max: 59 },
    ],
    compute: ({ sex, timeMinutes }) =>
      bruceTreadmill({ sex: sex as 0 | 1, timeMinutes }),
    normalize: (raw) => ({
      sex: sexToInt(raw.sex as Sex),
      timeMinutes: Number(raw.timeMm) + Number(raw.timeSs) / 60,
    }),
  },
  {
    slug: '6-minute-walk-test',
    displayName: '6-Minute Walk Test',
    shortName: '6MWT',
    category: 'walk',
    equipment: 'Flat 30m course, stopwatch',
    timeMinutes: 6,
    accuracy: 'moderate',
    description:
      'Walk as far as possible in 6 minutes. Common clinical test; distance predicts VO2 max.',
    citation:
      'Burr JF, Bredin SS, Faktor MD, Warburton DE. Phys Sportsmed. 2011;39(2):133-139.',
    citationUrl: 'https://pubmed.ncbi.nlm.nih.gov/21673490/',
    inputs: [
      {
        key: 'distance',
        label: 'Distance walked (m)',
        type: 'number',
        min: 50,
        max: 1200,
      },
    ],
    compute: ({ distanceMeters }) => sixMinuteWalk({ distanceMeters }),
    normalize: (raw) => ({ distanceMeters: Number(raw.distance) }),
  },
];

export type MethodSlug = (typeof METHODS)[number]['slug'];

export function getMethod(slug: string): MethodMeta {
  const m = METHODS.find((m) => m.slug === slug);
  if (!m) throw new Error(`Unknown method: ${slug}`);
  return m;
}

export function methodsByCategory(): Record<MethodMeta['category'], MethodMeta[]> {
  const out: Record<string, MethodMeta[]> = {};
  for (const m of METHODS) {
    out[m.category] ??= [];
    out[m.category].push(m);
  }
  return out as Record<MethodMeta['category'], MethodMeta[]>;
}
