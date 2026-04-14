import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The 1.5-mile run estimates VO2 max from your finishing time. Formula: VO2 max = 483/time + 3.5. Protocol, pacing, accuracy, and calculator.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>1.5-mile run test</strong> estimates VO2 max from the time it takes you to
        cover 1.5 miles at maximum sustainable effort. The formula is:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max (ml/kg/min) = 483 / time(min) + 3.5
      </div>
      <p className="mt-3 text-slate-700">
        Published in ACSM's <em>Guidelines for Exercise Testing and Prescription</em>, 11th edition
        and derived from George et al. (1993), the 1.5-mile run is the fixed-distance counterpart
        to the Cooper 12-minute run. Both produce accurate VO2 max estimates in fit adults
        (correlation r ≈ 0.87 with lab-measured VO2 max), but the 1.5-mile version is preferred by
        racers who pace distance well and by testers who want a natural finishing line.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why a fixed distance works</h2>
        <p className="mt-3 text-slate-700">
          At distances of 1–2 miles, oxygen demand exceeds the fastest runner's ability to
          sustain sub-VO2-max intensity. A 1.5-mile all-out time trial therefore pulls average
          intensity up to ~95–100% of VO2 max across its duration — the reason the formula is so
          simple and accurate. As time gets shorter, more of the effort shifts to anaerobic
          capacity (which doesn't reflect VO2 max); as time gets longer, runners can't sustain
          VO2-max-level pace and the formula under-predicts.
        </p>
        <p className="mt-3 text-slate-700">
          The 1.5-mile distance (and its metric equivalent,{' '}
          <Link href="/methods/2-4-km-run/" className="text-teal-700 underline">
            2.4 km
          </Link>
          ) is the sweet spot: long enough to be aerobic-dominated, short enough that every
          healthy adult can hold maximal pace from start to finish.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Choose a flat, measured course.</strong> A 400-meter track × 6 laps is
            2,400 m (1.491 mi — within 0.6% of 1.5 mi). Any measured road route also works if
            it's flat and uninterrupted.
          </li>
          <li>
            <strong>Warm up for 10–15 minutes</strong> with easy jogging and 3–4 short 20-second
            strides at or slightly above goal pace. A cold-start 1.5-mile test typically
            under-predicts VO2 max by 5–10%.
          </li>
          <li>
            <strong>Run 1.5 miles as fast as possible with even pacing.</strong> The most
            common mistake is starting too fast. Plan to run lap 1 and lap 6 within ±5 seconds
            of each other; if your first 400m is 15+ seconds faster than your goal average, ease
            off.
          </li>
          <li>
            <strong>Record your finishing time</strong> to the nearest second. Convert to decimal
            minutes (e.g., 12:30 = 12.5 min, 10:45 = 10.75 min) and enter it in the calculator.
          </li>
          <li>
            <strong>Cool down</strong> with 5–10 minutes of easy jogging or walking.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Conditions matter. Hot or humid weather adds 5–15 seconds per mile; strong wind adds
          3–10 seconds per mile. For test reproducibility, retest in similar conditions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Validation studies report correlation coefficients of{' '}
          <strong>r = 0.85–0.90</strong> between 1.5-mile time and lab-measured VO2 max, with a
          standard error of estimate (SEE) of approximately{' '}
          <strong>3.0–3.5 ml/kg/min</strong>. This puts the 1.5-mile run in the same accuracy tier
          as the Cooper 12-minute run — among the most accurate field tests available.
        </p>
        <p className="mt-3 text-slate-700">
          Accuracy is best in adults aged 18–45 who can pace evenly and finish at or near
          volitional exhaustion. Accuracy degrades in:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Non-runners unfamiliar with maximal 10–15 minute efforts.</li>
          <li>Runners who bank on a huge kick, inflating apparent fitness.</li>
          <li>Adults over 60 who may slow their pacing out of caution.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What time predicts what VO2 max?</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">1.5-mile time</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">VO2 max (ml/kg/min)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Interpretation (30-yr-old)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: '16:00', v: 33.7, m: 'Below 25th percentile (men)' },
                { t: '14:00', v: 38.0, m: 'Around 25th percentile (men)' },
                { t: '12:30', v: 42.1, m: '50th percentile (men) / 90th (women)' },
                { t: '11:00', v: 47.4, m: '65th percentile (men)' },
                { t: '10:00', v: 51.8, m: '80th percentile (men)' },
                { t: '9:00', v: 57.2, m: '90th percentile (men)' },
                { t: '8:00', v: 63.9, m: '95th percentile (men)' },
                { t: '7:00', v: 72.5, m: 'Elite (men)' },
              ].map((row) => (
                <tr key={row.t}>
                  <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">{row.t}</th>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{row.v.toFixed(1)}</td>
                  <td className="border border-slate-200 px-3 py-2 text-sm text-slate-600">{row.m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">1.5-mile run vs. Cooper 12-minute</h2>
        <p className="mt-3 text-slate-700">
          Both tests are highly accurate; the difference is psychological and logistical:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>1.5-mile run (fixed distance):</strong> You know exactly where the finish
            line is. Racers who pace by splits tend to prefer this. Time pressure is constant.
          </li>
          <li>
            <strong>Cooper 12-minute (fixed time):</strong> You know exactly when to stop. New
            testers who don't know their pacing tend to prefer this — if you misjudge the first
            minute, you still have 11 left to recover. Distance pressure is constant.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For a serious racer, pick the format you have more practice with. For a newcomer to
          max-effort testing, the{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          is often easier to execute on a first attempt.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use a different test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You can't sustain running for 10+ minutes.</strong> Use the{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport 1-mile walk
            </Link>
            .
          </li>
          <li>
            <strong>You have joint or orthopedic limitations.</strong> Try the{' '}
            <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
              Åstrand-Rhyming cycle test
            </Link>
            .
          </li>
          <li>
            <strong>You prefer metric units.</strong> Use the{' '}
            <Link href="/methods/2-4-km-run/" className="text-teal-700 underline">2.4 km run</Link>{' '}
            — same formula, cleaner number.
          </li>
        </ul>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the 1.5-mile run VO2 max formula?',
      answer:
        "VO2 max (ml/kg/min) = 483 / time(min) + 3.5. For example, a 12-minute finish predicts (483/12) + 3.5 = 43.75 ml/kg/min. Source: ACSM's Guidelines for Exercise Testing and Prescription, 11th ed., derived from George et al. 1993.",
    },
    {
      question: 'How accurate is the 1.5-mile run test?',
      answer:
        'Correlation with directly measured VO2 max is r = 0.85–0.90, with a standard error of estimate of 3.0–3.5 ml/kg/min — comparable to the Cooper 12-minute run and among the most accurate field tests.',
    },
    {
      question: 'What is a good 1.5-mile time?',
      answer:
        'For a 30-year-old man: 12:30 is ~50th percentile (Average), 11:00 is ~65th (Good), 10:00 is ~80th (Excellent). For a 30-year-old woman: 13:30 is ~50th, 12:00 is ~75th (Good), 10:30 is ~90th (Excellent).',
    },
    {
      question: 'Should I run the 1.5-mile test on a track or a road?',
      answer:
        'Either works if the surface is flat and measured. A 400m track (6 laps = 2,400m = 1.491 mi, within 0.6% of 1.5 mi) is the most reproducible. Avoid routes with elevation changes — hills break the formula.',
    },
    {
      question: 'How should I pace the 1.5-mile test?',
      answer:
        'Aim for even splits. Divide your goal time by 6 to get your target lap time (e.g., 12:00 goal = 2:00 per lap). Run laps 1–5 within ±3 seconds of the target, then empty the tank on lap 6. Positive splits (slowing down) typically cost 5–15 seconds overall.',
    },
    {
      question: 'Can I run the test on a treadmill?',
      answer:
        'Yes, but set a 1% grade to approximate outdoor energy cost (treadmill running at 0% is slightly easier than outdoor flat running because there is no wind resistance). Expect a 2–5% over-prediction of outdoor VO2 max if you test on a 0%-grade treadmill.',
    },
  ],
};

export default article;
