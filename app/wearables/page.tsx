import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { AdSlot } from '@/components/AdSlot';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Wearable VO2 Max Accuracy — Garmin, Apple Watch, Whoop Reviewed',
  description:
    'How accurate are wearable VO2 max estimates? We compare Garmin (FirstBeat), Apple Watch, and Whoop against lab-measured VO2 max across published validation studies.',
  path: '/wearables/',
  keywords: ['wearable vo2 max', 'garmin vo2 max', 'apple watch vo2 max', 'whoop vo2 max'],
});

const FAQS: FaqItem[] = [
  {
    question: 'How accurate are wearable VO2 max estimates?',
    answer:
      'In validation studies, mean absolute error is typically 3–6 ml/kg/min for Garmin/FirstBeat devices, 4–8 ml/kg/min for Apple Watch, and 5–8 ml/kg/min for Whoop. That means your wearable reading can be off by 5–15% from a lab-measured value — useful for trends, less useful for absolute values.',
  },
  {
    question: 'Can I use a wearable reading as my VO2 max?',
    answer:
      'As a rough estimate, yes. For comparing against percentile charts or tracking training effect over months, wearable VO2 max is reasonable — especially if you test repeatedly and look at the trend. For a single precise measurement, a validated field test (Cooper run, Rockport walk) will be closer to truth.',
  },
  {
    question: 'Why do wearable VO2 max readings drift?',
    answer:
      'Wearables estimate VO2 max from heart-rate response to pace (running) or power (cycling). The algorithms re-train as you collect more data, and they can shift with changes in running form, HR monitor accuracy, or weather. Avoid taking day-to-day fluctuations seriously; focus on month-over-month trends.',
  },
  {
    question: 'Which wearable is most accurate?',
    answer:
      'In published head-to-head studies, Garmin devices using the FirstBeat algorithm have generally shown the lowest error vs. laboratory treadmill tests, particularly when a chest-strap HR monitor is paired. Apple Watch is a close second. Whoop tends to slightly under-predict in trained athletes.',
  },
];

export default function WearablesHubPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Wearables', url: `${SITE_URL}/wearables/` },
        ]}
      />
      <ArticleSchema
        headline="Wearable VO2 Max Accuracy"
        description="Reviews of Garmin, Apple Watch, and Whoop VO2 max estimates."
        url={`${SITE_URL}/wearables/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Wearable VO2 Max Accuracy
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Most modern fitness wearables estimate VO2 max from heart-rate response to running pace
        or cycling power. Accuracy varies by device and platform, typically within 3–8 ml/kg/min
        of laboratory treadmill values. Wearable VO2 max is most useful for tracking trends over
        weeks and months; single readings should be interpreted with a ±5 ml/kg/min margin of
        uncertainty.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <WearableCard
          href="/wearables/garmin-vo2-max-accuracy/"
          title="Garmin VO2 max accuracy"
          hook="Garmin watches use the FirstBeat algorithm. In published studies, mean error vs. lab is ~3–5 ml/kg/min with a chest strap, higher with wrist HR alone."
        />
        <WearableCard
          href="/wearables/apple-watch-vo2-max/"
          title="Apple Watch VO2 max"
          hook="Apple's Cardio Fitness metric uses HR + GPS data from outdoor walks and runs. Accuracy is roughly comparable to Garmin for casual users; slightly worse for highly trained athletes."
        />
        <WearableCard
          href="/wearables/whoop-vo2-max/"
          title="Whoop VO2 max"
          hook="Whoop estimates VO2 max from workout data and resting HR. Validation is thinner than Garmin; mean error is typically 5–8 ml/kg/min."
        />
      </div>

      <AdSlot slot="wearable-hub" className="my-10" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Where wearables get VO2 max from</h2>
        <p className="mt-3 text-slate-700">
          All major wearables use a version of the same underlying model: estimate the
          heart-rate-vs-oxygen-demand line from a submaximal workout (running, walking, or
          cycling at a known pace or power), extrapolate to HRmax, and read off predicted VO2
          max at that HRmax. This is conceptually identical to the{' '}
          <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
            Åstrand-Rhyming test
          </Link>{' '}
          or the{' '}
          <Link href="/methods/ymca-cycle-ergometer/" className="text-teal-700 underline">
            YMCA multistage cycle test
          </Link>
          .
        </p>
        <p className="mt-3 text-slate-700">
          Individual platforms add refinements: FirstBeat incorporates running-economy estimates,
          Apple uses GPS-derived pace and grade, Whoop weighs recent workouts heavily.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">How to get the most accurate wearable reading</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Use a chest-strap HR monitor</strong> for your VO2-max-calibrating workouts.
            Wrist optical HR can err 5–15 bpm at intensity, and HR error translates directly into
            VO2 max error.
          </li>
          <li>
            <strong>Do regular outdoor runs.</strong> Most platforms need pace + HR from outdoor
            runs (not treadmill) to calibrate. Do at least one 30+ min outdoor run per week.
          </li>
          <li>
            <strong>Cover a range of intensities.</strong> One easy, one moderate, one hard
            workout per week gives the algorithm data points across your HR-VO2 slope.
          </li>
          <li>
            <strong>Ignore day-to-day fluctuations.</strong> Look at rolling 30-day trends, not
            single readings.
          </li>
          <li>
            <strong>Cross-check with a field test.</strong> Every 2–3 months, run a{' '}
            <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
              Cooper test
            </Link>{' '}
            and compare. If the gap is &gt;5 ml/kg/min, something is off (most commonly HRmax
            assumption).
          </li>
        </ul>
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

function WearableCard({ href, title, hook }: { href: string; title: string; hook: string }) {
  return (
    <Link href={href} className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-500">
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{hook}</p>
      <span className="mt-3 inline-block text-sm font-semibold text-teal-700">Read →</span>
    </Link>
  );
}
