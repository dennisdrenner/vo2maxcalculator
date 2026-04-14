import type { Metadata } from 'next';
import Link from 'next/link';
import { NormsTable } from '@/components/NormsTable';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { AGE_BRACKETS, ACSM_NORMS, bracketLabel, bracketToDecadeSlug } from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Norms for Men by Age',
  description:
    'Complete VO2 max percentile table for men, ages 20–79. Compare your score against Cooper Institute norms used in ACSM Guidelines, 11th edition.',
  path: '/by-age/men/',
  keywords: ['vo2 max for men', 'male vo2 max by age', 'vo2 max norms men'],
});

export default function ByAgeMenPage() {
  const men = AGE_BRACKETS.map((b) => ACSM_NORMS.find((n) => n.sex === 'male' && n.ageBracket === b)!);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'VO2 Max by Age', url: `${SITE_URL}/by-age/` },
          { name: 'Men', url: `${SITE_URL}/by-age/men/` },
        ]}
      />
      <ArticleSchema
        headline="VO2 Max Norms for Men by Age"
        description="Full percentile table for men, 20–79."
        url={`${SITE_URL}/by-age/men/`}
        datePublished="2026-04-13"
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        VO2 Max Norms for Men by Age
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        This is the complete male VO2 max percentile table from The Cooper Institute, ages 20–79.
        All values are in ml/kg/min, measured via treadmill maximal test with open-circuit
        spirometry. Compare your score to the column closest to your number.
      </p>

      <NormsTable sex="male" caption="Men, VO2 max percentiles (ml/kg/min)" />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Interpretation by decade</h2>
        <div className="mt-4 space-y-6">
          {men.map((row) => {
            const slug = bracketToDecadeSlug(row.ageBracket);
            return (
              <div key={row.ageBracket}>
                <h3 className="font-semibold text-slate-900">
                  Men in their {slug} ({bracketLabel(row.ageBracket)})
                </h3>
                <p className="mt-1 text-slate-700">
                  Average (50th) is <strong>{row.percentiles[50].toFixed(1)}</strong> ml/kg/min. Good (75th)
                  is {row.percentiles[75].toFixed(1)}. Excellent (90th) is {row.percentiles[90].toFixed(1)}.{' '}
                  <Link href={`/by-age/${slug}/`} className="text-teal-700 underline">
                    Full page for men in their {slug} →
                  </Link>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why male VO2 max is higher than female</h2>
        <p className="mt-3 text-slate-700">
          Across every age bracket, men test 15–20% higher than women on average. The gap reflects
          three physiological differences: higher hemoglobin concentration (13–18% more
          oxygen-carrying capacity per deciliter of blood), larger heart size relative to body
          weight, and higher lean-mass percentage. These are not trainable differences — they are
          structural.
        </p>
        <p className="mt-3 text-slate-700">
          The implication for interpretation: always compare your VO2 max to same-sex norms. The
          tables above are for men only; the{' '}
          <Link href="/by-age/women/" className="text-teal-700 underline">
            companion women's page
          </Link>{' '}
          has the parallel data.
        </p>
      </section>

      <RelatedLinks pageType="by-age-hub" />
    </article>
  );
}
