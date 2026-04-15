import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    "The Queen's College Step Test estimates VO2 max from post-exercise heart rate after 3 minutes of stepping at 24 (men) or 22 (women) steps/min on a 16.25-inch bench.",

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Queen's College Step Test</strong> (also called the McArdle Step Test)
        estimates VO2 max from the heart rate you can recover to in the 5–20 seconds after
        stepping on and off a 16.25-inch (41.3 cm) bench for 3 minutes at a fixed cadence.
        Developed at Queens College, CUNY by William McArdle and colleagues in 1972, it is one
        of the simplest and most widely-used classroom and laboratory VO2 max field tests. The
        formulas:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        Men:   VO2 max = 111.33 − 0.42 × recovery HR
        <br />
        Women: VO2 max = 65.81 − 0.1847 × recovery HR
      </div>
      <p className="mt-3 text-slate-700">
        Recovery HR is measured by a 15-second pulse count taken 5 to 20 seconds after stopping,
        multiplied by 4 to get bpm. The step cadence is <strong>24 steps per minute for men</strong>{' '}
        and <strong>22 steps per minute for women</strong>. Equipment is minimal: a 16.25-inch
        bench and a metronome.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The logic of recovery HR</h2>
        <p className="mt-3 text-slate-700">
          The premise is elegant: at any fixed submaximal workload, the faster your HR recovers
          after stopping, the fitter you are. A fit person's cardiac output drops quickly
          because their stroke volume was high and their sympathetic drive disengages rapidly; a
          less-fit person's HR stays elevated because they were closer to maximal output
          throughout the test.
        </p>
        <p className="mt-3 text-slate-700">
          Queens College fixes the workload at a standardized cadence on a specific bench
          height, so recovery HR becomes a direct proxy for VO2 max. The 24 steps/min (men) and
          22 steps/min (women) cadences produce roughly equivalent relative workloads because
          men typically have higher VO2 max.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Bench: 16.25 inches (41.3 cm).</strong> A standard gym step platform with
            risers — two "risers" on each side usually reaches 16.25 inches.
          </li>
          <li>
            <strong>Metronome:</strong> set to 96 beats per minute for men (24 full step cycles
            × 4 beats per cycle = 96), or 88 bpm for women (22 × 4 = 88). Each cycle is
            up-left, up-right, down-left, down-right.
          </li>
          <li>
            <strong>Step up and down continuously for 3 minutes</strong> in time with the
            metronome. Lead leg can alternate if you get tired but cadence must stay constant.
          </li>
          <li>
            <strong>Stop stepping at exactly 3:00.</strong> Stand still. Wait 5 seconds.
          </li>
          <li>
            <strong>Count your pulse for the next 15 seconds</strong> (that is, from 5s to 20s
            post-exercise). Multiply by 4 to get HR in bpm.
          </li>
          <li>
            <strong>Enter sex and recovery HR</strong> in the calculator.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Use a chest-strap HR monitor if possible. Manual pulse-taking at 15-second intervals
          introduces ±3 bpm error, which translates to ±1.3 ml/kg/min for men or ±0.6 ml/kg/min
          for women.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked examples</h2>
        <p className="mt-3 text-slate-700">
          A 35-year-old man finishes the test and counts 36 beats in 15 seconds. His recovery HR
          is 36 × 4 = 144 bpm.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 max = 111.33 − 0.42 × 144 = 111.33 − 60.48 = <strong>50.85 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          That puts him at about the 80th percentile for 30–39 men ("Excellent").
        </p>
        <p className="mt-4 text-slate-700">
          A 42-year-old woman counts 40 beats in 15 seconds. Recovery HR = 160.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 max = 65.81 − 0.1847 × 160 = 65.81 − 29.55 = <strong>36.26 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          Above the 75th percentile for 40–49 women ("Good").
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          McArdle et al.'s original validation reported correlation of <strong>r ≈ 0.75</strong>{' '}
          with directly measured VO2 max, and a standard error of estimate of about{' '}
          <strong>4.5 ml/kg/min</strong>. This is moderate accuracy — the Queens College test is
          used more for teaching and group screening than for precise individual assessment.
        </p>
        <p className="mt-3 text-slate-700">Accuracy is best for:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>College-age adults (the original validation population).</li>
          <li>Adults with VO2 max in the 30–55 ml/kg/min range.</li>
        </ul>
        <p className="mt-3 text-slate-700">Accuracy degrades in:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Very fit adults — recovery HR is fast enough that small timing errors dominate.</li>
          <li>Adults over 65 — mechanical step-up-step-down becomes limiting before cardiovascular capacity does.</li>
          <li>Heavier individuals — the fixed bench height + step cadence overloads less-trained legs.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why the name?</h2>
        <p className="mt-3 text-slate-700">
          The test is named after Queens College — a senior college of the City University of
          New York (CUNY) in Queens, New York — where William McArdle taught exercise
          physiology. The "Queen's" apostrophe is a common spelling variant; the college
          official name is "Queens College." It has nothing to do with the British monarchy or
          the Queen's University (Canada/UK).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use Queens College step</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Classroom or group testing.</strong> 30 students can test in rotation with
            a single bench and metronome.
          </li>
          <li>
            <strong>No running available.</strong> Indoor, weather-independent, joint-friendly.
          </li>
          <li>
            <strong>Quick screening.</strong> Including warm-up and recovery-HR counting, the
            whole test takes about 5 minutes.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For higher accuracy, use a running test. For a lower-impact but similarly low-equipment
          test, try the{' '}
          <Link href="/methods/ymca-3-minute-step-test/" className="text-teal-700 underline">
            YMCA 3-minute step test
          </Link>{' '}
          (lower bench, different cadence, different formula) or the{' '}
          <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
            Rockport walk
          </Link>{' '}
          (more accurate, more time required).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Gear for this test</h2>
        <p className="mt-2 text-sm text-slate-600">
          You'll need a bench around 16.25" tall — an adjustable aerobics step gets close. A
          chest-strap HR monitor is strongly recommended for the recovery-HR measurement.
          As an Amazon Associate we earn from qualifying purchases.
        </p>
        <div className="mt-4">
          <AffiliateCard product="stepBench" />
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
      question: "What is the Queen's College step test formula?",
      answer:
        'Men: VO2 max = 111.33 − 0.42 × recovery HR. Women: VO2 max = 65.81 − 0.1847 × recovery HR. Recovery HR is measured 5–20 seconds post-exercise as a 15-second pulse count × 4. McArdle WD, Katch FI, Pechar GS et al., Med Sci Sports 1972;4(4):182-186.',
    },
    {
      question: 'How accurate is the Queens College step test?',
      answer:
        'Correlation with directly measured VO2 max is r ≈ 0.75, with a standard error of estimate of about 4.5 ml/kg/min. Moderate accuracy, best suited for college-age adults and for group screening.',
    },
    {
      question: 'What bench height is used for the Queens College step test?',
      answer:
        '16.25 inches (41.3 cm). A standard step-aerobics platform with two risers on each side typically reaches this height. Do not substitute a higher or lower bench — the formula is calibrated to this specific height.',
    },
    {
      question: 'Why are step cadences different for men and women?',
      answer:
        'Men step at 24 steps/min, women at 22 steps/min. The lower female cadence compensates for the generally lower female VO2 max, so the test produces roughly equivalent relative workloads across sexes. Without this adjustment, more women would be unable to complete the 3-minute protocol.',
    },
    {
      question: "Is the Queens College test the same as the YMCA 3-minute step test?",
      answer:
        'No — different protocols. Queens College uses a 16.25" bench at 22–24 steps/min with a 5–20s recovery HR measurement. YMCA uses a 12" bench at 24 steps/min with a 60-second full-minute recovery HR count. Different formulas, different results.',
    },
    {
      question: 'Can I use a chest-strap HR monitor instead of a manual pulse count?',
      answer:
        'Yes — and it is more accurate. A 15-second manual pulse count introduces ±3 bpm error (±12 bpm in some hands). A chest strap reduces this to ±1 bpm. Read the HR at 10 seconds post-exercise, which is the midpoint of the 5–20s window.',
    },
  ],
};

export default article;
