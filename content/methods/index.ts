import type { MethodArticleMap } from './types';
import cooper12MinuteRun from './cooper-12-minute-run';
import mile1_5Run from './1-5-mile-run';
import mile1Run from './1-mile-run';
import km2_4Run from './2-4-km-run';
import rockport from './rockport-1-mile-walk';
import walk1_5Mile from './1-5-mile-walk';
import beepTest from './beep-test';
import yoyoIR1 from './yo-yo-intermittent-recovery';
import queensCollege from './queens-college-step-test';
import harvardStep from './harvard-step-test';
import ymca3MinStep from './ymca-3-minute-step-test';
import astrandRhyming from './astrand-rhyming-cycle';
import ymcaCycle from './ymca-cycle-ergometer';
import restingHr from './resting-heart-rate';
import nonExercise from './non-exercise-estimator';
import bruce from './bruce-treadmill-protocol';
import sixMinuteWalk from './6-minute-walk-test';

export const METHOD_ARTICLES: MethodArticleMap = {
  'cooper-12-minute-run': cooper12MinuteRun,
  '1-5-mile-run': mile1_5Run,
  '1-mile-run': mile1Run,
  '2-4-km-run': km2_4Run,
  'rockport-1-mile-walk': rockport,
  '1-5-mile-walk': walk1_5Mile,
  'beep-test': beepTest,
  'yo-yo-intermittent-recovery': yoyoIR1,
  'queens-college-step-test': queensCollege,
  'harvard-step-test': harvardStep,
  'ymca-3-minute-step-test': ymca3MinStep,
  'astrand-rhyming-cycle': astrandRhyming,
  'ymca-cycle-ergometer': ymcaCycle,
  'resting-heart-rate': restingHr,
  'non-exercise-estimator': nonExercise,
  'bruce-treadmill-protocol': bruce,
  '6-minute-walk-test': sixMinuteWalk,
};
