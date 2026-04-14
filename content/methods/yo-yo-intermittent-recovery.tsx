import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The Yo-Yo Intermittent Recovery Test Level 1 (IR1) is the soccer-standard fitness test. 20m shuttles with 10-second active recovery. Formula: VO2 max = distance × 0.0084 + 36.4.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Yo-Yo Intermittent Recovery Test Level 1 (IR1)</strong> estimates VO2 max
        from the total distance covered in a shuttle-and-recovery protocol designed for
        intermittent-sport athletes. Unlike the continuous{' '}
        <Link href="/methods/beep-test/" className="text-teal-700 underline">
          beep test
        </Link>
        , Yo-Yo IR1 inserts a <strong>10-second active-recovery period</strong> after each
        20m × 2 shuttle — jog to a cone 5m behind the start line and back. The formula is:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max (ml/kg/min) = distance(meters) × 0.0084 + 36.4
      </div>
      <p className="mt-3 text-slate-700">
        Developed by Jens Bangsbo and colleagues at the University of Copenhagen, the Yo-Yo IR1
        is the gold-standard fitness test for soccer and other intermittent sports. Elite male
        professional soccer players typically cover <strong>2,000–2,800 m</strong>; elite women
        cover <strong>1,400–2,000 m</strong>. The test is both a VO2 max estimator and a
        measure of repeated high-intensity effort capacity.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why add recovery periods?</h2>
        <p className="mt-3 text-slate-700">
          Bangsbo's rationale: most intermittent sports (soccer, rugby, basketball, tennis,
          handball) do not involve continuous running. Players sprint, jog, walk, and recover
          repeatedly across a 45–90-minute match. A continuous-running VO2 max test like the
          beep test measures aerobic endurance but doesn't match the physiological demands of
          these sports.
        </p>
        <p className="mt-3 text-slate-700">
          The 10-second active-recovery window in Yo-Yo IR1 engages the anaerobic-to-aerobic
          recovery processes that determine who lasts through a 90-minute match. Two players
          with the same VO2 max can score very different Yo-Yo IR1 distances — the test
          distinguishes between "cardio fit" and "match fit."
        </p>
        <p className="mt-3 text-slate-700">
          For pure VO2 max estimation, however, the formula is calibrated to the distance
          covered — longer total distance means higher VO2 max, with r ≈ 0.71–0.83 in validation
          studies.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Mark the course:</strong> a 20m line for shuttles, plus a 5m recovery lane
            behind the start (so you jog 5m out, 5m back during each recovery).
          </li>
          <li>
            <strong>Play the Yo-Yo IR1 audio track.</strong> Starting speed is 10 km/h (slower
            than beep test); speed increases as you progress through levels. Each shuttle is
            20m out + 20m back = 40m of running.
          </li>
          <li>
            <strong>Run each 2×20m shuttle</strong> in sync with the beeps. After finishing,
            use the 10-second recovery window to jog 5m and back — not walk, not stop. Return
            to the start line before the next beep.
          </li>
          <li>
            <strong>Continue until you fail</strong> to reach the 20m line by the next beep on
            two consecutive shuttles.
          </li>
          <li>
            <strong>Record total distance covered</strong> in meters (not counting the 5m
            recovery jogs — only the 40m shuttles). Enter in the calculator.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Each shuttle = 40m. To estimate distance: count how many shuttles you completed and
          multiply by 40. If the audio ends mid-shuttle, count only the fully completed 40m
          segments.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Reference distances</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Total distance (m)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">VO2 max</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Typical performer</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">400</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">39.8</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Recreational amateur</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">800</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">43.1</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Club-level amateur</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">1,200</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">46.5</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Semi-professional</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">1,600</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">49.8</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Pro women / semi-pro men</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">2,000</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">53.2</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Professional soccer midfielder</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">2,400</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">56.6</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Top-flight European professional</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">2,800</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">59.9</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Elite international midfielder</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          In Bangsbo's validation studies, correlation with directly measured VO2 max is{' '}
          <strong>r = 0.71–0.83</strong>, with SEE around 4–5 ml/kg/min. The modest correlation
          reflects what the test actually measures: Yo-Yo IR1 distance depends on anaerobic
          recovery capacity and lactate tolerance in addition to pure aerobic VO2 max.
        </p>
        <p className="mt-3 text-slate-700">
          For a sharper VO2 max estimate, a continuous test (Cooper, 1.5-mile run) is preferred.
          But for <em>match-fitness</em> — the thing the Yo-Yo IR1 is actually designed to
          measure — no other field test comes close.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Yo-Yo variants</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Yo-Yo IR1 (this test):</strong> starts at 10 km/h. Suitable for recreational
            to professional athletes. Our calculator's formula applies.
          </li>
          <li>
            <strong>Yo-Yo IR2:</strong> starts at 13 km/h. For elite-only athletes. A 200m score
            on IR2 ≈ 1000m on IR1. Different formula required.
          </li>
          <li>
            <strong>Yo-Yo Intermittent Endurance Test (IE1, IE2):</strong> 5-second recovery
            windows instead of 10. Lower intensity, longer duration. Different formula.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use Yo-Yo IR1</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Soccer, rugby, hockey, basketball, handball, lacrosse training.</strong>{' '}
            Most sport-specific field test available.
          </li>
          <li>
            <strong>Tracking match-fitness through a season.</strong> Retest every 4–6 weeks;
            changes of 100+ m are meaningful.
          </li>
          <li>
            <strong>Selection and recruitment.</strong> Used by MLS, Premier League academies,
            Australian Football League, many others.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For individual aerobic assessment without a sport-specific requirement, use the{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          or{' '}
          <Link href="/methods/beep-test/" className="text-teal-700 underline">
            continuous beep test
          </Link>
          .
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the Yo-Yo IR1 VO2 max formula?',
      answer:
        'VO2 max (ml/kg/min) = distance × 0.0084 + 36.4, where distance is total meters covered in 20m shuttles (excluding the 5m active-recovery jogs). Bangsbo J, Iaia FM, Krustrup P, Sports Med 2008;38(1):37-51.',
    },
    {
      question: 'How accurate is the Yo-Yo IR1 for VO2 max?',
      answer:
        'Correlation with directly measured VO2 max is r = 0.71–0.83 with a standard error of estimate around 4–5 ml/kg/min. Moderate accuracy; lower than Cooper or beep test because Yo-Yo performance depends on anaerobic recovery capacity in addition to pure aerobic fitness.',
    },
    {
      question: 'What is a good Yo-Yo IR1 distance?',
      answer:
        'For recreational athletes: 400–800 m. For competitive amateurs: 800–1,600 m. Semi-professional soccer players: 1,600–2,000 m. Top-flight male professionals: 2,400+ m. Elite international midfielders: 2,800+ m.',
    },
    {
      question: "What's the difference between Yo-Yo IR1 and IR2?",
      answer:
        "Starting speed. IR1 starts at 10 km/h (slow jog). IR2 starts at 13 km/h — much harder and designed only for elite athletes. A 200m score on IR2 approximately equals a 1,000m score on IR1. Use IR1 unless you're specifically testing elite-level performers.",
    },
    {
      question: 'Do I count the 5m recovery jogs in my distance?',
      answer:
        'No. Only count the 20m shuttles (each shuttle = 40m total: 20m out + 20m back). The recovery jogs are separate and not included in the distance input to the formula.',
    },
  ],
};

export default article;
