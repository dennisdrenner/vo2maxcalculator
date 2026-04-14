import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The Cooper 12-minute run estimates VO2 max from distance covered in 12 minutes. Formula: VO2 max = (35.97 × miles) − 11.29. Protocol, accuracy, history, and calculator.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Cooper 12-minute run</strong> estimates VO2 max from the total distance you
        can run in 12 minutes on a flat course. The formula is{' '}
        <strong>VO2 max (ml/kg/min) = (35.97 × miles) − 11.29</strong>, or equivalently{' '}
        <strong>(0.0225 × meters) − 11.3</strong>. It is the oldest and best-known VO2 max field
        test, published by Dr. Kenneth Cooper in 1968 in <em>JAMA</em>, and still one of the most
        accurate: correlation with laboratory treadmill VO2 max is approximately{' '}
        <strong>r = 0.90</strong> in trained populations. All you need is a running track or a
        measured flat course and a watch.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The Cooper 12-minute run formula</h2>
        <p className="mt-3 text-slate-700">
          In Cooper's original paper, he measured 115 male U.S. Air Force personnel on a treadmill
          VO2 max test and then had them run for 12 minutes on a track. The resulting linear
          regression between distance and VO2 max is the formula still used today:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
          VO2 max (ml/kg/min) = (35.97 × miles covered) − 11.29
        </div>
        <p className="mt-3 text-slate-700">
          In metric units, the equivalent form is:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
          VO2 max (ml/kg/min) = (distance in meters × 0.0225) − 11.3
        </div>
        <p className="mt-3 text-slate-700">
          A runner who covers exactly 1.5 miles (2,414 m) in 12 minutes is predicted to have a
          VO2 max of about <strong>42.66 ml/kg/min</strong>. A runner who covers 2.0 miles
          (3,218 m) is predicted at <strong>60.65 ml/kg/min</strong> — solidly into "Excellent"
          territory for most age brackets. The{' '}
          <Link href="/" className="text-teal-700 underline">calculator at the top</Link>{' '}
          does the arithmetic for you.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol: how to run the test correctly</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Pick a flat, measured surface.</strong> A 400-meter track is ideal. If you use
            a road route, measure it in advance (GPS watches are accurate within ±1%). Avoid hills
            — gradient adds physiological cost not captured by the formula.
          </li>
          <li>
            <strong>Warm up for 10–15 minutes.</strong> Easy jogging plus 3–4 short strides at
            goal pace. A cold-start 12-minute test will underestimate your VO2 max by 5–10%.
          </li>
          <li>
            <strong>Start your watch and run.</strong> Cover as much ground as possible in exactly
            12 minutes. Pace evenly — the most common mistake is starting too fast and slowing in
            minutes 7–12. Target even or slightly negative splits.
          </li>
          <li>
            <strong>Stop at 12:00 exactly.</strong> Mark your position on the track (or freeze
            your GPS). Record total distance to the nearest 25–50 meters.
          </li>
          <li>
            <strong>Enter the distance in the calculator</strong>, pick imperial (miles) or
            metric (meters), and read your VO2 max plus percentile.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Weather matters. Hot conditions (&gt;25°C / 77°F) can cut 12-minute distance by
          50–200 meters; cold or high-wind conditions similarly degrade performance. For
          reproducible testing, retest in similar conditions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy: how good is the 12-minute run?</h2>
        <p className="mt-3 text-slate-700">
          Cooper's original validation reported a correlation of <strong>r = 0.897</strong> between
          12-minute distance and directly measured VO2 max in 115 male airmen aged 17–52. Later
          replications in mixed-sex civilian populations have reported correlations ranging from{' '}
          <strong>r = 0.84 to 0.94</strong> when testers are adequately motivated and paced
          evenly. The <strong>standard error of estimate</strong> is typically 3.0–3.5 ml/kg/min —
          meaning individual predictions are accurate to within roughly ±3 ml/kg/min for 68% of
          test subjects and ±6 ml/kg/min for 95%.
        </p>
        <p className="mt-3 text-slate-700">
          The test tends to <em>underestimate</em> VO2 max in:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Non-runners who have cardiorespiratory capacity but lack running economy.</li>
          <li>Adults over 50 who are unused to maximal pacing efforts.</li>
          <li>Anyone testing for the first time (pacing is a skill).</li>
        </ul>
        <p className="mt-3 text-slate-700">
          It tends to <em>overestimate</em> VO2 max in:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Highly economical runners (Kenyan- and Ethiopian-ethnicity distance runners in
            particular can produce 12-minute distances that suggest VO2 max values 3–5 ml/kg/min
            above their measured lab values).</li>
          <li>Testers who pace erratically with a big finishing kick.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What distance do you need?</h2>
        <p className="mt-3 text-slate-700">
          Here is a quick reference: 12-minute distances and their implied VO2 max values.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Distance (miles)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Distance (meters)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">VO2 max (ml/kg/min)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { mi: 1.0, m: 1609, v: 24.7 },
                { mi: 1.25, m: 2012, v: 33.7 },
                { mi: 1.5, m: 2414, v: 42.7 },
                { mi: 1.75, m: 2816, v: 51.7 },
                { mi: 2.0, m: 3218, v: 60.7 },
                { mi: 2.25, m: 3621, v: 69.6 },
                { mi: 2.5, m: 4023, v: 78.6 },
              ].map((row) => (
                <tr key={row.mi}>
                  <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">{row.mi}</th>
                  <td className="border border-slate-200 px-3 py-2">{row.m.toLocaleString()}</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{row.v.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          For context: the 50th percentile for a 30-year-old man is ~42 ml/kg/min, corresponding to
          roughly 1.5 miles in 12 minutes. The 90th-percentile value of ~57 implies about 1.9 miles.
          Elite male distance runners routinely cover 2.4–2.6 miles (3,860–4,180 m).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">History and context</h2>
        <p className="mt-3 text-slate-700">
          Dr. Kenneth H. Cooper developed the 12-minute run while serving as a flight surgeon in
          the U.S. Air Force. Before Cooper's work, cardiorespiratory assessment required
          expensive gas-analysis equipment and direct medical supervision. Cooper needed a way to
          assess thousands of airmen rapidly and reproducibly. The 12-minute run — and the
          broader "aerobics" concept Cooper developed from it — shifted exercise physiology from
          a laboratory discipline to a public-health tool. His 1968{' '}
          <em>JAMA</em> paper and the 1968 book <em>Aerobics</em> launched what became the
          modern running boom.
        </p>
        <p className="mt-3 text-slate-700">
          The percentile norms on this site come from The Cooper Institute, the nonprofit Cooper
          founded in 1970 in Dallas. Its Aerobics Center Longitudinal Study has collected
          treadmill VO2 max data on more than 80,000 adults — one of the largest cardiorespiratory
          fitness datasets in the world, and the source data behind ACSM's{' '}
          <em>Guidelines for Exercise Testing and Prescription</em>, 11th edition.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use a different test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You can't run steadily for 12 minutes.</strong> Use the{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport 1-mile walk
            </Link>{' '}
            — validated for adults of all fitness levels and requires only walking.
          </li>
          <li>
            <strong>You pace races better than time trials.</strong> The{' '}
            <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
              1.5-mile run
            </Link>{' '}
            uses a fixed distance and may produce more consistent results for experienced racers.
          </li>
          <li>
            <strong>You have a cycle ergometer.</strong> The{' '}
            <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
              Åstrand-Rhyming cycle
            </Link>{' '}
            test is submaximal and lower-impact while still producing good accuracy.
          </li>
          <li>
            <strong>You want no-exercise options.</strong> The{' '}
            <Link href="/methods/non-exercise-estimator/" className="text-teal-700 underline">
              non-exercise estimator
            </Link>{' '}
            uses demographic data + self-reported activity; accuracy is lower but no test is
            required.
          </li>
        </ul>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the Cooper 12-minute run formula?',
      answer:
        'VO2 max (ml/kg/min) = (35.97 × miles covered in 12 minutes) − 11.29. In metric units: (distance in meters × 0.0225) − 11.3. A 12-minute distance of 1.5 miles (2,414 m) predicts a VO2 max of 42.7 ml/kg/min.',
    },
    {
      question: 'How accurate is the Cooper test?',
      answer:
        'Correlation with directly measured laboratory VO2 max is approximately r = 0.90 in Cooper\'s original validation of 115 U.S. Air Force airmen, with later studies reporting r = 0.84–0.94. The standard error of estimate is typically 3.0–3.5 ml/kg/min.',
    },
    {
      question: 'What is a good Cooper test distance?',
      answer:
        'Context-dependent. For a 30-year-old man, the 50th percentile is around 1.5 miles (corresponding to VO2 max ~42); 90th percentile is around 1.9 miles (~57). For a 30-year-old woman, 50th is ~1.3 miles and 90th is ~1.7. See the /chart/ page for every age bracket.',
    },
    {
      question: 'Should I warm up before the Cooper test?',
      answer:
        'Yes — a cold-start 12-minute test can underestimate VO2 max by 5–10%. Warm up with 10–15 minutes of easy jogging plus 3–4 short strides at goal pace before the test.',
    },
    {
      question: 'Can I run the Cooper test on a treadmill?',
      answer:
        'The original formula was validated on outdoor running, which has slightly higher energy cost than treadmill running at the same speed (no wind resistance indoors). If testing on a treadmill, set a 1% grade to approximate outdoor cost, or expect a 2–5% underestimate of your outdoor VO2 max.',
    },
    {
      question: 'Why 12 minutes and not 10 or 15?',
      answer:
        'Cooper chose 12 minutes empirically: long enough that the test is dominated by aerobic metabolism (not anaerobic capacity), short enough that even untrained subjects can sustain near-maximal effort. Shorter tests overweight anaerobic capacity; longer tests favor pacing skill and glycogen availability.',
    },
  ],
};

export default article;
