import type { Metadata } from 'next';
import Link from 'next/link';
import { PercentileTool } from '@/components/PercentileTool';
import RelatedLinks from '@/components/RelatedLinks';
import { AffiliateCard } from '@/components/AffiliateCard';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Percentile Calculator — How You Rank by Age and Sex',
  description:
    'Enter your VO2 max, age, and sex to see exactly where you rank. Percentile computed from Cooper Institute norms used in ACSM Guidelines, 11th edition.',
  path: '/percentile-calculator/',
  keywords: ['vo2 max percentile', 'vo2 max rank', 'vo2 max score'],
});

const FAQS: FaqItem[] = [
  {
    question: 'How is the percentile calculated?',
    answer:
      'The tool compares your VO2 max to the age- and sex-matched Cooper Institute percentile breakpoints (5th, 10th, 25th, 50th, 75th, 90th, 95th) and linearly interpolates between them. A value below the 5th breakpoint returns <5; above the 95th returns up to 99.',
  },
  {
    question: 'What VO2 max is above average for my age?',
    answer:
      'Any value at or above the 50th-percentile column for your age/sex bracket is at least average; 60th and above is "Good" in ACSM categories. See the full chart at /chart/ for every bracket.',
  },
  {
    question: "Does this work if I don't know my exact VO2 max?",
    answer:
      'If you only have a wearable estimate, use that value — but note wearable VO2 max can vary ±5 ml/kg/min from lab tests. For a more accurate number, take any of the 17 validated field tests on the homepage.',
  },
];

export default function PercentileCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Percentile Calculator', url: `${SITE_URL}/percentile-calculator/` },
        ]}
      />
      <ArticleSchema
        headline="VO2 Max Percentile Calculator"
        description="Enter a VO2 max to see its percentile rank by age and sex."
        url={`${SITE_URL}/percentile-calculator/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-percentile.jpg"
        label="Tool"
        title="VO2 Max Percentile Calculator"
        subtitle="Enter your VO2 max, age, and sex to get your exact percentile rank and ACSM fitness category."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-lg text-slate-700">
        The tool returns your exact percentile rank and ACSM fitness category, interpolated from
        the Cooper Institute percentile breakpoints.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Don't know your VO2 max yet?{' '}
        <Link href="/" className="text-teal-700 underline">
          Use the main calculator to estimate it from a field test
        </Link>
        .
      </p>

      <div className="mt-8">
        <PercentileTool />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">How the percentile is computed</h2>
        <p className="mt-3 text-slate-700">
          The Cooper Institute norms give seven reference points per age-and-sex bracket: the 5th,
          10th, 25th, 50th, 75th, 90th, and 95th percentiles. To find your percentile, the tool:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
          <li>Selects your age bracket (20–29, 30–39, 40–49, 50–59, 60–69, 70–79).</li>
          <li>Selects your sex (male or female).</li>
          <li>
            Finds the two breakpoint percentiles your VO2 max falls between, then linearly
            interpolates.
          </li>
          <li>Returns a percentile from &lt;5 to 99 and the corresponding fitness category.</li>
        </ol>
        <p className="mt-3 text-slate-700">
          Linear interpolation between percentile breakpoints is the standard approach used in
          population-health statistics. Within a narrow band of ±5 ml/kg/min it is accurate to
          within 2–3 percentile points compared to the full underlying distribution.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">For a more precise VO2 max</h2>
        <p className="mt-2 text-sm text-slate-600">
          A chest strap tightens the HR-dependent tests (Rockport, Åstrand, YMCA cycle) by
          2–3 ml/kg/min vs. wrist optical. As an Amazon Associate we earn from qualifying
          purchases.
        </p>
        <div className="mt-4">
          <AffiliateCard product="polarH10" />
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

      <RelatedLinks pageType="percentile" />
      </article>
    </>
  );
}
