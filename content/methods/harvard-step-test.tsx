import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The Harvard Step Test is the classic 1943 fitness test: step up and down a 20-inch bench at 30 steps/min for up to 5 minutes. Fitness Index from three recovery HR counts.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Harvard Step Test</strong> is the original step-based fitness assessment,
        developed by Lucien Brouha at the Harvard Fatigue Laboratory during World War II to
        classify U.S. military recruits. Testers step up and down a 20-inch (50 cm) bench at
        30 steps per minute for up to 5 minutes, then record three heart-rate counts during
        recovery. The Fitness Index is computed and converted to an approximate VO2 max:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        Fitness Index = (duration in seconds × 100) / (2 × (HR1 + HR2 + HR3))
        <br />
        VO2 max (ml/kg/min) ≈ 6.04 + 0.51 × FI
      </div>
      <p className="mt-3 text-slate-700">
        Where HR1, HR2, and HR3 are 30-second pulse counts taken at 1:00–1:30, 2:00–2:30, and
        3:00–3:30 post-exercise. Though the Harvard test is historically important, modern
        alternatives (Queens College, YMCA, Rockport) are more accurate and easier to
        administer. We include it for completeness and for users encountering historical
        fitness-testing literature.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Historical context</h2>
        <p className="mt-3 text-slate-700">
          The Harvard Fatigue Laboratory (1927–1947) was arguably the founding institution of
          modern exercise physiology. Brouha developed the step test to rapidly classify
          thousands of military recruits into fitness categories without specialized equipment.
          At peak wartime use, the test was administered to tens of thousands of U.S. servicemen
          per week.
        </p>
        <p className="mt-3 text-slate-700">
          Brouha's original classification scheme grouped Fitness Index values into five bands:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Excellent: FI &gt; 90</li>
          <li>Good: FI 80–89</li>
          <li>Average: FI 55–79</li>
          <li>Low average: FI 55–64</li>
          <li>Poor: FI &lt; 55</li>
        </ul>
        <p className="mt-3 text-slate-700">
          These descriptive categories predated the ACSM percentile framework we use elsewhere
          on the site — they were the original rough categorization of human fitness.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Bench: 20 inches (50 cm) for men, 16 inches (40 cm) for women</strong> in
            Brouha's original protocol. Modern implementations often use 20 inches for everyone.
            For our calculator, use 20 inches unless you specifically replicate the original
            scheme.
          </li>
          <li>
            <strong>Set metronome to 120 bpm</strong> (30 complete step cycles × 4 beats per
            cycle: up-left, up-right, down-left, down-right).
          </li>
          <li>
            <strong>Step continuously for up to 5 minutes</strong> (300 seconds). Stop if you
            can't maintain cadence for 15 consecutive seconds. Record how long you lasted to
            the nearest second.
          </li>
          <li>
            <strong>Immediately sit down.</strong> Don't walk around.
          </li>
          <li>
            <strong>Count your pulse three times:</strong>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li><strong>HR1:</strong> Count beats from 1:00 to 1:30 post-exercise (30 seconds).</li>
              <li><strong>HR2:</strong> Count beats from 2:00 to 2:30 (30 seconds).</li>
              <li><strong>HR3:</strong> Count beats from 3:00 to 3:30 (30 seconds).</li>
            </ul>
          </li>
          <li>
            <strong>Enter duration (in seconds) and the three 30-second HR counts</strong> in
            the calculator. The formula computes Fitness Index and VO2 max.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Note: the HR counts are raw 30-second counts, not bpm. The formula builds in the 2×
          factor internally (hence the "2 ×" in the denominator of the Fitness Index equation).
          Don't multiply them yourself.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked example</h2>
        <p className="mt-3 text-slate-700">
          A 28-year-old completes the full 5 minutes (300 s). His recovery 30-s HR counts are:
          HR1 = 52, HR2 = 44, HR3 = 38 (sum = 134).
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          Fitness Index = (300 × 100) / (2 × 134) = 30,000 / 268 = <strong>111.9</strong>
          <br />
          VO2 max ≈ 6.04 + 0.51 × 111.9 = 6.04 + 57.07 = <strong>63.11 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          Brouha's original classification: FI 111.9 = "Excellent." ACSM framework: 63 ml/kg/min
          puts a 28-year-old man in the "Superior" bracket (95th+ percentile).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Modern validation of the Harvard protocol against directly measured VO2 max yields
          correlation of approximately <strong>r = 0.60–0.70</strong> — the lowest of any
          exercise-based test on this site. Several limitations:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Fixed cadence, unfixed workload.</strong> A tall person and a short person
            lifting the same body mass onto a 20-inch bench do different amounts of work; the
            formula treats them identically.
          </li>
          <li>
            <strong>Leg-fatigue limited.</strong> Many testers fail the 5-minute duration
            because their legs give out, not because of cardiovascular fatigue.
          </li>
          <li>
            <strong>Manual pulse-counting error.</strong> Three 30-second counts introduce ±6
            bpm noise, which compounds through the formula.
          </li>
          <li>
            <strong>Not age-adjusted.</strong> Original validation was young military recruits;
            the VO2 max conversion under-predicts for older adults.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use Harvard step test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Historical comparison.</strong> If you have Harvard Step Test data from
            decades ago and want to compare to a current measurement, reuse the same protocol.
          </li>
          <li>
            <strong>Extreme equipment constraints.</strong> Only a bench and a stopwatch
            required; no metronome app, no HR monitor needed.
          </li>
          <li>
            <strong>Teaching exercise physiology.</strong> The test is useful for demonstrating
            the principles of recovery HR without computerized equipment.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For most practical purposes today, use:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <Link href="/methods/queens-college-step-test/" className="text-teal-700 underline">
              Queens College step test
            </Link>{' '}
            — modern successor, simpler recovery-HR measurement.
          </li>
          <li>
            <Link href="/methods/ymca-3-minute-step-test/" className="text-teal-700 underline">
              YMCA 3-minute step test
            </Link>{' '}
            — industry standard, shorter duration.
          </li>
          <li>
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport 1-mile walk
            </Link>{' '}
            — substantially more accurate.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Gear for this test</h2>
        <p className="mt-2 text-sm text-slate-600">
          Original protocol calls for a 20" bench — taller than most aerobics steps. An
          adjustable step gets you close; for exactly 20" many testers use a sturdy plyo box.
          As an Amazon Associate we earn from qualifying purchases.
        </p>
        <div className="mt-4">
          <AffiliateCard product="stepBench" />
        </div>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the Harvard Step Test Fitness Index formula?',
      answer:
        'Fitness Index = (duration in seconds × 100) / (2 × (HR1 + HR2 + HR3)), where HR1, HR2, HR3 are 30-second pulse counts taken at 1:00–1:30, 2:00–2:30, and 3:00–3:30 post-exercise. VO2 max ≈ 6.04 + 0.51 × FI. Brouha L, Res Q 1943;14:31-36.',
    },
    {
      question: 'How accurate is the Harvard Step Test for VO2 max?',
      answer:
        'Modern validation studies report correlation with directly measured VO2 max of approximately r = 0.60–0.70 — the lowest of any exercise-based test we support. Modern step tests (Queens College, YMCA) are more accurate.',
    },
    {
      question: 'What bench height does the Harvard test use?',
      answer:
        'Originally 20 inches (50 cm) for men and 16 inches (40 cm) for women. Most modern implementations use 20 inches uniformly. If you used a different bench height, results are not directly comparable to Brouha\'s classification scheme.',
    },
    {
      question: 'How long should I step during the Harvard test?',
      answer:
        'Up to 5 minutes (300 seconds). Stop earlier if you cannot maintain the 30 steps/min cadence for 15 consecutive seconds. The formula accounts for duration, so stopping early simply reduces your Fitness Index.',
    },
    {
      question: 'Why does the formula use three HR counts?',
      answer:
        'Brouha\'s design: averaging three consecutive 30-second counts smooths out rapid HR changes during the first few minutes of recovery. More recent step tests use a single recovery HR reading instead, with comparable or better accuracy.',
    },
  ],
};

export default article;
