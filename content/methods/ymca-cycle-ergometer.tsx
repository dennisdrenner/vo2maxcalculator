import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The YMCA multistage cycle ergometer test uses two submaximal workloads to predict VO2 max by linear extrapolation to age-predicted HRmax. More accurate than single-stage Åstrand.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>YMCA multistage cycle ergometer test</strong> estimates VO2 max from two
        steady-state workload stages on a calibrated cycle ergometer. Unlike the single-stage{' '}
        <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
          Åstrand-Rhyming test
        </Link>
        , the YMCA protocol uses two data points to fit an individualized HR-workload line,
        then extrapolates to age-predicted maximum heart rate to find predicted maximum power
        output. The ACSM leg-cycle metabolic equation converts predicted max watts to VO2 max:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        Slope = (W<sub>2</sub> − W<sub>1</sub>) / (HR<sub>2</sub> − HR<sub>1</sub>)
        <br />
        Predicted Max W = W<sub>2</sub> + Slope × (HR<sub>max</sub> − HR<sub>2</sub>)
        <br />
        VO2 max (ml/kg/min) = 10.8 × Max W / weight(kg) + 7
      </div>
      <p className="mt-3 text-slate-700">
        Because two data points are more informative than one, the YMCA test is more accurate
        than Åstrand-Rhyming (<strong>r ≈ 0.86</strong>, SEE ~10% of predicted value). It is the
        ACSM-recommended submaximal cycle test.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why two stages beat one</h2>
        <p className="mt-3 text-slate-700">
          Åstrand-Rhyming's single-stage test uses a <em>population-average</em> HR-VO2 slope
          and shifts it up or down based on your submaximal HR. This is efficient but
          imprecise — individuals vary meaningfully in the slope of their HR-power relationship,
          and the population-average assumption adds error.
        </p>
        <p className="mt-3 text-slate-700">
          The YMCA protocol measures <em>your</em> slope directly: by observing HR at two
          different submaximal workloads, we have two points on your personal HR-power line. A
          simple linear fit through those two points is a better predictor of your individual
          maximum workload than any population-average shortcut.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Equipment:</strong> cycle ergometer with calibrated wattage display (not just
            "resistance level"), heart rate monitor (chest strap preferred).
          </li>
          <li>
            <strong>Warm-up:</strong> 2–3 minutes at 25–50 W.
          </li>
          <li>
            <strong>Stage 1:</strong> pedal at a workload that produces HR between 110 and 140
            bpm. Typical starting workloads:
            <ul className="mt-2 list-disc space-y-0.5 pl-6 text-sm">
              <li>Unconditioned woman: 100 W</li>
              <li>Unconditioned man: 150 W</li>
              <li>Conditioned woman: 125–150 W</li>
              <li>Conditioned man: 150–200 W</li>
            </ul>
            Continue until HR stabilizes (two consecutive minute readings within 5 bpm). This
            typically takes 3–5 minutes. Record HR₁ and W₁.
          </li>
          <li>
            <strong>Stage 2:</strong> without stopping, increase the workload so that HR rises
            15–25 bpm above HR₁ (ideally into the 130–160 range). Hold until steady state
            again (3–5 minutes). Record HR₂ and W₂.
          </li>
          <li>
            <strong>Stop pedaling.</strong> Enter W₁, HR₁, W₂, HR₂, age, and weight in the
            calculator. The formula does the rest.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Target HRs for stage 2 depend on fitness. Aim for HR₂ to be at least 85% of predicted
          HRmax (220 − age) in fit subjects, and at least 70% in sedentary subjects. HR₂ below
          these thresholds produces a shallower slope and over-estimated max watts.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked example</h2>
        <p className="mt-3 text-slate-700">
          A 40-year-old man weighing 80 kg pedals:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Stage 1: 150 W, steady HR 128 bpm</li>
          <li>Stage 2: 200 W, steady HR 150 bpm</li>
        </ul>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          HRmax = 220 − 40 = 180
          <br />
          Slope = (200 − 150) / (150 − 128) = 50 / 22 = 2.27 W/bpm
          <br />
          Predicted Max W = 200 + 2.27 × (180 − 150) = 200 + 68.2 = 268.2 W
          <br />
          VO2 max = 10.8 × 268.2 / 80 + 7 = 36.2 + 7 = <strong>43.2 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          For a 40-year-old man, 43.2 ml/kg/min is around the 75th percentile ("Good").
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The ACSM leg-cycle equation</h2>
        <p className="mt-3 text-slate-700">
          The conversion from watts to VO2 max uses ACSM's standard leg-cycling metabolic
          equation: VO2 = 10.8 × watts / weightKg + 7. The 7 ml/kg/min constant accounts for the
          oxygen cost of unloaded cycling (moving the legs without resistance); the 10.8 factor
          converts work rate (J/s) to oxygen cost per unit body weight based on standard
          cycling efficiency (~25%).
        </p>
        <p className="mt-3 text-slate-700">
          This equation is published in ACSM's <em>Guidelines for Exercise Testing and
          Prescription</em>, 11th edition. It is the universally used formula for estimating VO2
          from cycling power output in submaximal and graded-exercise tests.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Validation studies report correlation of <strong>r ≈ 0.86</strong> with directly
          measured VO2 max and SEE around <strong>10%</strong> of the predicted value. Accuracy
          is meaningfully better than single-stage Åstrand-Rhyming (r ≈ 0.75, SEE ~15%).
        </p>
        <p className="mt-3 text-slate-700">Key error sources:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>HRmax estimation error.</strong> The 220 − age formula has SD ~10 bpm. A
            10-bpm error in HRmax shifts predicted max watts by ~22 W (at 2.2 W/bpm slope) and
            VO2 max by ~3 ml/kg/min.
          </li>
          <li>
            <strong>Non-steady-state HR.</strong> If HR hasn't plateaued at either stage, the
            slope is wrong. Always verify HR stability across the last 2 minutes of each stage.
          </li>
          <li>
            <strong>Workload calibration.</strong> Many consumer bikes display wattage but
            aren't precisely calibrated — can err ±10%.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use YMCA cycle vs. Åstrand</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Use YMCA cycle if:</strong> You have time for two 3–5 minute stages and want
            the most accurate cycle-based VO2 max estimate. Standard in ACSM-certified fitness
            settings.
          </li>
          <li>
            <strong>Use Åstrand-Rhyming if:</strong> You want a quicker test (single 6-minute
            stage). Useful for routine screening where you'll retest the same subjects over time.
          </li>
          <li>
            <strong>Use Cooper or 1.5-mile run if:</strong> You can run. Running tests are more
            accurate than cycle tests in trained runners because cycling VO2 max is typically
            5–10% lower than running VO2 max even in well-cross-trained athletes.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Gear for this test</h2>
        <p className="mt-2 text-sm text-slate-600">
          Two-stage tests require verifying HR stability within 5 bpm — chest straps make that
          easier than wrist optical. As an Amazon Associate we earn from qualifying purchases.
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
      question: 'What is the YMCA cycle ergometer formula?',
      answer:
        'Slope = (W2 − W1)/(HR2 − HR1). Predicted Max W = W2 + Slope × (HRmax − HR2), where HRmax = 220 − age. Then VO2 max = 10.8 × Max W / weight(kg) + 7 (ACSM leg-cycling equation). Source: Golding LA, YMCA Fitness Testing and Assessment Manual, 4th ed., 2000. ACSM Guidelines 11th ed.',
    },
    {
      question: "What workloads should I use for the two stages?",
      answer:
        'Stage 1 should produce HR 110–140 bpm; stage 2 should produce HR 15–25 bpm higher (ideally 130–160). Starting workloads: 100–150 W for unconditioned women/men, 150–250 W for conditioned women/men. Adjust after the first attempt if HR lands outside target ranges.',
    },
    {
      question: 'Is YMCA cycle more accurate than Åstrand-Rhyming?',
      answer:
        'Yes — two data points produce a better individualized HR-power slope than one. YMCA correlation with lab VO2 max is r ≈ 0.86 vs. Åstrand\'s r ≈ 0.75. For research-grade submaximal cycle testing, YMCA is the ACSM-recommended protocol.',
    },
    {
      question: 'Can I use a Peloton or consumer exercise bike for this test?',
      answer:
        "Only if the bike displays calibrated watts. Many consumer bikes show an arbitrary \"resistance level\" that doesn't map cleanly to watts. Newer Peloton, Stages, Wahoo, and commercial gym bikes generally display true watts. Older spin bikes without wattage displays are not suitable.",
    },
    {
      question: 'Why does the formula use 220 − age for HRmax?',
      answer:
        "It\u2019s the conventional age-predicted HRmax formula with a standard deviation of about 10 bpm. More accurate alternatives (Tanaka: 208 − 0.7 × age; Nes: 211 − 0.64 × age) exist. If you know your true HRmax from a maximal test, substituting it improves accuracy by ~3 ml/kg/min per 10 bpm correction.",
    },
  ],
};

export default article;
