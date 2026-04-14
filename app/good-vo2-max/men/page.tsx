import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { ACSM_NORMS, AGE_BRACKETS, bracketLabel, bracketToDecadeSlug } from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is a Good VO2 Max for Men?',
  description:
    'A good VO2 max for men is the 60th–79th percentile for your age. At 30: 45–49 ml/kg/min. At 50: 33–40. Full thresholds by decade with training targets.',
  path: '/good-vo2-max/men/',
  keywords: ['good vo2 max men', 'vo2 max for men', 'male vo2 max'],
});

export default function GoodVo2MenPage() {
  const men = AGE_BRACKETS.map((b) => ACSM_NORMS.find((n) => n.sex === 'male' && n.ageBracket === b)!);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'What is a good VO2 max?', url: `${SITE_URL}/good-vo2-max/` },
          { name: 'Men', url: `${SITE_URL}/good-vo2-max/men/` },
        ]}
      />
      <ArticleSchema
        headline="What is a good VO2 max for men?"
        description="Age-adjusted thresholds for a good VO2 max in men."
        url={`${SITE_URL}/good-vo2-max/men/`}
        datePublished="2026-04-13"
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        What Is a Good VO2 Max for Men?
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        For men, a "Good" VO2 max means being in the 60th–79th percentile for your age. In your
        20s that's roughly 51–55 ml/kg/min; by your 50s it drops to 35–40. Men typically test
        15–20% higher than women of the same age, so always use same-sex norms.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="mb-2 text-left text-sm font-semibold text-slate-700">
            Good VO2 max thresholds for men (ml/kg/min)
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
            {men.map((row) => {
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
          The "Good" column is the 60th-percentile breakpoint — values at or above it put you in
          the top 40% of men your age. "Excellent" marks the 80th percentile (top 20%), and
          "Superior" marks the 95th (top 5%). For most healthy men, moving from Average to Good
          is an achievable 12–24 week training goal; moving from Good to Excellent typically
          takes 1–2 years of consistent work.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why men's norms are higher</h2>
        <p className="mt-3 text-slate-700">
          Men's VO2 max values exceed women's by 15–20% at every age because of three structural
          differences: higher hemoglobin concentration (greater oxygen-carrying capacity),
          larger heart size relative to body weight (higher stroke volume), and greater lean
          mass percentage (more metabolically active tissue). These gaps are not trainable — so
          male and female VO2 max scores are never directly comparable.
        </p>
        <p className="mt-3 text-slate-700">
          See the{' '}
          <Link href="/good-vo2-max/women/" className="text-teal-700 underline">
            women's page
          </Link>{' '}
          for the parallel thresholds.
        </p>
      </section>

      <RelatedLinks pageType="good-vo2-hub" />
    </article>
  );
}
