import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The Åstrand-Rhyming cycle ergometer test estimates VO2 max from a single 6-minute submaximal workload. Protocol, nomogram, age correction, and calculator.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Åstrand-Rhyming cycle ergometer test</strong> estimates VO2 max from a single
        6-minute submaximal bout on a stationary bike. Published by Per-Olof Åstrand and Irma
        Ryhming in 1954, it is the most validated cycle-based submaximal VO2 max test and the
        standard in most European exercise-physiology curricula. The test uses steady-state heart
        rate at a known power output, your body weight, your sex, and an age-correction factor to
        predict the VO2 max you would produce on a maximal treadmill test.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The formula</h2>
        <p className="mt-3 text-slate-700">
          Åstrand and Rhyming built their model around a nomogram (a paper lookup chart) relating
          steady-state heart rate and workload to VO2 max. In computational form it is:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 (L/min) = (workload in watts × 0.01141 + 0.435) × K<sub>sex</sub> / (HR − 60)
          <br />× (195 − reference HR)
          <br />
          VO2 max (ml/kg/min) = VO2 (L/min) × 1000 / body weight kg × age correction
        </div>
        <p className="mt-3 text-slate-700">
          where K<sub>sex</sub> is a sex-specific constant, the reference HR is 195 bpm for men
          and 198 bpm for women, and the age correction factor adjusts for the fact that
          HR<sub>max</sub> declines with age (Åstrand's subjects were mostly 20–30). Our
          calculator handles all arithmetic for you; you only need your workload, steady-state
          HR, age, sex, and weight.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Set the ergometer to a workload that will elevate your HR into the 125–170
            range.</strong> A useful starting guideline: 100 watts for unconditioned women, 150 W
            for unconditioned men, 150–200 W for trained women, 200–250 W for trained men.
          </li>
          <li>
            <strong>Pedal steadily at 50–60 RPM for 6 minutes.</strong> Many modern ergometers
            display wattage directly; on older models, check the resistance-cadence chart. Keep
            cadence constant — wattage and cadence together determine oxygen demand.
          </li>
          <li>
            <strong>Record HR at minute 5 and minute 6.</strong> The two readings should be
            within 5 bpm of each other — that confirms you are in steady state. If they
            aren't, extend the test by 2 minutes or repeat at the same workload.
          </li>
          <li>
            <strong>Take the average of the minute-5 and minute-6 HR</strong> as your steady-state
            HR. Enter it in the calculator along with workload, age, sex, and weight.
          </li>
          <li>
            <strong>The result is your estimated VO2 max</strong> in ml/kg/min, age-corrected.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          If your HR is below 125 at the end of 6 minutes, the workload was too easy — increase
          resistance by 25–50 W and repeat. Above 170, the workload was too hard; reduce by 25 W.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why it works: the HR-VO2 line</h2>
        <p className="mt-3 text-slate-700">
          At submaximal intensities, heart rate rises linearly with oxygen consumption. The slope
          of that line is roughly the same for all adults; the <em>intercept</em> is shifted up
          or down by fitness. A fit 30-year-old might produce a VO2 of 2.5 L/min at HR 130; an
          unfit 30-year-old produces 2.5 L/min at HR 170. Åstrand's insight was that by
          observing HR at one submaximal workload, you can project the line up to the
          age-predicted HR<sub>max</sub> (roughly 195 for young adults) and read off predicted
          VO2 max at that intersection.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Correlation with directly measured VO2 max is around <strong>r = 0.70–0.85</strong>,
          with a standard error of estimate of roughly <strong>10–15%</strong> — less accurate
          than the Cooper or 1.5-mile run in trained populations but more accurate than most
          step-test or non-exercise methods.
        </p>
        <p className="mt-3 text-slate-700">
          The main sources of error are:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>
            <strong>Age-predicted HR<sub>max</sub> error.</strong> The "220 − age" rule has a
            standard deviation of about 10 bpm — about one-fifth of your HR range. A 10 bpm
            error in estimated HR<sub>max</sub> shifts VO2 max prediction by ~2 ml/kg/min.
          </li>
          <li>
            <strong>HR drift.</strong> In hot environments or dehydrated testers, HR drifts
            upward at constant power, inflating the apparent VO2 cost and underestimating VO2 max.
          </li>
          <li>
            <strong>Non-steady-state HR.</strong> If you stop the test before 6 minutes or don't
            verify steady state, HR may still be rising and the formula breaks.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Practical workload selection</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Group</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Starting workload</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Target HR</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Unconditioned woman</th><td className="border border-slate-200 px-3 py-2 text-right">75–100 W</td><td className="border border-slate-200 px-3 py-2">130–150 bpm</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Conditioned woman</th><td className="border border-slate-200 px-3 py-2 text-right">125–175 W</td><td className="border border-slate-200 px-3 py-2">130–160 bpm</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Unconditioned man</th><td className="border border-slate-200 px-3 py-2 text-right">100–150 W</td><td className="border border-slate-200 px-3 py-2">130–150 bpm</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Conditioned man</th><td className="border border-slate-200 px-3 py-2 text-right">175–250 W</td><td className="border border-slate-200 px-3 py-2">130–160 bpm</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          If your first attempt lands HR outside 125–170, adjust workload and rest 5 minutes
          before retesting.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use Åstrand-Rhyming</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You have access to a calibrated cycle ergometer.</strong> Any gym bike with a
            wattage display will do; older spin bikes without wattmeters will not.
          </li>
          <li>
            <strong>You prefer a non-impact test.</strong> No running, no joint loading.
          </li>
          <li>
            <strong>You want a quick submaximal test.</strong> 6 minutes of steady pedaling
            vs. a maximal 12-minute run.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          If you want higher accuracy from a cycle test, use the{' '}
          <Link href="/methods/ymca-cycle-ergometer/" className="text-teal-700 underline">
            YMCA multistage cycle ergometer
          </Link>{' '}
          instead — it uses two workloads for a personalized HR-VO2 line.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Gear for this test</h2>
        <p className="mt-2 text-sm text-slate-600">
          Steady-state HR accuracy matters — a chest strap gives cleaner readings than wrist
          optical, especially at the lower end of the HR range. As an Amazon Associate we earn
          from qualifying purchases.
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
      question: 'What is the Åstrand-Rhyming cycle test?',
      answer:
        'A 6-minute single-stage submaximal cycle ergometer test that estimates VO2 max from steady-state heart rate at a known wattage, adjusted for age and sex. Published by Åstrand and Rhyming in J Appl Physiol, 1954.',
    },
    {
      question: 'How accurate is the Åstrand test?',
      answer:
        'Correlation with directly measured VO2 max is around r = 0.70–0.85, with a standard error of estimate of roughly 10–15% of the predicted value. Moderate accuracy — better than step tests, less accurate than the Cooper run.',
    },
    {
      question: 'What workload should I use?',
      answer:
        'Target a steady-state heart rate between 125 and 170 bpm. Typical starting wattages: 75–100 W for unconditioned women, 125–175 W for conditioned women, 100–150 W for unconditioned men, 175–250 W for conditioned men. Adjust after the first attempt if HR lands outside 125–170.',
    },
    {
      question: 'Does cadence matter?',
      answer:
        'Yes. Keep cadence between 50–60 RPM (Åstrand\'s original protocol) or use the wattage-display value on a modern ergometer. Wattage and cadence together determine oxygen demand — wildly variable cadence breaks the HR-workload relationship.',
    },
    {
      question: "Can I use my Peloton or spin bike for this test?",
      answer:
        'Only if the bike displays calibrated power (watts). Many spin bikes show "resistance" on an arbitrary 1–100 scale that does not map directly to watts. Newer Peloton bikes display true watts and are suitable; older bikes without wattage displays are not.',
    },
  ],
};

export default article;
