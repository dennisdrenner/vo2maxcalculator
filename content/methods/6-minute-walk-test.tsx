import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The 6-Minute Walk Test (6MWT) estimates VO2 max from the distance walked in 6 minutes. Formula: VO2 max = 4.948 + 0.023 × meters. Clinical origin, ATS protocol, and VO2 max estimate.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>6-Minute Walk Test (6MWT)</strong> estimates VO2 max from the total distance
        you can walk on a flat course in 6 minutes. The formula, validated by Burr et al. in 2011:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max (ml/kg/min) = 4.948 + 0.023 × distance(meters)
      </div>
      <p className="mt-3 text-slate-700">
        The 6MWT originated in clinical pulmonology and cardiology — the American Thoracic
        Society published a standardized protocol in 2002 — to measure functional capacity in
        patients with COPD, heart failure, and pulmonary hypertension. Burr et al. validated its
        use as a VO2 max estimator in healthy adults. It is the easiest-to-execute of all
        validated field tests: no heart rate monitor, no pacing skill, just a flat hallway and
        a stopwatch.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Clinical origin</h2>
        <p className="mt-3 text-slate-700">
          The 6MWT was developed in the 1960s from even simpler 12-minute and 3-minute walking
          tests. The current 6-minute standard emerged because it was long enough to reveal
          submaximal aerobic capacity but short enough that frail or diseased patients could
          complete it. The American Thoracic Society (ATS) formalized the protocol in 2002 to
          ensure reproducibility across medical contexts.
        </p>
        <p className="mt-3 text-slate-700">
          The test is used globally in:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>COPD severity staging and treatment response assessment</li>
          <li>Heart-failure functional class evaluation (NYHA supplement)</li>
          <li>Pulmonary hypertension monitoring</li>
          <li>Pre- and post-operative rehab assessments</li>
          <li>Geriatric mobility screening</li>
          <li>Pulmonary rehabilitation program outcome measures</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol (ATS 2002 standard)</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Measure a 30-meter flat course</strong> — preferably indoors, in a hallway
            free of obstacles. Mark the turn points clearly.
          </li>
          <li>
            <strong>Instruct the tester:</strong> "Walk as far as possible in 6 minutes. You may
            slow down, stop, and rest if needed, but resume walking as soon as you are able."
            Do not run or jog.
          </li>
          <li>
            <strong>Start the timer</strong> when the tester begins walking. Stand still; walking
            alongside biases pace. Standardized encouragement every minute only: "You're doing
            well, 5 minutes to go"; "Keep up the good work, 4 minutes to go"; etc.
          </li>
          <li>
            <strong>At 6 minutes exactly, call stop.</strong> Record the total distance walked to
            the nearest meter.
          </li>
          <li>
            <strong>Enter distance (in meters) in the calculator</strong> — remember this input
            is always meters regardless of site unit setting.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Shoes, clothing, and recent meals affect performance. For repeat testing, standardize
          all conditions. The ATS protocol recommends two familiarization tests before the test
          that "counts" if the patient is unfamiliar — distance can improve 5–10% between the
          first and second attempts purely from learning effect.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Burr et al. (2011) validated the VO2 max formula in 446 healthy Canadian adults aged
          18–79, comparing 6MWT distance to treadmill VO2 max. Results:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Correlation with measured VO2 max: <strong>r = 0.73</strong></li>
          <li>Standard error of estimate: <strong>5.1 ml/kg/min</strong></li>
        </ul>
        <p className="mt-3 text-slate-700">
          This places the 6MWT in the "moderate accuracy" tier — less precise than the Cooper
          12-minute run or Rockport walk, but sufficient for screening and tracking. Accuracy is
          best in the 50–70 age range (where 6MWT is clinically most useful) and weakest in
          highly fit adults (the formula's distance range tops out around 700–750 m; elite
          walkers can exceed 800 m and the extrapolation becomes unreliable).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Reference distances</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Distance (m)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">VO2 max (ml/kg/min)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Clinical interpretation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">300</th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">11.8</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-600">Severe impairment; nursing-home-level function</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">400</th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">14.1</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-600">Clinical cutoff; below this flags functional concern</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">500</th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">16.4</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-600">Lower end of healthy adult range</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">600</th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">18.7</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-600">Typical healthy 60-year-old</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">700</th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">21.0</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-600">Fit middle-aged adult</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">800</th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">23.4</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-600">Near jog-transition speed; formula nearing upper limit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          Important: the VO2 max values returned by the 6MWT formula are low compared to
          maximal-effort tests because 6MWT is deeply submaximal — most testers walk at 40–60%
          of VO2 max. The Burr formula includes a baseline term (4.948) to account for this.
          Do not interpret a 6MWT result the same way you would a Cooper test result.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why distance is always in meters</h2>
        <p className="mt-3 text-slate-700">
          Unlike our other walking tests, the 6MWT formula uses distance directly in meters —
          not miles, not kilometers. The Burr formula coefficient (0.023 per meter) was
          calibrated on the meter scale, and the test's clinical heritage uses meters as the
          universal unit. Our input field therefore always expects meters regardless of the
          site's imperial/metric toggle. If you measured in feet, divide by 3.281 to convert.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use 6MWT</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You can't complete a 1-mile walk or 12-minute run.</strong> 6MWT is the
            lowest-demand validated field test.
          </li>
          <li>
            <strong>You're tracking recovery from surgery, illness, or cardiac event.</strong>{' '}
            6MWT is the clinical standard for functional-capacity tracking.
          </li>
          <li>
            <strong>You're in a geriatric or frailty context.</strong> The test doesn't require
            HR monitoring, pacing skill, or high-intensity effort.
          </li>
          <li>
            <strong>You need a quick screen.</strong> 6 minutes is the shortest validated walk
            test; Rockport requires 13–20 minutes.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For fit adults who want a sharper VO2 max estimate, use the{' '}
          <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
            Rockport 1-mile walk
          </Link>{' '}
          or a running test.
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the 6-Minute Walk Test formula for VO2 max?',
      answer:
        'VO2 max (ml/kg/min) = 4.948 + 0.023 × distance(meters). A 500 m walk predicts 16.4 ml/kg/min; a 700 m walk predicts 21.0. Burr JF et al., Phys Sportsmed, 2011;39(2):133-139.',
    },
    {
      question: 'How accurate is the 6MWT for VO2 max?',
      answer:
        'Correlation with directly measured VO2 max is r = 0.73, with a standard error of estimate of 5.1 ml/kg/min (Burr et al. 2011). Moderate accuracy — sufficient for screening and tracking, less precise than the Cooper or 1.5-mile run.',
    },
    {
      question: 'What is a good 6MWT distance?',
      answer:
        'Healthy adults typically walk 400–700 m. Below 400 m is a clinical concern (functional impairment). 500 m is the lower end of normal for 60-year-olds. 600+ m is typical for fit middle-aged adults. Elite walkers can exceed 800 m but the formula becomes less reliable.',
    },
    {
      question: 'Do I enter distance in miles or meters?',
      answer:
        'Meters, always. The 6MWT formula was calibrated in meters and the input field on this site expects meters regardless of imperial/metric toggle. If you measured in feet, divide by 3.281 to convert.',
    },
    {
      question: 'Can I jog during the 6MWT?',
      answer:
        'No. The standardized ATS protocol requires walking only. Jogging invalidates the test — the formula was derived from walking energetics, which have a different HR-VO2 relationship than jogging. If you can jog, use the Cooper 12-minute run instead.',
    },
    {
      question: 'How often should I retest with 6MWT?',
      answer:
        'In rehab and recovery contexts, every 2–4 weeks. In a healthy fitness-tracking context, every 8–12 weeks. A difference of 30+ meters between test dates is generally considered clinically meaningful.',
    },
  ],
};

export default article;
