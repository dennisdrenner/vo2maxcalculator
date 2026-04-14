import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    "The Bruce treadmill protocol is the clinical gold-standard stress test. 7 stages, speed and grade increase every 3 minutes. VO2 max formulas for men and women, reference tables, and protocol details.",

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Bruce treadmill protocol</strong> is the most widely used clinical
        cardiovascular stress test in the world. Published by Robert Bruce and colleagues in{' '}
        <em>American Heart Journal</em> in 1973, it uses seven 3-minute stages of progressively
        increasing treadmill speed and grade until the tester reaches volitional exhaustion (or
        clinical endpoints in a medical setting). VO2 max is estimated from total minutes to
        exhaustion:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        Men:   VO2 max = 14.76 − 1.379·t + 0.451·t² − 0.012·t³
        <br />
        Women: VO2 max = 4.38·t − 3.9
        <br />
        (t = minutes completed)
      </div>
      <p className="mt-3 text-slate-700">
        The male equation is from Bruce et al. (1973); the female equation is from Pollock et al.
        (1982). Because the test is performed to exhaustion under controlled conditions, its
        correlation with directly measured VO2 max is <strong>r ≈ 0.95</strong> — the highest of
        any non-gas-analysis protocol.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The seven stages</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Stage</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Duration</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Speed</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Grade</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Approx. METs</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: 1, mph: 1.7, g: 10, mets: 4.7 },
                { n: 2, mph: 2.5, g: 12, mets: 7.0 },
                { n: 3, mph: 3.4, g: 14, mets: 10.1 },
                { n: 4, mph: 4.2, g: 16, mets: 12.9 },
                { n: 5, mph: 5.0, g: 18, mets: 15.0 },
                { n: 6, mph: 5.5, g: 20, mets: 17.6 },
                { n: 7, mph: 6.0, g: 22, mets: 19.9 },
              ].map((s) => (
                <tr key={s.n}>
                  <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">{s.n}</th>
                  <td className="border border-slate-200 px-3 py-2 text-right">3:00</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{s.mph.toFixed(1)} mph</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{s.g}%</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{s.mets.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          Most recreational adults reach volitional exhaustion between stages 3 and 5 (9–15
          minutes). Elite endurance athletes can complete stage 6 or into stage 7. Deconditioned
          patients and older adults are often transferred to the <strong>Modified Bruce</strong>{' '}
          variant, which prepends two 3-minute warm-up stages at 0% grade (1.7 mph and 1.7 mph
          at 5% grade) before stage 1.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Clinical setting preferred.</strong> The Bruce protocol is a maximal
            exercise test. In healthy adults, a gym treadmill and a training partner are
            sufficient. In anyone with known cardiovascular disease, hypertension, or
            cardiovascular risk factors, a clinical setting with ECG monitoring is required.
          </li>
          <li>
            <strong>Warm up for 5 minutes</strong> of easy walking before the test begins.
          </li>
          <li>
            <strong>Start stage 1: 1.7 mph at 10% grade for 3 minutes.</strong> Then stage 2,
            and so on. Treadmill adjusts automatically on clinical units; set manually on gym
            treadmills.
          </li>
          <li>
            <strong>Continue until volitional exhaustion.</strong> You reach this when you
            cannot maintain pace at the current grade even briefly, typically with HR &gt;90% of
            predicted max and RPE 18–20/20.
          </li>
          <li>
            <strong>Record total minutes to exhaustion</strong> (decimal — e.g., completed stage
            3 fully plus 1:30 into stage 4 = 10.5 min). Enter into the calculator along with sex.
          </li>
          <li>
            <strong>Cool down</strong> with 5 minutes of easy walking. Do not stop abruptly —
            blood pooling can cause dizziness or syncope.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Reference times</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Time (min)</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Men VO2 max</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Women VO2 max</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Typical population</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">6</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">22.8</td><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">22.4</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Deconditioned</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">9</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">31.4</td><td className="border border-slate-200 px-3 py-2 text-slate-600 text-right">35.5</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Average middle-aged</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">12</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">42.4</td><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">48.7</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Above-average recreational</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">15</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">55.9</td><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">61.8</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Trained recreational</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">18</th><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">70.5</td><td className="border border-slate-200 px-3 py-2 text-right tabular-nums">75.0</td><td className="border border-slate-200 px-3 py-2 text-slate-600">Elite endurance</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy and validation</h2>
        <p className="mt-3 text-slate-700">
          The Bruce protocol's correlation with directly measured VO2 max is{' '}
          <strong>r = 0.95</strong> with a standard error of estimate of about{' '}
          <strong>3.0 ml/kg/min</strong>. This is the highest accuracy of any non-gas-analysis
          method — effectively a lab-grade test, because it produces genuine maximal effort in a
          controlled environment.
        </p>
        <p className="mt-3 text-slate-700">
          The test has been used in more than 1,000 published clinical and research studies. It
          is the underlying reference for countless derivative stress-test protocols (Naughton,
          Ellestad, Balke-Ware) and the implied denominator for most "exercise capacity"
          statements in cardiology.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Caveats</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Handrails inflate time.</strong> Holding the handrails removes 10–20% of
            metabolic cost from the workload. The standardized protocol requires hands-off or
            fingertip-only contact for validity.
          </li>
          <li>
            <strong>Treadmill running mechanics differ from overground.</strong> A well-trained
            road runner may reach exhaustion earlier on a Bruce protocol than their outdoor
            performance suggests.
          </li>
          <li>
            <strong>Risk of adverse events.</strong> The test reaches near-maximal cardiac
            demand. In clinical settings it is contraindicated in unstable angina, recent MI,
            uncontrolled arrhythmia, severe aortic stenosis, and several other conditions. Know
            your medical status before attempting at maximum effort.
          </li>
          <li>
            <strong>Grade fidelity matters.</strong> Many commercial treadmills can't hold 22%
            grade precisely; if your machine caps at 15%, the test breaks down past stage 5.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use Bruce</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You have access to a high-grade treadmill</strong> and can handle a maximal
            effort. Expect the highest accuracy of any field test.
          </li>
          <li>
            <strong>You're undergoing clinical stress testing anyway.</strong> Ask for your time
            to exhaustion; the calculator on this site reproduces the standard VO2 max estimate.
          </li>
          <li>
            <strong>You want a lab-grade estimate without spirometry.</strong> No other protocol
            gets this close.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For non-treadmill options,{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          is the most accurate field-only alternative (r ≈ 0.90, outdoor running only). For
          submaximal options, use the{' '}
          <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
            Åstrand-Rhyming cycle test
          </Link>
          .
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the Bruce protocol VO2 max formula?',
      answer:
        'Men: VO2 max = 14.76 − 1.379·t + 0.451·t² − 0.012·t³. Women: VO2 max = 4.38·t − 3.9. In both equations, t is the time to exhaustion in decimal minutes on the standard Bruce protocol. Source: Bruce et al. 1973 (Am Heart J) for men; Pollock et al. 1982 for women.',
    },
    {
      question: 'How accurate is the Bruce protocol?',
      answer:
        'Correlation with directly measured VO2 max is approximately r = 0.95, with a standard error of estimate of about 3.0 ml/kg/min. It is the most accurate non-gas-analysis exercise test.',
    },
    {
      question: 'How long should a healthy adult last on the Bruce protocol?',
      answer:
        'Typical times: deconditioned adults 6–9 minutes, average recreational adults 9–12 minutes, trained adults 12–15 minutes, elite endurance athletes 15–18 minutes. Exceeding 18 minutes is Olympic-endurance territory.',
    },
    {
      question: 'What is Modified Bruce?',
      answer:
        'A variant that prepends two 3-minute warm-up stages at 0% and 5% grade (both at 1.7 mph) before stage 1. Used in cardiac rehab and with older/deconditioned patients to avoid starting at a workload that is already near-maximal.',
    },
    {
      question: 'Can I hold the handrails during a Bruce test?',
      answer:
        'No — handrails invalidate the VO2 max estimate. Holding them removes 10–20% of the metabolic cost. Standardized protocols require hands-off or fingertip-only contact. If you need handrail support, the test is not safe at that workload and should be stopped.',
    },
    {
      question: 'Is the Bruce protocol safe to do alone?',
      answer:
        "In healthy adults under 40 with no cardiovascular risk factors, it is generally safe self-administered. Above 40, with any risk factors, or with known cardiovascular conditions, it should be done in a clinical setting with ECG monitoring. The test reaches 90%+ of HRmax, which is where cardiac events cluster.",
    },
  ],
};

export default article;
