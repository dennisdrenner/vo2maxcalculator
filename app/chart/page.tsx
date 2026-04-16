import type { Metadata } from 'next';
import Link from 'next/link';
import { NormsTable } from '@/components/NormsTable';
import RelatedLinks from '@/components/RelatedLinks';
import { AdSlot } from '@/components/AdSlot';
import { AffiliateCard } from '@/components/AffiliateCard';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Chart by Age and Sex — Full Percentile Tables',
  description:
    'Complete VO2 max chart with percentile rankings for men and women, ages 20–79. Poor, Fair, Average, Good, Excellent, and Superior fitness categories. Data from the Cooper Institute (ACSM 11th ed.).',
  path: '/chart/',
  keywords: ['vo2 max chart', 'vo2 max by age', 'vo2 max percentile', 'vo2 max norms'],
});

const FAQS: FaqItem[] = [
  {
    question: 'Where do these VO2 max norms come from?',
    answer:
      "The percentile data is from The Cooper Institute's Aerobics Center Longitudinal Study, a multi-decade cohort of more than 80,000 adults who completed maximal treadmill tests with direct gas analysis. It is the same dataset reproduced in ACSM's Guidelines for Exercise Testing and Prescription, 11th edition, Table 4.7.",
  },
  {
    question: 'What VO2 max percentile is considered good?',
    answer:
      'In the ACSM framework, 60th–79th percentile is "Good," 80th–94th is "Excellent," and 95th+ is "Superior." Below the 20th percentile is classified as "Poor," 20th–39th as "Fair," and 40th–59th as "Average." These cutoffs apply within each age and sex bracket.',
  },
  {
    question: 'Why do VO2 max values decline with age?',
    answer:
      'VO2 max typically drops about 10% per decade after age 30 due to reductions in maximal heart rate, stroke volume, and lean muscle mass. Regular aerobic training reduces this decline to roughly 5% per decade.',
  },
  {
    question: 'Are these norms the same for athletes?',
    answer:
      'No. These are general-population norms. Elite endurance athletes routinely exceed the 95th percentile — male Tour de France cyclists typically test at 70–85 ml/kg/min, and elite female distance runners at 65–75 ml/kg/min.',
  },
];

export default function ChartPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'VO2 Max Chart', url: `${SITE_URL}/chart/` },
        ]}
      />
      <ArticleSchema
        headline="VO2 Max Chart by Age and Sex"
        description="Full percentile norms table for men and women, ages 20–79."
        url={`${SITE_URL}/chart/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-chart.jpg"
        label="Reference"
        title="VO2 Max Chart by Age and Sex"
        subtitle="Full percentile norms from the Cooper Institute — the same dataset used in ACSM Guidelines, 11th edition."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-lg text-slate-700">
        This is the full VO2 max percentile chart — the same reference table used by the American
        College of Sports Medicine, sourced from The Cooper Institute's Aerobics Center
        Longitudinal Study. Values are in ml/kg/min. Find your age row and compare your score to
        the 5th, 10th, 25th, 50th, 75th, 90th, and 95th percentile columns.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Don't know your VO2 max yet?{' '}
        <Link href="/" className="text-teal-700 underline">
          Calculate it in 2 minutes using one of 17 field tests
        </Link>
        , or{' '}
        <Link href="/percentile-calculator/" className="text-teal-700 underline">
          enter a known value to see your percentile
        </Link>
        .
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Men — VO2 max by age (ml/kg/min)</h2>
        <p className="mt-2 text-slate-700">
          Men typically test 15–20% higher than women of the same age due to differences in
          hemoglobin concentration, heart size relative to body weight, and lean mass percentage.
          The 50th-percentile (median) value for men peaks in the 20–29 bracket at 48.0 ml/kg/min
          and declines to 24.4 by the 70–79 bracket.
        </p>
        <NormsTable sex="male" caption="Men, VO2 max percentiles by age bracket" />
      </div>

      <AdSlot slot="chart-mid" className="my-10" />

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Women — VO2 max by age (ml/kg/min)</h2>
        <p className="mt-2 text-slate-700">
          For women, the 50th-percentile VO2 max peaks at 37.6 ml/kg/min in the 20–29 bracket and
          declines to 18.3 by 70–79. A female masters athlete in the 90th percentile for her age
          will typically match or exceed the 50th-percentile value of a woman 20 years younger.
        </p>
        <NormsTable sex="female" caption="Women, VO2 max percentiles by age bracket" />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Fitness categories</h2>
        <p className="mt-3 text-slate-700">
          ACSM groups percentile bands into six fitness categories. These apply within each
          age-and-sex bracket — a 50-year-old man with VO2 max 40 ml/kg/min sits above the 75th
          percentile for his age, so his category is "Good," even though the same number would be
          "Average" for a 25-year-old.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                  Category
                </th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                  Percentile range
                </th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                  Interpretation
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Poor</th>
                <td className="border border-slate-200 px-3 py-2">Below 20th</td>
                <td className="border border-slate-200 px-3 py-2">Elevated cardiovascular risk; meaningful gains possible with 8–12 weeks of training.</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Fair</th>
                <td className="border border-slate-200 px-3 py-2">20th–39th</td>
                <td className="border border-slate-200 px-3 py-2">Below-average fitness; structured aerobic training typically yields 10–15% gains.</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Average</th>
                <td className="border border-slate-200 px-3 py-2">40th–59th</td>
                <td className="border border-slate-200 px-3 py-2">Typical sedentary-to-lightly-active adult.</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Good</th>
                <td className="border border-slate-200 px-3 py-2">60th–79th</td>
                <td className="border border-slate-200 px-3 py-2">Regular exerciser; solid cardiorespiratory reserve.</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Excellent</th>
                <td className="border border-slate-200 px-3 py-2">80th–94th</td>
                <td className="border border-slate-200 px-3 py-2">Serious recreational athlete; strong longevity signal.</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Superior</th>
                <td className="border border-slate-200 px-3 py-2">95th and above</td>
                <td className="border border-slate-200 px-3 py-2">Competitive-athlete territory; top 5% of general population.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">How to read the chart</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
          <li>Find your age row in the men's or women's table.</li>
          <li>Locate the column whose number is closest to your VO2 max.</li>
          <li>
            Read the column header — that is your percentile. A 42 ml/kg/min VO2 max for a
            35-year-old man sits between the 50th and 75th columns (42.4 and 49.2), so his
            percentile is roughly 55th — "Average."
          </li>
          <li>
            For a precise percentile, use the{' '}
            <Link href="/percentile-calculator/" className="text-teal-700 underline">
              percentile calculator
            </Link>{' '}
            — it interpolates between the listed breakpoints.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Track your VO2 max over time</h2>
        <p className="mt-2 text-sm text-slate-600">
          The easiest way to retest every month is a running watch that computes VO2 max
          passively from your workouts. As an Amazon Associate we earn from qualifying purchases.
        </p>
        <div className="mt-4">
          <AffiliateCard product="garminFr265" />
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

      <RelatedLinks pageType="chart" />
      </article>
    </>
  );
}
