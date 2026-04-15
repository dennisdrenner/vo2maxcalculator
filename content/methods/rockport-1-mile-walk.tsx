import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The Rockport 1-mile walk estimates VO2 max from walk time, finishing heart rate, age, sex, and weight. Formula, protocol, accuracy, and calculator.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Rockport 1-mile walk test</strong> estimates VO2 max by having you walk one
        mile as briskly as possible and recording your finishing heart rate. The formula —
        validated by Kline et al. in the 1987 <em>Medicine & Science in Sports & Exercise</em>{' '}
        paper — is:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max = 132.853 − (0.0769 × weight lb) − (0.3877 × age) + (6.315 × sex) − (3.2649 × time
        min) − (0.1565 × HR bpm)
      </div>
      <p className="mt-3 text-slate-700">
        where sex is 1 for male, 0 for female, time is in decimal minutes, and HR is the
        heart-rate reading <em>immediately</em> at the end of the mile. Because the test doesn't
        require running, it is the preferred VO2 max field test for older adults, deconditioned
        individuals, and anyone for whom maximal running is contraindicated.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why the Rockport test works</h2>
        <p className="mt-3 text-slate-700">
          Unlike the Cooper test, Rockport is a <strong>submaximal</strong> test. It does not
          require all-out effort; it requires a <em>brisk</em> pace sustained for one mile. The
          formula then uses your age, sex, body weight, walk time, and final heart rate to
          predict the treadmill VO2 max value you would have produced on a maximal test. The
          model exploits the fact that, at any given submaximal oxygen demand, fitter
          individuals run lower heart rates — so HR at a known workload is a strong proxy for
          aerobic capacity.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Measure exactly one mile.</strong> A 400-meter track × 4 laps is 1,600 m —
            which is 1.0 miles within 0.6%. Any flat, measured route works.
          </li>
          <li>
            <strong>Wear a heart-rate monitor or chest strap.</strong> Wrist-based optical HR is
            acceptable but less accurate at high intensities. Do not rely on manual pulse-taking
            — a 15-second error in pulse timing changes VO2 max estimate by ~3 ml/kg/min.
          </li>
          <li>
            <strong>Warm up with 5 minutes of easy walking.</strong> No need to stretch aggressively;
            the test itself is the warm-up extension.
          </li>
          <li>
            <strong>Walk the mile as briskly as you can</strong> — just short of breaking into a
            jog. A typical test pace is 13–16 minutes for a deconditioned 50-year-old and 9–11
            minutes for a fit 30-year-old. Aim to finish with an elevated heart rate of at least
            120 bpm; below that, the formula becomes less accurate.
          </li>
          <li>
            <strong>Record your time at the one-mile mark</strong> (to the nearest second) and
            <strong> capture heart rate immediately at the finish</strong>. If you keep walking to
            cool down, the heart rate drops within 10–15 seconds and the formula will
            underestimate VO2 max.
          </li>
          <li>
            <strong>Enter your inputs</strong> (age, sex, weight, walk time, HR) in the
            calculator. Results are in ml/kg/min.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Kline et al. reported a correlation of <strong>r = 0.88</strong> with directly measured
          VO2 max in 343 adults aged 30–69 (169 men, 174 women). The standard error of estimate
          was <strong>5.0 ml/kg/min</strong> — meaningfully higher than the Cooper or 1.5-mile run.
          That is the tradeoff: Rockport trades some accuracy for the ability to test a much wider
          population.
        </p>
        <p className="mt-3 text-slate-700">Accuracy is best in:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Adults aged 30–70 (the original validation range).</li>
          <li>VO2 max values in the 25–55 ml/kg/min range.</li>
          <li>Walk times of 10–18 minutes (the validation range).</li>
        </ul>
        <p className="mt-3 text-slate-700">Accuracy is worse in:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Very fit adults who can't elevate HR above 120 at brisk walking pace.</li>
          <li>Adults on beta-blockers or other heart-rate-suppressing medications.</li>
          <li>Walkers under 30 — the age coefficient was fit on older subjects.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked example</h2>
        <p className="mt-3 text-slate-700">
          A 55-year-old woman weighing 160 lb walks one mile in 14:30 (14.5 min) and finishes
          with an HR of 145 bpm. Her VO2 max estimate:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 max = 132.853 − (0.0769 × 160) − (0.3877 × 55) + (6.315 × 0) − (3.2649 × 14.5) −
          (0.1565 × 145)
          <br />
          = 132.853 − 12.304 − 21.324 + 0 − 47.341 − 22.693
          <br />= <strong>29.19 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          The 50th-percentile VO2 max for a woman 50–59 is 23.4 ml/kg/min and the 75th is 27.6, so
          29 puts her above the 75th percentile for her bracket — "Good" by ACSM standards.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Heart-rate measurement</h2>
        <p className="mt-3 text-slate-700">
          The single most common Rockport error is heart-rate timing. The HR term in the formula
          assumes you record HR at the exact moment you cross the mile mark, not 10–30 seconds
          later. Because HR drops ~30–40 bpm in the first 60 seconds after cessation, a 30-second
          delay in reading HR can reduce the estimate by ~3 ml/kg/min.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Wear a chest-strap HR monitor with a watch you can see without stopping.</li>
          <li>Glance at the HR as your foot crosses the mile mark.</li>
          <li>Alternatively, check the highest HR reading within 5 seconds of finishing.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When Rockport is the right test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Older adults, deconditioned adults, or cardiac-rehab participants.</strong>{' '}
            Rockport is the default clinical field test in these populations.
          </li>
          <li>
            <strong>First-time VO2 max testers.</strong> Pacing a 12-minute run is a skill;
            walking briskly for one mile is not.
          </li>
          <li>
            <strong>Joint-pain or running-injury contexts.</strong> Walking loads are 2–3× body
            weight vs. 3–8× for running.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          If you can run comfortably, the{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          or{' '}
          <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
            1.5-mile run
          </Link>{' '}
          will give you a more accurate result (SEE ~3.0 vs. 5.0 ml/kg/min).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Gear for this test</h2>
        <p className="mt-2 text-sm text-slate-600">
          Accurate HR measurement is the Rockport test's biggest error source. A chest strap
          eliminates wrist-sensor noise. As an Amazon Associate we earn from qualifying purchases.
        </p>
        <div className="mt-4">
          <AffiliateCard product="polarH10" />
        </div>
        <p className="mt-3 text-sm">
          <Link href="/equipment/" className="font-semibold text-teal-700 hover:underline">
            See all recommended equipment →
          </Link>
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the Rockport walk test formula?',
      answer:
        'VO2 max = 132.853 − (0.0769 × weight in lb) − (0.3877 × age) + (6.315 × sex) − (3.2649 × time in minutes) − (0.1565 × finishing heart rate in bpm). Sex is 1 for male, 0 for female. Kline et al., MSSE 1987.',
    },
    {
      question: 'How accurate is the Rockport test?',
      answer:
        'Correlation with directly measured VO2 max is r = 0.88 (Kline et al., 1987). Standard error of estimate is about 5.0 ml/kg/min — moderate accuracy, lower than the Cooper test but validated across a broader population including older adults.',
    },
    {
      question: 'Can I use a wrist HR monitor for the Rockport test?',
      answer:
        'Yes, but chest straps are more accurate. Wrist optical HR can err by 5–15 bpm at elevated heart rates. A 10 bpm HR error shifts VO2 max estimate by ~1.5 ml/kg/min.',
    },
    {
      question: 'What if my finishing heart rate is below 120 bpm?',
      answer:
        "The Rockport formula loses accuracy below 120 bpm because the HR term becomes less discriminative. If your walking pace doesn't elevate HR above 120, you are fit enough to take a running test instead — use the Cooper 12-minute run or 1.5-mile run.",
    },
    {
      question: "Why does the formula include 'sex'?",
      answer:
        'Physiological differences in hemoglobin, cardiac size, and lean mass mean that men and women with the same HR response to a given walking pace have different VO2 max values by about 6 ml/kg/min on average. The sex term (1 for male, 0 for female) adjusts for this.',
    },
    {
      question: 'Can I take beta-blockers and use the Rockport test?',
      answer:
        'No — not reliably. Beta-blockers reduce HR response to exercise, which breaks the HR-VO2 relationship the formula depends on. You will get an inflated VO2 max estimate. Use the non-exercise estimator instead, or discuss alternatives with your clinician.',
    },
  ],
};

export default article;
