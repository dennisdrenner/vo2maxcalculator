import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The YMCA 3-Minute Step Test estimates VO2 max from 1-minute recovery HR after 3 minutes of stepping on a 12-inch bench at 24 steps/min. The fitness-industry standard step test.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>YMCA 3-Minute Step Test</strong> estimates VO2 max from your recovery heart
        rate after 3 minutes of stepping on and off a 12-inch (30 cm) bench at 24 steps per
        minute. It is the most widely used step-based fitness test in the commercial fitness
        industry, standardized in Golding's <em>YMCA Fitness Testing and Assessment Manual</em>{' '}
        (4th ed., 2000). The computational formulas derived from the YMCA norm tables:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        Men:   VO2 max ≈ 70 − 0.35 × recovery HR
        <br />
        Women: VO2 max ≈ 65 − 0.33 × recovery HR
      </div>
      <p className="mt-3 text-slate-700">
        Recovery HR is a <strong>full 60-second pulse count starting immediately</strong> after
        stopping. The YMCA test's key differences from other step tests: shorter bench (12",
        matching a standard aerobics step), longer HR count (60s instead of 15–30s), and
        fitness-industry ubiquity.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why the 12-inch bench matters</h2>
        <p className="mt-3 text-slate-700">
          The YMCA test's 12-inch bench height matches the standard "step aerobics" platform
          used in group fitness classes worldwide. This was deliberate: by the 1990s, step
          aerobics had made this bench universally available in gyms, and standardizing the
          test to that height made it practical for mass deployment.
        </p>
        <p className="mt-3 text-slate-700">
          The lower bench (vs. Queens College's 16.25" or Harvard's 20") also means the test
          imposes less mechanical load and is suitable for a wider range of adults. Elderly and
          sedentary testers can usually complete the full 3 minutes without leg fatigue becoming
          the limiting factor — which makes recovery HR a cleaner proxy for cardiovascular fitness.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Equipment:</strong> 12-inch (30 cm) bench or step-aerobics platform, metronome
            set to 96 bpm (24 full step cycles per minute × 4 beats per cycle).
          </li>
          <li>
            <strong>Warm-up:</strong> a minute or two of light walking. Not strictly required,
            but helps.
          </li>
          <li>
            <strong>Step continuously for exactly 3 minutes</strong> at 24 steps/min (both
            sexes). Each cycle: up-left, up-right, down-left, down-right.
          </li>
          <li>
            <strong>Stop stepping at 3:00. Immediately sit down.</strong> Within 5 seconds, begin
            counting your pulse.
          </li>
          <li>
            <strong>Count pulse for a full 60 seconds</strong> (not a shorter window × multiplier).
            The full-minute count captures the recovery curve better than a 15-second snapshot.
          </li>
          <li>
            <strong>Enter sex and 1-minute recovery HR</strong> in the calculator.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">YMCA norm categories</h2>
        <p className="mt-3 text-slate-700">
          Golding's <em>YMCA Manual</em> publishes age-adjusted recovery-HR cutoffs for six
          fitness categories (Excellent, Good, Above Average, Average, Below Average, Poor).
          General ranges at mid-range age brackets:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Category</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Men (bpm)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Women (bpm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Excellent</th><td className="border border-slate-200 px-3 py-2">&lt;81</td><td className="border border-slate-200 px-3 py-2">&lt;85</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Good</th><td className="border border-slate-200 px-3 py-2">81–100</td><td className="border border-slate-200 px-3 py-2">85–105</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Average</th><td className="border border-slate-200 px-3 py-2">101–117</td><td className="border border-slate-200 px-3 py-2">106–123</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Below average</th><td className="border border-slate-200 px-3 py-2">118–133</td><td className="border border-slate-200 px-3 py-2">124–140</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Poor</th><td className="border border-slate-200 px-3 py-2">&gt;133</td><td className="border border-slate-200 px-3 py-2">&gt;140</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          Our calculator converts these qualitative bands into quantitative VO2 max values via a
          piecewise-linear fit, then maps the result to our standard{' '}
          <Link href="/chart/" className="text-teal-700 underline">
            Cooper Institute percentile chart
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Direct validation studies of the YMCA 3-minute step test against lab VO2 max are
          moderate: correlation of <strong>r = 0.60–0.75</strong> and SEE around{' '}
          <strong>5 ml/kg/min</strong>. Because the formula is a piecewise fit to categorical
          norm bands (rather than a continuous regression from individual data), precision at
          the boundaries between categories is limited.
        </p>
        <p className="mt-3 text-slate-700">
          The test's main strengths are operational, not scientific:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Very short test duration (~4 minutes total).</li>
          <li>Minimal equipment — standard step-aerobics bench.</li>
          <li>Widely recognized in the fitness industry.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">YMCA step vs. other step tests</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>vs. Queens College:</strong> YMCA uses a lower bench (12" vs. 16.25") and
            longer HR count (60s vs. 15s). YMCA is easier on legs; Queens College is more
            precise in recovery-HR measurement. Both moderate accuracy.
          </li>
          <li>
            <strong>vs. Harvard:</strong> YMCA is 3 minutes, Harvard up to 5. YMCA's 12" bench
            is mechanically gentler. YMCA is more widely used today.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use the YMCA step test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Gym-based fitness screening.</strong> Standard test for YMCA, 24 Hour
            Fitness, LA Fitness, and many group-fitness contexts.
          </li>
          <li>
            <strong>Older or deconditioned adults.</strong> The 12" bench is manageable where
            16–20" benches might be not.
          </li>
          <li>
            <strong>Pre/post training program measurement.</strong> Popular in 12-week program
            designs as the before-after metric.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For higher VO2 max accuracy, the{' '}
          <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
            Rockport 1-mile walk
          </Link>{' '}
          or{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          are better choices if your equipment and fitness allow.
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the YMCA 3-Minute Step Test formula?',
      answer:
        'Men: VO2 max ≈ 70 − 0.35 × recovery HR. Women: VO2 max ≈ 65 − 0.33 × recovery HR. Recovery HR is a 60-second pulse count beginning immediately after 3 minutes of stepping on a 12-inch bench at 24 steps/min. Source: Golding, YMCA Fitness Testing Manual, 4th ed., 2000.',
    },
    {
      question: 'What bench height is used?',
      answer:
        '12 inches (30 cm) — the standard step-aerobics platform height. This is lower than Queens College (16.25") or Harvard (20") and makes the test more accessible for older or less-conditioned adults.',
    },
    {
      question: "Why is the pulse count 60 seconds instead of 15?",
      answer:
        'The YMCA protocol uses a single full-minute count immediately after stopping. This captures the recovery curve more completely than a shorter window. Shorter counts (like Queens College\'s 15 s) are faster but noisier.',
    },
    {
      question: 'What recovery HR is considered excellent on the YMCA step test?',
      answer:
        'Under 81 bpm for men and under 85 bpm for women (YMCA Manual classifications). That typically corresponds to VO2 max values of 42+ ml/kg/min for men and 36+ for women, though the relationship varies by age.',
    },
    {
      question: 'Can I use a chest strap instead of counting pulse manually?',
      answer:
        'Yes, and it improves accuracy. With a chest strap, read the maximum HR during the first 5 seconds post-exercise and use that value — or take the reading at the 30-second post-exercise mark, which typically approximates the 60-second average.',
    },
  ],
};

export default article;
