import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { AGE_BRACKETS, ACSM_NORMS, bracketLabel, bracketToDecadeSlug } from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max by Age — Norms for Every Decade',
  description:
    'VO2 max norms organized by age decade: 20s, 30s, 40s, 50s, 60s, 70s. Compare your score to men and women in your bracket using Cooper Institute data.',
  path: '/by-age/',
  keywords: ['vo2 max by age', 'vo2 max norms', 'vo2 max for my age'],
});

export default function ByAgeHubPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'VO2 Max by Age', url: `${SITE_URL}/by-age/` },
        ]}
      />
      <ArticleSchema
        headline="VO2 Max by Age"
        description="Age-decade VO2 max norm tables for men and women."
        url={`${SITE_URL}/by-age/`}
        datePublished="2026-04-13"
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        VO2 Max by Age
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        VO2 max declines about 10% per decade after 30 in untrained adults, roughly 5% per decade
        in trained adults. To compare your score meaningfully, use age- and sex-adjusted norms.
        Pick your decade below for the full percentile breakdown, category thresholds, and
        training targets for your bracket.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {AGE_BRACKETS.map((bracket) => {
          const male = ACSM_NORMS.find((n) => n.sex === 'male' && n.ageBracket === bracket)!;
          const female = ACSM_NORMS.find((n) => n.sex === 'female' && n.ageBracket === bracket)!;
          const slug = bracketToDecadeSlug(bracket);
          return (
            <Link
              key={bracket}
              href={`/by-age/${slug}/`}
              className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-teal-500 hover:shadow-sm"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-slate-900">VO2 max in your {slug}</h2>
                <span className="text-sm text-slate-500">Ages {bracketLabel(bracket)}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Median for men: <strong>{male.percentiles[50].toFixed(1)}</strong> ml/kg/min.
                Median for women: <strong>{female.percentiles[50].toFixed(1)}</strong>.
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-teal-700">
                See full norms →
              </span>
            </Link>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Split by sex</h2>
        <p className="mt-3 text-slate-700">
          If you only want one side of the chart, these two pages list every age bracket on a
          single page:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <Link href="/by-age/men/" className="text-teal-700 underline">
              VO2 max norms for men by age
            </Link>
          </li>
          <li>
            <Link href="/by-age/women/" className="text-teal-700 underline">
              VO2 max norms for women by age
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Why age-adjusted norms matter</h2>
        <p className="mt-3 text-slate-700">
          Raw VO2 max numbers are misleading across age groups. A 40 ml/kg/min result sits at the
          ~55th percentile for a 35-year-old man (average) but at the ~80th percentile for a
          55-year-old (excellent). Without age adjustment, a 55-year-old who improves from 35 to
          40 might conclude they are still "below average" — when in fact they have moved from
          good to excellent for their age.
        </p>
        <p className="mt-3 text-slate-700">
          The same logic applies across sexes. A 30 ml/kg/min reading is "fair" for a 30-year-old
          man but "average" for a 30-year-old woman. The ACSM categories — Poor, Fair, Average,
          Good, Excellent, Superior — are always interpreted within a single age-and-sex bracket.
        </p>
      </section>

      <RelatedLinks pageType="by-age-hub" />
    </article>
  );
}
