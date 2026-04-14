import Link from 'next/link';
import { AffiliateCard } from '@/components/AffiliateCard';
import type { MethodArticle } from './types';

const article: MethodArticle = {
  metaDescription:
    'The George 1-mile run test estimates VO2 max from finishing time, heart rate, sex, and weight. Designed for college-age adults. Formula, protocol, and accuracy.',

  lead: (
    <>
      <p className="text-lg text-slate-700">
        The <strong>1-mile run test</strong> (also called the George test) estimates VO2 max from
        your finishing time, heart rate at the finish, sex, and body weight. The formula, from
        George et al.'s 1993 paper in <em>Medicine & Science in Sports & Exercise</em>, is:
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-sm text-slate-800">
        VO2 max = 100.5 + 8.344·sex − 0.1636·weightKg − 1.438·time − 0.1928·HR
      </div>
      <p className="mt-3 text-slate-700">
        where sex is 1 for male and 0 for female, weight is in kilograms, time is in decimal
        minutes, and HR is the heart rate at the finish in bpm. Unlike the Cooper or 1.5-mile
        tests, this one is <em>submaximal</em> — you run at about 9/10 effort rather than
        all-out, and the HR term captures how much fitness buffer you have left.
      </p>
    </>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why the 1-mile test is submaximal</h2>
        <p className="mt-3 text-slate-700">
          George's innovation was recognizing that a maximal all-out mile is hard on testers
          (especially first-time ones) and produces variable results because pacing skill
          dominates. By instructing subjects to run at a <em>steady, fast but sustainable</em>{' '}
          pace and then reading off their HR at the finish, the test extracts two pieces of
          information: how fast you ran (work rate) and how hard you had to work to run that
          fast (HR response). The combination gives a sharper VO2 max estimate than either alone.
        </p>
        <p className="mt-3 text-slate-700">
          In validation, George et al. found that subjects instructed to "run at a comfortably
          fast pace" produced finishing HRs in the 170–190 range — intense but not max. The
          formula is calibrated for this submaximal zone.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Protocol</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Measure exactly one mile.</strong> A 400-meter track × 4 laps is 1,600 m
            (1.0 mi within 0.6%).
          </li>
          <li>
            <strong>Wear a chest-strap HR monitor.</strong> Wrist optical HR is not accurate
            enough at this intensity — a 10 bpm error shifts VO2 max by ~2 ml/kg/min.
          </li>
          <li>
            <strong>Warm up for 10 minutes</strong> with easy running and a few strides.
          </li>
          <li>
            <strong>Run the mile at a "comfortably fast" pace</strong> — fast enough to elevate
            HR into the 170s by the final lap, but not an all-out sprint. Typical finishing
            times: 6:30–9:00 for fit runners, 9:00–12:00 for recreational exercisers.
          </li>
          <li>
            <strong>Record your time and HR at the moment you finish.</strong> HR drops ~30 bpm
            in the first minute of recovery; delayed readings under-predict VO2 max.
          </li>
          <li>
            <strong>Enter time, HR, sex, and weight</strong> in the calculator.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy and validation</h2>
        <p className="mt-3 text-slate-700">
          George et al. validated the formula on 124 college-age men and women (mean age 23 ± 6).
          Results:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>Correlation with directly measured VO2 max: <strong>r = 0.84</strong></li>
          <li>Standard error of estimate: <strong>3.0 ml/kg/min</strong></li>
          <li>Mean absolute error: ~2.3 ml/kg/min</li>
        </ul>
        <p className="mt-3 text-slate-700">
          Accuracy is best in the 18–29 age range. Between 30 and 45 the test still performs
          well but SEE rises to ~4 ml/kg/min. Above 45 or below 18, the age coefficient
          assumptions don't hold and the test under- or over-predicts systematically.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Worked example</h2>
        <p className="mt-3 text-slate-700">
          A 22-year-old woman weighing 60 kg (132 lb) runs 1 mile in 8:45 (8.75 min) and
          finishes with HR 178 bpm. Her VO2 max estimate:
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 font-mono text-xs leading-relaxed text-slate-800">
          VO2 max = 100.5 + 8.344·0 − 0.1636·60 − 1.438·8.75 − 0.1928·178
          <br />
          = 100.5 + 0 − 9.816 − 12.583 − 34.318
          <br />= <strong>43.78 ml/kg/min</strong>
        </div>
        <p className="mt-3 text-slate-700">
          The 50th-percentile value for a 20–29 woman is 37.6 ml/kg/min, so 44 puts her around
          the 75th percentile — "Good" in ACSM categories.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">1-mile run vs. Cooper and 1.5-mile</h2>
        <p className="mt-3 text-slate-700">
          For most recreational testers, the{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          or{' '}
          <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
            1.5-mile run
          </Link>{' '}
          are easier to execute: no HR monitor required, no weight entered, just distance or
          time. The 1-mile George test's advantage is that it's <em>submaximal</em> — suitable
          for testers who can't safely hit all-out effort but can sustain a fast-but-controlled
          pace.
        </p>
        <p className="mt-3 text-slate-700">
          The 1-mile George test is also the preferred protocol in many college PE and ROTC
          fitness assessments, where testing large groups quickly (no "until exhaustion"
          component) is useful.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When to use a different test</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>You're over 45.</strong> The age range in George's validation was 18–29.
            Use the{' '}
            <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
              Cooper test
            </Link>{' '}
            or{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport walk
            </Link>
            .
          </li>
          <li>
            <strong>You don't have a chest-strap HR monitor.</strong> Wrist HR is too noisy for
            this formula. Use a no-HR test instead.
          </li>
          <li>
            <strong>You can't run for ~8 minutes at a fast pace.</strong> Use the{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport 1-mile walk
            </Link>
            .
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Gear for this test</h2>
        <p className="mt-2 text-sm text-slate-600">
          The formula depends on accurate finishing HR — a chest strap is strongly preferred
          over wrist optical. As an Amazon Associate we earn from qualifying purchases.
        </p>
        <div className="mt-4">
          <AffiliateCard product="polarH10" />
        </div>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the George 1-mile run test formula?',
      answer:
        'VO2 max = 100.5 + 8.344·sex − 0.1636·weightKg − 1.438·time(min) − 0.1928·HR(bpm). Sex = 1 for male, 0 for female. George JD et al., Medicine & Science in Sports & Exercise, 1993;25(3):401-406.',
    },
    {
      question: 'Do I need to run the mile all-out?',
      answer:
        'No — the George test is submaximal. Run at a "comfortably fast" pace that elevates your HR into the 170s by the final lap. All-out sprinting invalidates the formula\'s calibration.',
    },
    {
      question: 'How accurate is the 1-mile run test?',
      answer:
        'In the original validation (124 college-age adults), correlation with directly measured VO2 max was r = 0.84 with a standard error of estimate of 3.0 ml/kg/min — highly accurate for the 18–29 age range.',
    },
    {
      question: 'Can I use wrist HR for the 1-mile test?',
      answer:
        'Not recommended. Wrist optical HR can err by 5–15 bpm during running, and the formula\'s HR coefficient is −0.19 per bpm — a 10 bpm error shifts the VO2 max estimate by ~2 ml/kg/min.',
    },
    {
      question: 'Is this test safe for older adults?',
      answer:
        'The formula was validated on college-age (18–29) subjects. It is not recommended for adults over 45 — use the Cooper run, Rockport walk, or Åstrand cycle test instead for more age-appropriate accuracy.',
    },
  ],
};

export default article;
