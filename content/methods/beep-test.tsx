import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The beep test (20m Multi-Stage Shuttle Run) estimates VO2 max from the level and shuttle you reach. Standard test for team-sport athletes. Formula, reference table, and protocol.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>beep test</strong> (also called the 20-meter multi-stage shuttle run, MSFT,
        PACER, Léger test, or bleep test) estimates VO2 max by having you run back and forth
        between two lines 20 meters apart in time with audio beeps. The pace increases every
        minute (each "level"). The test ends when you can no longer reach the line before the
        beep on two consecutive shuttles. The simplified Flouris et al. (2005) formula is:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        VO2 max = 3.46 × (level + shuttle / (level × 0.4325 + 7.0048)) + 12.2
      </div>
      <p className="mt-3 text-slate-700">
        Originally developed by Luc Léger at the University of Montreal in 1982, the beep test
        is the global standard for team-sport athlete fitness assessment. It is used in soccer,
        rugby, basketball, Australian rules football, tennis, and military recruitment around
        the world. In fit young adults, correlation with directly measured VO2 max is{' '}
        <strong>r ≈ 0.92</strong> — among the highest of any field test.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why the beep test is so popular</h2>
        <p className="mt-3 text-slate-700">
          Three features make the beep test dominant in team-sport contexts:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>No pacing required.</strong> The audio track sets your speed. Testers just
            match it or fail — a more natural task for most team-sport athletes than pacing a
            time-trial.
          </li>
          <li>
            <strong>Group testing is trivial.</strong> 30 athletes can run the test
            simultaneously on a single 20m course. Each reaches their own exhaustion point and
            steps off; the audio continues for the others.
          </li>
          <li>
            <strong>The shuttle format matches sport demands.</strong> Stop-start running with
            deceleration-and-acceleration around cones is more sport-specific than a
            steady-state run.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Mark a 20-meter course</strong> with cones or tape. Width: at least 1 m per
            tester, plus room to turn.
          </li>
          <li>
            <strong>Play the official beep test audio.</strong> Multiple free versions exist
            online — search "beep test audio" or "20m shuttle run audio." Level 1 starts at
            8.5 km/h; each subsequent level increases speed by 0.5 km/h.
          </li>
          <li>
            <strong>Run back and forth in time with the beeps.</strong> Arrive at the far line
            by the next beep; turn and return. The beep interval shortens each level as pace
            increases.
          </li>
          <li>
            <strong>If you arrive at the line after the beep once,</strong> you get one "warning."
            The test ends if you arrive late on a second consecutive shuttle, or if you
            voluntarily step off.
          </li>
          <li>
            <strong>Record the final level and shuttle</strong> where you stopped. Enter both
            in the calculator.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Level and shuttle reference table</h2>
        <p className="mt-3 text-slate-700">
          Each level has a set number of shuttles (7 at Level 1, 8 at Level 2, up to 16 at
          Level 21). Reference estimates for common stopping points:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Level/Shuttle</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">VO2 max</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Typical tester</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">5 / 2</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">32.2</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Untrained adult</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">7 / 5</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">39.1</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Recreational fit</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">9 / 4</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">45.7</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Amateur team-sport player</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">11 / 3</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">51.9</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Competitive amateur</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">13 / 2</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">58.0</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Semi-pro soccer</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">14 / 8</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">63.2</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Pro soccer midfielder</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">16 / 4</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">68.9</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Elite team-sport athlete</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">18 / 1</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">75.7</td><td className="border border-slate-200 px-3 py-2 text-slate-600">International / endurance elite</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          The Flouris et al. (2005) formula was derived from 20 young men and showed{' '}
          <strong>r = 0.92</strong> with directly measured VO2 max and a standard error of
          estimate around <strong>3.5 ml/kg/min</strong>. Accuracy is best for young, trained
          team-sport athletes (the validation population) and drops in:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Older adults (fewer have been tested; deceleration mechanics differ).</li>
          <li>Highly trained endurance athletes — the shuttle format penalizes turn efficiency.</li>
          <li>Very low fitness levels — starting speed (8.5 km/h) is already a jog, and some untrained adults can't complete even Level 1.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Beep test variants: don't confuse them</h2>
        <p className="mt-3 text-slate-700">
          Several similar-but-distinct tests exist:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Léger 20m Multi-Stage Shuttle Run</strong> (this test) — starts at 8.5 km/h,
            increases 0.5 km/h per level.
          </li>
          <li>
            <strong>FITNESSGRAM PACER</strong> — used in US school fitness testing. Similar
            format but different progression and alternative scoring. Use a PACER-specific
            calculator if you did that variant.
          </li>
          <li>
            <strong>Yo-Yo Intermittent Recovery Test</strong> — shuttle runs with 10-second
            active-recovery breaks between shuttles. Different physiology, different formula.
            See our{' '}
            <Link href="/methods/yo-yo-intermittent-recovery/" className="text-teal-700 underline">
              Yo-Yo IR1 page
            </Link>
            .
          </li>
          <li>
            <strong>NSW Police Academy / Australian Army beep test</strong> — same 20m Léger
            format but with institution-specific cutoff scores rather than VO2 max estimates.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use the beep test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Team-sport athlete evaluation.</strong> Standard across soccer, rugby,
            basketball, AFL, and more.
          </li>
          <li>
            <strong>Group testing.</strong> You can test 30 athletes at once.
          </li>
          <li>
            <strong>Military / police / emergency services selection.</strong> Many institutions
            use level/shuttle thresholds as pass-fail criteria.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For individual athletes without a 20m indoor space or a group to test with, the{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          gives similar accuracy in a simpler format.
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the beep test formula for VO2 max?',
      answer:
        'VO2 max = 3.46 × (level + shuttle / (level × 0.4325 + 7.0048)) + 12.2. For example, level 10 shuttle 7: VO2 max = 3.46 × (10 + 7 / (10 × 0.4325 + 7.0048)) + 12.2 ≈ 49.2 ml/kg/min. Flouris et al., Br J Sports Med 2005;39(3):166-170.',
    },
    {
      question: 'How accurate is the beep test?',
      answer:
        'Correlation with directly measured VO2 max is r ≈ 0.92 in fit young adults (Flouris 2005), with a standard error of estimate around 3.5 ml/kg/min. High accuracy — comparable to the Cooper 12-minute run.',
    },
    {
      question: 'What beep test level is considered good?',
      answer:
        'For recreational adult fitness: level 8–10 is average, level 10–12 is good, level 12+ is excellent. Professional team-sport athletes typically reach 13–16. Elite international soccer midfielders reach 15–17 (VO2 max 65–70+).',
    },
    {
      question: 'Is the beep test the same as PACER?',
      answer:
        'Similar but not identical. PACER (used in US school fitness tests) is a variant with slightly different speed progression and scoring. Our formula uses the standard Léger 20m MSR starting at 8.5 km/h. If you completed PACER, the results translate roughly but not exactly.',
    },
    {
      question: 'Can I run the beep test on grass or outdoors?',
      answer:
        'Yes — many team-sport tests are conducted outdoors on grass or synthetic turf. Ensure the surface is even and non-slip. Results on grass are typically 0.5–1 level lower than on hardwood because of traction and mechanical-efficiency differences.',
    },
  ],
};

export default article;
