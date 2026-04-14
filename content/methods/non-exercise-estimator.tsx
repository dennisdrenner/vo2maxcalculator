import Link from 'next/link';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The Jackson non-exercise VO2 max estimator uses age, sex, BMI, and a 0–7 physical activity rating. No exercise required. Formula, PAR scale, and accuracy.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>Jackson non-exercise VO2 max estimator</strong> predicts VO2 max from four
        inputs: age, sex, BMI, and a self-reported physical activity rating (PAR) on a 0–7
        scale. No exercise test is required. The formula, from Jackson et al. 1990 in{' '}
        <em>Medicine & Science in Sports & Exercise</em>:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
        VO2 max = 56.363 + 1.921·PAR − 0.381·age − 0.754·BMI + 10.987·sex
      </div>
      <p className="mt-3 text-slate-700">
        where sex is 1 for male, 0 for female. Validated on 2,009 adults (1,393 men, 616 women)
        from the Cooper Institute Aerobics Center Longitudinal Study, the formula achieves{' '}
        <strong>R² = 0.66</strong> against directly measured VO2 max with a standard error of
        estimate of <strong>5.35 ml/kg/min</strong>. Surprisingly accurate for a method that
        requires no physical test — it beats the resting-HR method in most real-world samples.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The physical activity rating scale</h2>
        <p className="mt-3 text-slate-700">
          The PAR scale is the heart of the formula — the 1.921 coefficient is the largest in
          absolute magnitude, so the PAR you report dominates the prediction. Pick the level
          that best describes your activity over the past six months:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">PAR</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">0</th><td className="border border-slate-200 px-3 py-2">Sedentary: avoid walking or exertion. Always use the elevator. Drive whenever possible.</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">1</th><td className="border border-slate-200 px-3 py-2">Walk for pleasure; use stairs occasionally. Light yard work or similar activity.</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">2</th><td className="border border-slate-200 px-3 py-2">10–60 minutes per week of light activity: golf, housework, garden work, bowling, slow cycling.</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">3</th><td className="border border-slate-200 px-3 py-2">More than 1 hour per week of light activity (as above).</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">4</th><td className="border border-slate-200 px-3 py-2">Run less than 1 mile per week, or spend less than 30 minutes per week in comparable exercise (tennis, basketball, swimming, cycling, jogging).</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">5</th><td className="border border-slate-200 px-3 py-2">Run 1–5 miles per week, or spend 30–60 minutes per week in comparable exercise.</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">6</th><td className="border border-slate-200 px-3 py-2">Run 5–10 miles per week, or spend 1–3 hours per week in comparable exercise.</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">7</th><td className="border border-slate-200 px-3 py-2">Run more than 10 miles per week, or spend more than 3 hours per week in comparable exercise.</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          Be honest. The most common error is over-reporting — self-reported exercise minutes
          across many studies are inflated by ~25% on average. If you exercise intermittently
          (3 weeks on, 2 weeks off), pick the rating that reflects your <em>typical</em>{' '}
          sustained pattern, not peak weeks.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why it works surprisingly well</h2>
        <p className="mt-3 text-slate-700">
          The Jackson formula leverages four orthogonal predictors:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Age</strong> captures the well-documented 10%-per-decade VO2 max decline
            after 30.
          </li>
          <li>
            <strong>Sex</strong> captures the 15–20% male-female difference in VO2 max driven by
            hemoglobin, cardiac size, and lean-mass differences.
          </li>
          <li>
            <strong>BMI</strong> captures body composition effects — higher BMI typically
            correlates with lower VO2 max because VO2 max is normalized to body mass (more
            non-muscle mass dilutes the VO2 ratio).
          </li>
          <li>
            <strong>PAR</strong> captures the training effect — the active lifestyle factor
            that modulates the genetic baseline.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          Collectively these four inputs explain 66% of the variance in measured VO2 max across
          a large, heterogeneous sample — roughly what a single moderate-accuracy field test
          achieves.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked example</h2>
        <p className="mt-3 text-slate-700">
          A 42-year-old man, 180 lb (82 kg), 5'10" (178 cm). BMI = 82 / 1.78² = 25.9. Activity
          rating 4 (runs about a mile a week, plays recreational tennis twice a month).
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 max = 56.363 + 1.921·4 − 0.381·42 − 0.754·25.9 + 10.987·1
          <br />
          = 56.363 + 7.684 − 16.002 − 19.529 + 10.987
          <br />= <strong>39.5 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          For a 42-year-old man, 39.5 ml/kg/min is around the 60th percentile ("Good"). If he
          increased activity to PAR 6 (5–10 miles/wk), the formula predicts 43.3 ml/kg/min — a
          4-point gain consistent with typical 10–15% improvements in moderate-volume training.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy</h2>
        <p className="mt-3 text-slate-700">
          Jackson et al.'s validation (1990) on 2,009 adults from Cooper Institute ACLS data:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>R² = 0.66 (explains 66% of variance in measured VO2 max)</li>
          <li>Standard error of estimate: 5.35 ml/kg/min</li>
          <li>Correlation r ≈ 0.81</li>
        </ul>
        <p className="mt-3 text-slate-700">
          This is better than many of our exercise-based tests (Queens College step: r = 0.75,
          Harvard step: r = 0.65) and far better than the resting HR method in general
          populations. The limiting factor is self-report bias — testers who over-report activity
          get over-predicted VO2 max.
        </p>
        <p className="mt-3 text-slate-700">
          Replications have confirmed the formula performs consistently across different
          populations. The NASA Physical Activity Status Scale (NASA-PASS) and a few institutional
          variants use essentially the same underlying PAR + demographic approach.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use the non-exercise estimator</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You can't or won't exercise for a test.</strong> Injured, post-surgical,
            medical contraindications, extreme deconditioning. Jackson is the most accurate
            no-test option.
          </li>
          <li>
            <strong>You want a quick baseline</strong> before deciding whether to invest time
            in a field test.
          </li>
          <li>
            <strong>You're running a screening program.</strong> The Cooper Institute still
            uses this formula for risk stratification in population-health contexts.
          </li>
          <li>
            <strong>You're tracking a population over time.</strong> When aggregated across
            people, self-report biases partially cancel; Jackson is useful for organizational
            cohort studies.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For individual precision, an exercise-based test is still preferable. The{' '}
          <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
            Rockport walk
          </Link>{' '}
          or{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper run
          </Link>{' '}
          will give you a tighter VO2 max estimate at the cost of 15–20 minutes of exertion.
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: "What is the Jackson non-exercise VO2 max formula?",
      answer:
        'VO2 max = 56.363 + 1.921·PAR − 0.381·age − 0.754·BMI + 10.987·sex. Sex = 1 for male, 0 for female; PAR is a 0–7 physical activity rating; BMI is in kg/m². Jackson AS, Blair SN, Mahar MT et al., Med Sci Sports Exerc 1990;22(6):863-870.',
    },
    {
      question: 'What is the physical activity rating (PAR) scale?',
      answer:
        'A 0–7 self-assessment of typical weekly activity. 0 = sedentary, 1 = occasional walking, 2–3 = light weekly activity, 4 = run <1 mile/wk or 30 min/wk equivalent, 5 = 1–5 miles/wk or 30–60 min/wk, 6 = 5–10 miles/wk or 1–3 hr/wk, 7 = >10 miles/wk or >3 hr/wk of comparable exercise.',
    },
    {
      question: 'How accurate is the non-exercise estimator?',
      answer:
        'Correlation with directly measured VO2 max is r ≈ 0.81 with a standard error of estimate of 5.35 ml/kg/min in Jackson et al.\'s original 2,009-subject validation. Better than many exercise-based tests in general populations, though individual predictions can err ±5 ml/kg/min.',
    },
    {
      question: 'Should I pick my current PAR or my highest recent PAR?',
      answer:
        "Pick the rating that describes your typical sustained activity over the past 3–6 months. Brief peaks don't reflect cardiorespiratory fitness, which responds to consistent load over weeks to months.",
    },
    {
      question: 'Does BMI distort the estimate for muscular people?',
      answer:
        'Somewhat, yes. The formula assumes BMI correlates with fat mass. For very muscular individuals (bodybuilders, strength athletes), BMI overstates fat percentage and the formula under-predicts VO2 max. For highly trained endurance athletes, use an exercise-based test for better accuracy.',
    },
    {
      question: 'Is this the same as the NASA Physical Activity Status Scale?',
      answer:
        'NASA-PASS uses the same PAR-based approach with slightly different coefficients, validated on NASA employees. Our calculator uses the Jackson et al. 1990 version validated on the Cooper Institute ACLS cohort, which is the larger and more thoroughly replicated dataset.',
    },
  ],
};

export default article;
