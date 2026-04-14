import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    "The resting heart rate method (Uth-Sørensen-Overgaard-Pedersen) estimates VO2 max from the ratio of max HR to resting HR: VO2 max = 15.3 × (HRmax / HRrest). Quick, no exercise required. Low accuracy in general population.",

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>resting heart rate method</strong>, also called the Uth-Sørensen-Overgaard-
        Pedersen (USOP) method after its authors, estimates VO2 max from the ratio of your
        maximum heart rate to your resting heart rate:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max (ml/kg/min) = 15.3 × (HRmax / HRrest)
      </div>
      <p className="mt-3 text-slate-700">
        No exercise is required. Published by Uth et al. in <em>European Journal of Applied
        Physiology</em> in 2004, the method was originally validated in elite endurance
        athletes, where correlation with lab-measured VO2 max was a remarkable{' '}
        <strong>r = 0.97</strong>. In the general population, however, the correlation drops to
        r ≈ 0.50–0.70 and the standard error of estimate rises to 7–10 ml/kg/min. This is our
        <em> lowest-accuracy</em> method and should be treated as a rough screen, not a precise
        measurement.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why HRmax/HRrest works (sort of)</h2>
        <p className="mt-3 text-slate-700">
          Fitter hearts typically have higher stroke volume (more blood pumped per beat). This
          means they can satisfy the body's resting oxygen demand with fewer beats per minute,
          giving a lower resting HR. At maximum exertion, HRmax is largely genetic and doesn't
          change much with training. The ratio HRmax/HRrest therefore reflects cardiac
          efficiency: the higher the ratio, the bigger the "fitness reserve."
        </p>
        <p className="mt-3 text-slate-700">
          Uth et al. observed this relationship in elite male endurance athletes (VO2 max
          range 55–80 ml/kg/min, aged 21–51) and found that 15.3 × (HRmax/HRrest) was an
          extremely tight predictor — r = 0.97, SEE ~3 ml/kg/min. The formula works
          impressively well <em>within</em> a homogeneous, well-trained population.
        </p>
        <p className="mt-3 text-slate-700">
          The formula generalizes less well because resting HR reflects many non-fitness
          factors: hydration, caffeine, sleep debt, acute stress, fever, medication
          (particularly beta-blockers), genetics, and thyroid function. In a general-population
          sample, these factors often swamp the fitness signal.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Measure resting HR accurately.</strong> The most reliable method is a chest
            strap worn overnight — many modern HR monitors and wearables (Whoop, Oura, Garmin)
            compute a clean HRrest from overnight data.
            <br />
            If measuring manually: measure for 5 consecutive mornings, immediately after waking
            and before getting out of bed. Take the average. Single-morning measurements are
            noisy — expect ±5 bpm variation day to day.
          </li>
          <li>
            <strong>Determine HRmax.</strong> If you know it from a previous maximal test (Bruce
            protocol, all-out 1500m track effort, or a lab test), use that value. Otherwise,
            the calculator defaults to the 220 − age formula.
          </li>
          <li>
            <strong>Enter HRrest (and optionally HRmax)</strong> in the calculator.
          </li>
        </ol>
        <p className="mt-4 text-slate-700">
          Avoid measuring HRrest:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>The day after a hard workout (elevated by 5–10 bpm).</li>
          <li>When dehydrated (elevated).</li>
          <li>Within 4 hours of caffeine (elevated 5–10 bpm).</li>
          <li>During illness or fever.</li>
          <li>Immediately after waking (first minute; HR is still rising from deep sleep).</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked examples</h2>
        <p className="mt-3 text-slate-700">
          A 35-year-old recreational runner with measured HRmax of 185 and HRrest of 55:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs text-slate-800">
          VO2 max = 15.3 × (185 / 55) = 15.3 × 3.36 = <strong>51.5 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          For comparison: an elite marathon runner with HRmax 180 and HRrest 38:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs text-slate-800">
          VO2 max = 15.3 × (180 / 38) = 15.3 × 4.74 = <strong>72.5 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          A sedentary 50-year-old with HRmax 170 (220−age) and HRrest 78:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs text-slate-800">
          VO2 max = 15.3 × (170 / 78) = 15.3 × 2.18 = <strong>33.3 ml/kg/min</strong>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy caveats</h2>
        <p className="mt-3 text-slate-700">
          Three systematic issues compromise USOP accuracy in general populations:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Resting HR variability.</strong> Research shows day-to-day HRrest can vary
            ±5–10 bpm for the same individual due to sleep, stress, hydration, and caffeine. A
            10-bpm HRrest error shifts VO2 max estimate by ~5 ml/kg/min.
          </li>
          <li>
            <strong>HRmax formula error.</strong> The 220 − age formula has SD ~10 bpm. Using
            the formula instead of a measured HRmax adds ±2–3 ml/kg/min uncertainty.
          </li>
          <li>
            <strong>Medication effects.</strong> Beta-blockers, calcium channel blockers, and
            some antidepressants change HR response. Users on these medications get systematic
            VO2 max errors and should not use the resting HR method.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When is the resting HR method useful?</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You're a trained endurance athlete</strong> and want to track cardiac
            efficiency over time. HRrest trends (not single values) correlate well with fitness
            changes in athletes.
          </li>
          <li>
            <strong>You can't exercise.</strong> If a field test is contraindicated (injury,
            post-surgical, severe deconditioning), USOP gives a rough estimate without exertion.
          </li>
          <li>
            <strong>You want a zero-time screen.</strong> The method takes seconds once you have
            HR values; useful as a first-pass estimate before a more precise test.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For general-population VO2 max estimation without exercise, the{' '}
          <Link href="/methods/non-exercise-estimator/" className="text-teal-700 underline">
            Jackson non-exercise estimator
          </Link>{' '}
          is more accurate (r ≈ 0.81, SEE ≈ 5 ml/kg/min) because it incorporates multiple
          demographic + activity variables rather than HR alone.
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the resting heart rate VO2 max formula?',
      answer:
        'VO2 max (ml/kg/min) = 15.3 × (HRmax / HRrest). If HRmax is unknown, use 220 − age. Uth N, Sørensen H, Overgaard K, Pedersen PK, Eur J Appl Physiol 2004;91(1):111-115.',
    },
    {
      question: 'How accurate is the resting HR method?',
      answer:
        'Impressively accurate in elite endurance athletes (r = 0.97 in Uth et al.\'s original paper). In the general population, accuracy drops substantially to r = 0.50–0.70 with SEE around 7–10 ml/kg/min. Treat it as a screening tool, not a precise measurement.',
    },
    {
      question: 'How should I measure my resting HR?',
      answer:
        "Best option: wear an overnight HR tracker (Whoop, Oura, Garmin, Apple Watch) and use its computed HRrest. Manual option: take your pulse for 60 seconds immediately after waking, before getting up, for 5 consecutive mornings; average the values. Single-morning measurements vary ±5 bpm.",
    },
    {
      question: 'Can I use 220 − age for HRmax?',
      answer:
        'Yes, and the calculator defaults to it if you leave the HRmax field blank. Be aware this formula has a standard deviation of about 10 bpm, which adds ±2–3 ml/kg/min uncertainty to your VO2 max estimate. If you know your true HRmax from a maximal test, substituting it improves accuracy substantially.',
    },
    {
      question: 'Can I use this method if I take beta-blockers?',
      answer:
        "No — not reliably. Beta-blockers suppress both HRmax and HRrest, but by different amounts, which breaks the ratio-based formula. Users on HR-affecting medications should use the non-exercise estimator (Jackson et al.) or an exercise-based test instead, with clinical clearance.",
    },
    {
      question: 'Why is this method listed as low accuracy if Uth\'s paper showed r = 0.97?',
      answer:
        "Uth's r = 0.97 was in a narrow sample of elite endurance athletes, where resting HR genuinely reflects high cardiac efficiency. In the general population — the target audience for field tests — resting HR is heavily influenced by non-fitness factors (caffeine, stress, hydration, medications, genetics). Replication studies in mixed-fitness samples consistently report r = 0.50–0.70.",
    },
  ],
};

export default article;
