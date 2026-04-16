import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { ACSM_NORMS, AGE_BRACKETS, bracketLabel, bracketToDecadeSlug } from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is a Good VO2 Max for Women?',
  description:
    'A good VO2 max for women is the 60th–79th percentile for your age. At 30: 33–36 ml/kg/min. At 50: 21–28. Full thresholds by decade with training targets.',
  path: '/good-vo2-max/women/',
  keywords: ['good vo2 max women', 'vo2 max for women', 'female vo2 max'],
});

export default function GoodVo2WomenPage() {
  const women = AGE_BRACKETS.map((b) => ACSM_NORMS.find((n) => n.sex === 'female' && n.ageBracket === b)!);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'What is a good VO2 max?', url: `${SITE_URL}/good-vo2-max/` },
          { name: 'Women', url: `${SITE_URL}/good-vo2-max/women/` },
        ]}
      />
      <ArticleSchema
        headline="What is a good VO2 max for women?"
        description="Age-adjusted thresholds for a good VO2 max in women."
        url={`${SITE_URL}/good-vo2-max/women/`}
        datePublished="2026-04-13"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-good-vo2.jpg"
        label="Interpretation"
        title="What Is a Good VO2 Max for Women?"
        subtitle="Age-adjusted thresholds for Good, Excellent, and Superior VO2 max scores in women."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        For women, a "Good" VO2 max means being in the 60th–79th percentile for your age. In your
        20s that's roughly 40–45 ml/kg/min; by your 50s it drops to 21–28. Always compare your
        score to female norms — male values are 15–20% higher across every bracket.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="mb-2 text-left text-sm font-semibold text-slate-700">
            Good VO2 max thresholds for women (ml/kg/min)
          </caption>
          <thead>
            <tr>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">
                Age
              </th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                Average (50th)
              </th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                Good (60th+)
              </th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                Excellent (80th+)
              </th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                Superior (95th+)
              </th>
            </tr>
          </thead>
          <tbody>
            {women.map((row) => {
              const p60 = row.percentiles[50] + 0.4 * (row.percentiles[75] - row.percentiles[50]);
              const p80 = row.percentiles[75] + (1 / 3) * (row.percentiles[90] - row.percentiles[75]);
              return (
                <tr key={row.ageBracket}>
                  <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">
                    <Link href={`/by-age/${bracketToDecadeSlug(row.ageBracket)}/`} className="text-teal-700 hover:underline">
                      {bracketLabel(row.ageBracket)}
                    </Link>
                  </th>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{row.percentiles[50].toFixed(1)}</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{p60.toFixed(1)}</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{p80.toFixed(1)}</td>
                  <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{row.percentiles[95].toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-500">Source: The Cooper Institute.</p>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Reading the table</h2>
        <p className="mt-3 text-slate-700">
          The "Good" column is the 60th-percentile threshold — hit it and you're in the top 40% of
          women your age. "Excellent" marks the 80th (top 20%), "Superior" the 95th (top 5%).
          Women typically see 15–25% VO2 max improvements in the first 12 weeks of structured
          training — larger relative gains than men in many cohort studies.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Training context for women</h2>
        <p className="mt-3 text-slate-700">
          Menstrual-cycle phase can influence submaximal test outcomes (heart rate runs slightly
          higher in the luteal phase). For repeat-test reliability, retest at the same cycle
          point. Postmenopausal women still respond strongly to VO2 max training — a 2021 meta-
          analysis in the European Journal of Preventive Cardiology found 12% average gains after
          12 weeks of combined zone-2 + HIIT programming in women aged 50–70.
        </p>
        <p className="mt-3 text-slate-700">
          See the{' '}
          <Link href="/good-vo2-max/men/" className="text-teal-700 underline">
            men's page
          </Link>{' '}
          for parallel thresholds.
        </p>
      </section>

      <RelatedLinks pageType="good-vo2-hub" />
    </article>
      </>
  );
}
