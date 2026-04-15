/**
 * Short 3–5 step procedural summaries for each test method.
 * Rendered under the Calculator on the homepage so users who haven't
 * clicked through to the full /methods/[slug]/ article get quick guidance.
 *
 * Keep each step to one sentence. Longer explanations live in
 * /content/methods/[slug].tsx.
 */

import type { MethodSlug } from './methods';

export const QUICK_PROTOCOLS: Record<MethodSlug, string[]> = {
  'cooper-12-minute-run': [
    'Find a flat, measured course — a 400m track is ideal.',
    'Warm up for 10–15 minutes with easy jogging and a few short strides.',
    'Run as far as you can in exactly 12 minutes, pacing evenly from the start.',
    'Record the total distance covered to the nearest 25–50 meters.',
    'Cool down with 5–10 minutes of easy jogging.',
  ],
  '1-5-mile-run': [
    'Use a flat measured course (6 laps of a 400m track ≈ 1.5 miles).',
    'Warm up for 10–15 minutes with easy running and strides.',
    'Run 1.5 miles as fast as you can with even splits — avoid starting too fast.',
    'Record finishing time to the nearest second and convert to decimal minutes.',
  ],
  '1-mile-run': [
    'Wear a chest-strap heart-rate monitor (wrist optical is too noisy).',
    'Warm up for 10 minutes on a measured 1-mile course.',
    'Run the mile at a "comfortably fast" pace — about 9/10 effort, not all-out.',
    'At the finish, glance at your HR immediately — it drops 30 bpm in 60 s.',
    'Enter time, finishing HR, weight, and sex in the calculator.',
  ],
  '2-4-km-run': [
    'Use a flat measured course (6 laps of a 400m track = 2,400 m).',
    'Warm up for 10–15 minutes with easy running.',
    'Run 2.4 km as fast as you can with even splits.',
    'Record finishing time to the nearest second; convert to decimal minutes.',
  ],
  'rockport-1-mile-walk': [
    'Wear a chest-strap HR monitor and warm up with 5 minutes of easy walking.',
    'Walk 1 mile as briskly as you can — just short of breaking into a jog.',
    'Record your time and finishing HR the instant you cross the mile mark.',
    'Enter age, sex, weight, time, and HR in the calculator.',
  ],
  '1-5-mile-walk': [
    'Measure a flat 1.5-mile course and wear an HR monitor.',
    'Walk briskly without breaking into a jog; maintain steady effort.',
    'Record time and finishing HR as you cross the 1.5-mile mark.',
    'Enter age, sex, weight, time, and HR in the calculator.',
  ],
  'beep-test': [
    'Mark two lines 20 meters apart and start the official beep-test audio.',
    'Run back and forth between the lines in time with the beeps.',
    'Pace increases each level; continue until you fail to reach the line twice.',
    'Record the final level and shuttle number reached.',
  ],
  'yo-yo-intermittent-recovery': [
    'Start the Yo-Yo IR1 audio track (begins at 10 km/h).',
    'Run each 2×20 m shuttle in time with beeps, then jog 5 m out-and-back in the 10 s recovery.',
    'Test ends when you miss the line on two consecutive shuttles.',
    'Record total distance covered (40 m per completed shuttle).',
  ],
  'queens-college-step-test': [
    'Set up a 16.25-inch bench and a metronome.',
    'Men: step at 24 steps/min. Women: 22 steps/min. Continue for 3 minutes.',
    'Stop at exactly 3 minutes and stand still.',
    'From 5 to 20 seconds post-exercise, count your pulse for 15 seconds × 4 = bpm.',
    'Enter sex and recovery HR in the calculator.',
  ],
  'harvard-step-test': [
    'Set up a 20-inch bench; metronome at 30 steps/min.',
    'Step continuously for up to 5 minutes — stop if you cannot maintain cadence.',
    'Sit down and count your pulse in three 30-second windows: 1:00–1:30, 2:00–2:30, 3:00–3:30 post-exercise.',
    'Enter duration (seconds) and the three HR counts.',
  ],
  'ymca-3-minute-step-test': [
    'Set up a 12-inch bench; metronome at 24 steps/min (96 bpm).',
    'Step continuously for exactly 3 minutes.',
    'Stop and immediately count pulse for a full 60 seconds.',
    'Enter sex and 1-minute recovery HR in the calculator.',
  ],
  'astrand-rhyming-cycle': [
    'Set the cycle ergometer to a wattage that will raise your HR to 125–170 bpm.',
    'Pedal at 50–60 RPM for 6 minutes, maintaining constant cadence.',
    'Take HR at minute 5 and minute 6 — should be within 5 bpm (steady state).',
    'Enter workload, average steady-state HR, age, sex, and weight.',
  ],
  'ymca-cycle-ergometer': [
    'Start at a workload that produces HR 110–140 bpm; hold 3–5 min for steady state.',
    'Record workload 1 and HR 1 (two consecutive readings within 5 bpm).',
    'Increase workload so HR rises 15–25 bpm; hold to steady state again.',
    'Record workload 2 and HR 2, plus age and weight.',
  ],
  'resting-heart-rate': [
    'Measure your resting HR: chest strap overnight is best, or manual pulse for 5 consecutive mornings.',
    'Avoid caffeine, alcohol, and hard workouts the day before measuring.',
    'If you know your true HRmax, enter it; otherwise leave blank and we use 220 − age.',
    'Enter HRrest (and age).',
  ],
  'non-exercise-estimator': [
    'No exercise required.',
    'Enter age, sex, weight, and height.',
    'Rate your typical activity on the 0–7 scale (0 = sedentary, 7 = >10 mi/wk running).',
    'Formula combines demographics + BMI + activity rating; no HR or exercise data needed.',
  ],
  'bruce-treadmill-protocol': [
    'Use a treadmill that can set grade up to 22% — most clinical treadmills, some gym units.',
    'Start at 1.7 mph × 10% grade; speed and grade increase every 3 minutes.',
    'Continue to volitional exhaustion (hands off handrails — they invalidate the test).',
    'Record total time to exhaustion and sex.',
  ],
  '6-minute-walk-test': [
    'Mark a 30-meter flat indoor course free of obstacles.',
    'Walk as far as you can in exactly 6 minutes — no jogging; you may slow or rest.',
    'At 6:00, stop and record total distance walked in meters.',
    'Enter the distance (always meters) in the calculator.',
  ],
};
