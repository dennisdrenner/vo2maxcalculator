import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is a Good VO2 Max?',
  description:
    'A good VO2 max depends on age and sex. For a 35-year-old man, 49 ml/kg/min is good (75th percentile). For a 35-year-old woman, 36 is good. Full context, thresholds, and interpretation.',
  path: '/good-vo2-max/',
  keywords: ['what is a good vo2 max', 'good vo2 max score', 'vo2 max categories'],
});

const FAQS: FaqItem[] = [
  {
    question: 'What is considered a good VO2 max?',
    answer:
      'In the ACSM framework, "Good" means the 60th–79th percentile for your age and sex. For a 35-year-old man, that\'s roughly 45–49 ml/kg/min. For a 35-year-old woman, 33–36 ml/kg/min.',
  },
  {
    question: 'Is 50 a good VO2 max?',
    answer:
      'For a man under 40, 50 ml/kg/min is "Good to Excellent" (roughly 75th–85th percentile). For a woman under 40, 50 is "Superior" (95th percentile or above). For a man over 60, 50 is well into "Superior" territory.',
  },
  {
    question: 'What is an elite VO2 max?',
    answer:
      'Elite endurance athletes typically test 65–85 ml/kg/min (men) and 55–75 ml/kg/min (women). Cross-country skier Bjørn Dæhlie tested above 96; elite road cyclists routinely test 75–85. These are 10–20 ml/kg/min above the general-population 95th percentile.',
  },
  {
    question: 'Is there a minimum VO2 max for health?',
    answer:
      'Research suggests mortality risk rises sharply below ~18 ml/kg/min in men and ~15 in women. The ACSM classifies below the 20th percentile as "Poor" — a category associated with 2–3× higher all-cause mortality risk compared to the 60th–79th percentile.',
  },
];

export default function GoodVo2HubPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'What is a good VO2 max?', url: `${SITE_URL}/good-vo2-max/` },
        ]}
      />
      <ArticleSchema
        headline="What is a good VO2 max?"
        description="Age- and sex-adjusted thresholds for a good VO2 max."
        url={`${SITE_URL}/good-vo2-max/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-good-vo2.jpg"
        label="Interpretation"
        title="What Is a Good VO2 Max?"
        subtitle='In the ACSM framework, the 60th–79th percentile is "Good" and the 80th–94th is "Excellent" — for your specific age and sex.'
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-lg text-slate-700">
        A "good" VO2 max depends entirely on your age and sex. In the ACSM framework used by
        exercise physiologists, <strong>the 60th–79th percentile is "Good"</strong> and the
        80th–94th is "Excellent." For a 35-year-old man, that means 45–49 ml/kg/min is good and
        49–57 is excellent. For a 35-year-old woman, 33–36 is good and 36–41 is excellent.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Know your number?{' '}
        <Link href="/percentile-calculator/" className="text-teal-700 underline">
          Enter it to see your exact percentile
        </Link>
        .
      </p>

      <img
        src="https://calculatorsites.b-cdn.net/vo2max/hero-longevity.jpg"
        alt="Runner cresting a hill at sunrise — higher VO2 max is linked to better longevity outcomes."
        width={800}
        height={450}
        loading="lazy"
        className="mt-8 w-full rounded-2xl"
      />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Drill down</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            href="/good-vo2-max/men/"
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
          >
            <h3 className="font-bold text-slate-900">By sex: men</h3>
            <p className="mt-1 text-sm text-slate-600">Good VO2 max for men at every age decade.</p>
          </Link>
          <Link
            href="/good-vo2-max/women/"
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
          >
            <h3 className="font-bold text-slate-900">By sex: women</h3>
            <p className="mt-1 text-sm text-slate-600">Good VO2 max for women at every age decade.</p>
          </Link>
          <Link
            href="/good-vo2-max/by-age/"
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
          >
            <h3 className="font-bold text-slate-900">By age</h3>
            <p className="mt-1 text-sm text-slate-600">Good-VO2-max thresholds by decade, both sexes.</p>
          </Link>
          <Link
            href="/chart/"
            className="block rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
          >
            <h3 className="font-bold text-slate-900">Full percentile chart</h3>
            <p className="mt-1 text-sm text-slate-600">Every value from 5th to 95th, every age bracket.</p>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">The six ACSM categories</h2>
        <p className="mt-3 text-slate-700">
          ACSM's Guidelines for Exercise Testing and Prescription, 11th edition, uses six
          categories based on percentile rank within age and sex. They are:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li><strong>Poor:</strong> below 20th percentile.</li>
          <li><strong>Fair:</strong> 20th–39th percentile.</li>
          <li><strong>Average:</strong> 40th–59th percentile.</li>
          <li><strong>Good:</strong> 60th–79th percentile.</li>
          <li><strong>Excellent:</strong> 80th–94th percentile.</li>
          <li><strong>Superior:</strong> 95th percentile and above.</li>
        </ul>
        <p className="mt-3 text-slate-700">
          "Good" is the practical target for most people: it is achievable in 12–24 weeks of
          structured training from Average, and it is associated with meaningfully lower
          all-cause mortality in long-term cohort studies.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Looking up specific values</h2>
        <p className="mt-3 text-slate-700">
          Want to know if a specific number is good? We have dedicated pages for every integer
          VO2 max from 25 to 70. Examples:
        </p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2 md:grid-cols-3">
          {[30, 35, 40, 45, 50, 55, 60].map((v) => (
            <li key={v}>
              <Link href={`/good-vo2-max/${v}/`} className="text-teal-700 hover:underline">
                Is {v} a good VO2 max?
              </Link>
            </li>
          ))}
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

      <RelatedLinks pageType="good-vo2-hub" />
      </article>
    </>
  );
}
