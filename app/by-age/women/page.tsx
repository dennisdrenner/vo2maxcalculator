import type { Metadata } from 'next';
import Link from 'next/link';
import { NormsTable } from '@/components/NormsTable';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { AGE_BRACKETS, ACSM_NORMS, bracketLabel, bracketToDecadeSlug } from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Norms for Women by Age',
  description:
    'Complete VO2 max percentile table for women, ages 20–79. Compare your score against Cooper Institute norms used in ACSM Guidelines, 11th edition.',
  path: '/by-age/women/',
  keywords: ['vo2 max for women', 'female vo2 max by age', 'vo2 max norms women'],
});

export default function ByAgeWomenPage() {
  const women = AGE_BRACKETS.map((b) => ACSM_NORMS.find((n) => n.sex === 'female' && n.ageBracket === b)!);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'VO2 Max by Age', url: `${SITE_URL}/by-age/` },
          { name: 'Women', url: `${SITE_URL}/by-age/women/` },
        ]}
      />
      <ArticleSchema
        headline="VO2 Max Norms for Women by Age"
        description="Full percentile table for women, 20–79."
        url={`${SITE_URL}/by-age/women/`}
        datePublished="2026-04-13"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-by-age.jpg"
        label="Norms by Age"
        title="VO2 Max Norms for Women by Age"
        subtitle="Cooper Institute percentile tables for women, ages 20–79."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        This is the complete female VO2 max percentile table from The Cooper Institute, ages
        20–79. All values are in ml/kg/min, measured via treadmill maximal test with open-circuit
        spirometry. Compare your score to the column closest to your number.
      </p>

      <NormsTable sex="female" caption="Women, VO2 max percentiles (ml/kg/min)" />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Interpretation by decade</h2>
        <div className="mt-4 space-y-6">
          {women.map((row) => {
            const slug = bracketToDecadeSlug(row.ageBracket);
            return (
              <div key={row.ageBracket}>
                <h3 className="font-semibold text-slate-900">
                  Women in their {slug} ({bracketLabel(row.ageBracket)})
                </h3>
                <p className="mt-1 text-slate-700">
                  Average (50th) is <strong>{row.percentiles[50].toFixed(1)}</strong> ml/kg/min. Good (75th)
                  is {row.percentiles[75].toFixed(1)}. Excellent (90th) is {row.percentiles[90].toFixed(1)}.{' '}
                  <Link href={`/by-age/${slug}/`} className="text-teal-700 underline">
                    Full page for women in their {slug} →
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Training responses for women</h2>
        <p className="mt-3 text-slate-700">
          Despite lower absolute VO2 max values than men, women show equivalent or greater
          relative training adaptations — 15–25% improvements in previously untrained women are
          common after 12 weeks of structured aerobic work. Menstrual-cycle phase can influence
          submaximal testing (slightly higher heart rates in the luteal phase), so retesting at
          the same cycle point improves reproducibility.
        </p>
        <p className="mt-3 text-slate-700">
          Masters-age women (50+) who maintain consistent zone-2 and interval training often test
          above the 90th percentile for their bracket and above the 50th percentile for women
          20 years younger. See{' '}
          <Link href="/improve/" className="text-teal-700 underline">
            how to improve VO2 max
          </Link>{' '}
          for specific programming.
        </p>
      </section>

      <RelatedLinks pageType="by-age-hub" />
    </article>
      </>
  );
}
