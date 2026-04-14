import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The 2.4 km run is the metric equivalent of the 1.5-mile run (VO2 max = 483/time + 3.5). Same formula, cleaner number. Widely used in military and European fitness testing.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>2.4 km run test</strong> estimates VO2 max from your finishing time over a
        2.4-kilometer measured course. It uses the same regression equation as the 1.5-mile run
        because the two distances are effectively identical (2.4 km = 1.491 mi, a 0.6% difference):
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max (ml/kg/min) = 483 / time(min) + 3.5
      </div>
      <p className="mt-3 text-slate-700">
        The 2.4 km variant is the standard metric format for military fitness testing worldwide —
        the Finnish Defence Forces Cooper test, British Army AFT variants, and most European
        university fitness batteries use 2.4 km rather than 1.5 mi. Accuracy and interpretation
        are identical to the{' '}
        <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
          1.5-mile run
        </Link>
        .
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why 2.4 km rather than 1.5 miles?</h2>
        <p className="mt-3 text-slate-700">
          The underlying test is identical. The difference is convention: English-speaking
          regions (US, UK outside the armed forces, Canada, Australia) tend to use 1.5 miles;
          metric regions typically use 2.4 km. The formula was derived on a population that
          included both — George et al.'s 1993 validation paper explicitly discussed both
          distances — and the constant of 2,414 meters (1.5 miles exactly) vs. 2,400 meters
          (2.4 km) changes predicted VO2 max by only about 0.05 ml/kg/min.
        </p>
        <p className="mt-3 text-slate-700">
          For record-keeping with metric-native athletes (most of Europe, most of Asia, most of
          South America), using 2.4 km avoids awkward mile conversions and keeps all split times
          and pacing calculations in kilometers.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Choose a flat measured course.</strong> A 400-meter track × 6 laps is
            2,400 m exactly. Any flat road/trail loop with a confirmed distance also works.
          </li>
          <li>
            <strong>Warm up for 10–15 minutes</strong> with easy running and a few short strides.
          </li>
          <li>
            <strong>Run 2.4 km as fast as possible with even pacing.</strong> Plan 400m splits
            around your goal pace. A 12:00 goal = 2:00 per 400m; 9:00 goal = 1:30 per 400m.
          </li>
          <li>
            <strong>Record your finishing time to the nearest second.</strong> Convert to decimal
            minutes (e.g., 11:30 → 11.5, 9:45 → 9.75) and enter it in the calculator.
          </li>
          <li>
            <strong>Cool down</strong> with 5–10 minutes of easy jogging or walking.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Because the formula is identical to the 1.5-mile run, accuracy is identical:
          correlation r ≈ 0.87 with directly measured VO2 max and standard error of estimate
          around 3.0–3.5 ml/kg/min. This is among the highest accuracy tiers available from a
          field test — comparable to the Cooper 12-minute run and substantially tighter than
          walking, step, or non-exercise methods.
        </p>
        <p className="mt-3 text-slate-700">
          The same caveats apply:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Pacing matters — uneven splits cost 5–15 seconds.</li>
          <li>Weather affects result (heat, wind, altitude).</li>
          <li>Requires ability to sustain near-maximal effort for 9–15 minutes.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Reference times</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">2.4 km time</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">VO2 max (ml/kg/min)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Pace (min/km)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: '15:00', v: 35.7, p: '6:15' },
                { t: '13:00', v: 40.7, p: '5:25' },
                { t: '11:30', v: 45.5, p: '4:47' },
                { t: '10:00', v: 51.8, p: '4:10' },
                { t: '9:00', v: 57.2, p: '3:45' },
                { t: '8:00', v: 63.9, p: '3:20' },
                { t: '7:00', v: 72.5, p: '2:55' },
              ].map((row) => (
                <tr key={row.t}>
                  <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">{row.t}</th>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{row.v.toFixed(1)}</td>
                  <td className="border border-slate-200 px-3 py-2">{row.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Military and institutional use</h2>
        <p className="mt-3 text-slate-700">
          Variants of the 2.4 km run are used for fitness standards in militaries and
          institutions worldwide:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Finnish Defence Forces</strong> — 12 minutes or 2.4 km Cooper variant,
            annual for all personnel.
          </li>
          <li>
            <strong>Singapore Armed Forces</strong> — 2.4 km run, part of IPPT (Individual
            Physical Proficiency Test).
          </li>
          <li>
            <strong>Indian Armed Forces</strong> — 2.4 km run in physical efficiency tests for
            recruitment.
          </li>
          <li>
            <strong>Royal Thai Air Force</strong> and many other Asian-Pacific militaries —
            2.4 km is a standard element.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          Note: institutional scoring tables often translate 2.4 km time directly into a
          100-point pass/fail scale rather than a VO2 max estimate. The calculator on this site
          returns the underlying VO2 max value regardless.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use a different test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You're training in miles.</strong> Use the{' '}
            <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
              1.5-mile run
            </Link>{' '}
            — identical test, imperial units.
          </li>
          <li>
            <strong>You want fixed time rather than fixed distance.</strong> The{' '}
            <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
              Cooper 12-minute run
            </Link>{' '}
            lets you focus on effort rather than pacing a distance.
          </li>
          <li>
            <strong>You can't sustain running for 10+ minutes.</strong> Try the{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport walk
            </Link>
            .
          </li>
        </ul>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the 2.4 km run VO2 max formula?',
      answer:
        'VO2 max (ml/kg/min) = 483 / time(min) + 3.5. The same equation as the 1.5-mile run, because the two distances are nearly identical (2.4 km = 1.491 mi). A 10:00 finish predicts 51.8 ml/kg/min.',
    },
    {
      question: 'Is the 2.4 km test the same as the 1.5-mile test?',
      answer:
        'Yes for all practical purposes. The two distances differ by 0.6% (14 m), a difference smaller than the formula\'s inherent measurement error. Results are interchangeable.',
    },
    {
      question: 'What is a good 2.4 km time?',
      answer:
        'For a 30-year-old man: 13:00 is ~50th percentile (Average), 11:30 is ~65th (Good), 10:30 is ~80th (Excellent). For a 30-year-old woman: 14:00 is ~50th, 12:30 is ~75th (Good), 11:00 is ~90th (Excellent).',
    },
    {
      question: 'Is the 2.4 km test used in militaries?',
      answer:
        'Widely. The Finnish Defence Forces, Singapore Armed Forces, Indian Armed Forces, and many other militaries and institutions use the 2.4 km (or 1.5-mile) run as the standard aerobic fitness test.',
    },
    {
      question: "Does altitude affect my 2.4 km time?",
      answer:
        'Yes — VO2 max drops about 1% per 100 m above 1,500 m elevation. At 2,500 m, expect 10–12% slower times than at sea level. For consistent testing, retest at the same altitude.',
    },
  ],
};

export default article;
