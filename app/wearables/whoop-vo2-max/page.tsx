import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Whoop VO2 Max — Accuracy, Calibration, and Limits',
  description:
    'Whoop estimates VO2 max from workout HR patterns and resting heart rate trends. Accuracy: 5–8 ml/kg/min vs. lab. What Whoop does well, and where it falls short.',
  path: '/wearables/whoop-vo2-max/',
  keywords: ['whoop vo2 max', 'whoop strap accuracy', 'whoop cardio fitness'],
});

const FAQS: FaqItem[] = [
  {
    question: 'Does Whoop measure VO2 max?',
    answer:
      'Yes — Whoop 4.0 and later estimate VO2 max from a combination of activity data (HR response to effort), resting heart rate trends, and demographic inputs. The value appears in the app as "Aerobic Fitness."',
  },
  {
    question: 'How accurate is Whoop VO2 max?',
    answer:
      "Limited published validation, but field comparisons suggest mean absolute error of 5–8 ml/kg/min vs. laboratory treadmill VO2 max — less accurate than Garmin with a chest strap, roughly comparable to Garmin or Apple Watch with wrist-only HR.",
  },
  {
    question: 'Why does my Whoop VO2 max seem low?',
    answer:
      'Whoop tends to under-predict in trained athletes, especially runners with VO2 max >55. The algorithm weighs resting HR heavily; athletes with high HRrest (sometimes due to stress or caffeine rather than low fitness) get under-estimated.',
  },
  {
    question: "Does Whoop need a calibration workout?",
    answer:
      'Whoop improves as you log more workouts. The algorithm updates your VO2 max estimate based on recurring HR-vs-effort patterns. Expect 2–4 weeks of daily wear + regular workouts before the estimate stabilizes.',
  },
];

export default function WhoopPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Wearables', url: `${SITE_URL}/wearables/` },
          { name: 'Whoop', url: `${SITE_URL}/wearables/whoop-vo2-max/` },
        ]}
      />
      <ArticleSchema
        headline="Whoop VO2 Max"
        description="How Whoop estimates VO2 max and how accurate it is."
        url={`${SITE_URL}/wearables/whoop-vo2-max/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Whoop VO2 Max
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Whoop's <strong>Aerobic Fitness</strong> metric estimates VO2 max from a combination of
        workout heart-rate patterns, resting heart rate trends, and demographic inputs. In
        limited field validations, Whoop's estimates show a mean absolute error of{' '}
        <strong>5–8 ml/kg/min</strong> vs. laboratory VO2 max — slightly wider than Garmin or
        Apple Watch in head-to-head comparisons, with a systematic tendency to under-predict in
        highly trained athletes.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">How Whoop calculates VO2 max</h2>
        <p className="mt-3 text-slate-700">
          Whoop has not published a full algorithm specification, but publicly available
          information and reverse-engineered observations indicate the estimate relies on:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Resting heart rate.</strong> Lower HRrest correlates with higher fitness.
            Whoop computes a precise rolling HRrest from overnight data — this is one of the
            metric's strengths.
          </li>
          <li>
            <strong>Heart-rate variability (HRV).</strong> Higher HRV generally correlates with
            better parasympathetic tone and aerobic fitness.
          </li>
          <li>
            <strong>Workout HR response.</strong> The rate at which HR rises during exercise and
            recovers after exercise provides information about cardiac efficiency.
          </li>
          <li>
            <strong>Demographics and body composition.</strong> Age, sex, weight, and
            self-reported activity level anchor the prior estimate.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          Unlike Garmin (FirstBeat) or Apple, Whoop does not require GPS-based pace data —
          strength workouts, HIIT, and indoor cardio all contribute. This is convenient but
          reduces accuracy vs. systems that can extract explicit HR-pace relationships.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What Whoop does well</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Resting HR precision.</strong> Whoop's overnight HR sensing gives a cleaner
            resting HR than watches, which rely on wake-time or sedentary snapshots. HRrest is a
            strong VO2 max signal at the group level.
          </li>
          <li>
            <strong>Continuous monitoring.</strong> Whoop is worn 24/7; the metric benefits from
            much more data than a watch worn only during workouts.
          </li>
          <li>
            <strong>Training-stress integration.</strong> Whoop's "strain" and "recovery"
            metrics provide context that helps interpret VO2 max changes — e.g., a drop during a
            heavy training block probably reflects fatigue, not lost fitness.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Where Whoop falls short</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Under-predicts trained runners.</strong> Users with lab-measured VO2 max
            above 55–60 ml/kg/min often see Whoop values 5–8 points lower. The algorithm weighs
            HRrest heavily; trained athletes with elevated HRrest (from caffeine, stress, or
            incomplete recovery) get penalized.
          </li>
          <li>
            <strong>No explicit HR-pace model.</strong> Without GPS-anchored pace data, Whoop
            can't cleanly separate fitness from absolute workload. Running 10 km/h at HR 150 is a
            very different signal than running 15 km/h at HR 150, and Whoop has less visibility
            into which one happened.
          </li>
          <li>
            <strong>Slower to update.</strong> Because the algorithm blends 30+ days of rolling
            data, recent fitness changes (e.g., post-illness bounce-back) show up with a 2–4 week
            lag.
          </li>
          <li>
            <strong>Wrist/forearm optical HR.</strong> Like any wrist-based sensor, accuracy
            degrades at high intensities and in cold conditions.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Practical recommendations</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
          <li>Wear the strap at least 22 hours a day for stable resting-HR and HRV data.</li>
          <li>Record both easy and hard workouts — the algorithm needs intensity variation.</li>
          <li>Enter accurate demographics (age, sex, weight).</li>
          <li>Give the system 4+ weeks before treating the estimate as stable.</li>
          <li>
            If you're a trained runner or cyclist, treat Whoop's estimate as a lower bound and
            cross-check with a field test. See{' '}
            <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
              Cooper run
            </Link>{' '}
            or{' '}
            <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
              1.5-mile run
            </Link>
            .
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Whoop vs. Garmin vs. Apple for VO2 max</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Platform</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Mean error vs. lab</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Best use case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Garmin + chest strap</th>
                <td className="border border-slate-200 px-3 py-2">3–5 ml/kg/min</td>
                <td className="border border-slate-200 px-3 py-2">Runners/cyclists who want the tightest wearable estimate</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Garmin / Apple wrist HR</th>
                <td className="border border-slate-200 px-3 py-2">5–7 ml/kg/min</td>
                <td className="border border-slate-200 px-3 py-2">Recreational athletes who want trend data</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Whoop</th>
                <td className="border border-slate-200 px-3 py-2">5–8 ml/kg/min</td>
                <td className="border border-slate-200 px-3 py-2">Multi-modal training, sleep/recovery focus, long-term trend</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-slate-900">{f.question}</dt>
              <dd className="mt-2 text-slate-700">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedLinks pageType="wearable" />
    </article>
  );
}
