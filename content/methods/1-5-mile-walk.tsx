import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The 1.5-mile walk test extends the Rockport protocol to a longer distance. Formula, protocol, and when to pick it over the 1-mile Rockport.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>1.5-mile walk test</strong> is an extended variant of the{' '}
        <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
          Rockport 1-mile walk
        </Link>
        . It uses the same physiological model — brisk walking at a pace that elevates HR into
        the 120–160 range, combined with body-weight and demographic factors — but over a longer
        distance. The formula rescales the time coefficient by the distance ratio (1.5):
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        VO2 max = 132.853 − 0.0769·weightLb − 0.3877·age + 6.315·sex
        <br />− (3.2649/1.5)·time(min) − 0.1565·HR(bpm)
      </div>
      <p className="mt-3 text-slate-700">
        where sex is 1 (male) or 0 (female), time is decimal minutes, and HR is the heart rate
        immediately at the finish. The longer distance produces a more stable steady-state HR
        and reduces the impact of startup transients, but 1.5-mile walk tests are less
        extensively validated than the 1-mile Rockport.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why extend Rockport to 1.5 miles?</h2>
        <p className="mt-3 text-slate-700">
          The classic 1-mile Rockport protocol takes most adults 13–18 minutes — long enough to
          reach steady-state HR but short enough that the first 2–3 minutes of HR transient are
          a meaningful fraction of total test time. Extending to 1.5 miles (typically 20–27
          minutes) makes steady-state HR easier to reach and hold, which theoretically tightens
          the estimate for testers who pace erratically.
        </p>
        <p className="mt-3 text-slate-700">
          The tradeoff is that the 1.5-mile walk has not received the same intensity of
          validation research as 1-mile Rockport. Kline et al.'s 1987 paper is still the
          gold-standard reference, so the 1.5-mile variant uses the same coefficients scaled for
          distance rather than new ones. This makes the test a reasonable option but not
          obviously better than standard Rockport.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Measure exactly 1.5 miles (2,414 m).</strong> A 400-meter track × 6 laps is
            2,400 m — within 0.6% of 1.5 mi, acceptable for this test.
          </li>
          <li>
            <strong>Wear a chest-strap HR monitor.</strong> Wrist optical HR is acceptable but
            less reliable.
          </li>
          <li>
            <strong>Warm up for 5 minutes</strong> of easy walking.
          </li>
          <li>
            <strong>Walk 1.5 miles as briskly as possible</strong> without breaking into a jog.
            Pace for steady effort; avoid fast starts. Your HR should stabilize in the 125–160
            range by the end of the first half-mile and stay there.
          </li>
          <li>
            <strong>Record time and HR at the instant you cross the finish line.</strong> HR
            falls quickly; a delay of 10+ seconds will bias the estimate downward by ~1.5
            ml/kg/min.
          </li>
          <li>
            <strong>Enter age, sex, weight, time, and HR</strong> in the calculator.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Direct validation of the 1.5-mile walk variant is sparse. Extrapolating from Kline
          et al.'s 1-mile Rockport validation (r = 0.88, SEE = 5.0 ml/kg/min), the 1.5-mile
          variant likely produces similar or slightly better accuracy in testers who can pace
          steadily for 20+ minutes.
        </p>
        <p className="mt-3 text-slate-700">Known limitations:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Less validated than the 1-mile Rockport original.</li>
          <li>HR drift over 20+ minutes can inflate the HR term.</li>
          <li>
            Requires the tester to hold brisk-walk pace without breaking into a jog — difficult
            for some fit testers whose natural walking pace is already close to jog-transition.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked example</h2>
        <p className="mt-3 text-slate-700">
          A 62-year-old man weighing 190 lb walks 1.5 miles in 25:00 (25.0 min) and finishes
          with HR 138 bpm. His VO2 max estimate:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 max = 132.853 − 0.0769·190 − 0.3877·62 + 6.315·1 − (3.2649/1.5)·25.0 − 0.1565·138
          <br />
          = 132.853 − 14.611 − 24.037 + 6.315 − 54.415 − 21.597
          <br />= <strong>24.51 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          The 50th-percentile value for a 60–69 man is 28.2 ml/kg/min, so 24.5 puts him around
          the 25th percentile ("Fair") — a clear target for training improvement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use 1.5-mile walk vs. alternatives</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You find 1-mile Rockport too short.</strong> If the 1-mile test ends before
            you reach steady-state HR (common in very brisk walkers), the longer 1.5-mile
            variant gives the physiological response more time to stabilize.
          </li>
          <li>
            <strong>You want the best-validated walking test.</strong> Stick with{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport 1-mile walk
            </Link>{' '}
            — the original.
          </li>
          <li>
            <strong>You want a shorter walking test.</strong> Use the{' '}
            <Link href="/methods/6-minute-walk-test/" className="text-teal-700 underline">
              6-minute walk test
            </Link>{' '}
            — widely used in clinical settings.
          </li>
        </ul>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the 1.5-mile walk VO2 max formula?',
      answer:
        "VO2 max = 132.853 − 0.0769·weight(lb) − 0.3877·age + 6.315·sex − (3.2649/1.5)·time(min) − 0.1565·HR(bpm). Sex = 1 for male, 0 for female. The time coefficient is Rockport's 3.2649 divided by 1.5 to account for the longer distance.",
    },
    {
      question: 'Is the 1.5-mile walk more accurate than the 1-mile Rockport?',
      answer:
        'Not demonstrably. Kline et al. (1987) validated the 1-mile version; the 1.5-mile variant extrapolates from the same coefficients. In practice, results are similar. Pick whichever distance you can pace more steadily.',
    },
    {
      question: 'What pace should I walk for this test?',
      answer:
        "Brisk, just short of breaking into a jog. For a 30-year-old, expect to finish in 18–22 minutes. For a 60-year-old, 22–28 minutes. If your HR doesn't elevate above 120 bpm at brisk pace, you are fit enough to use a running test instead.",
    },
    {
      question: 'Can I use wrist HR for this test?',
      answer:
        'Yes, but chest straps are more reliable. HR accuracy matters: a 10 bpm error changes your VO2 max estimate by ~1.5 ml/kg/min. Wear the watch snugly and let it settle during the first minute.',
    },
    {
      question: 'What if I break into a jog during the test?',
      answer:
        'The formula was calibrated on brisk walking. Jogging even briefly elevates HR disproportionately to workload and invalidates the estimate. If you want to run, switch to the 1.5-mile run or Cooper test — those formulas are designed for it.',
    },
  ],
};

export default article;
