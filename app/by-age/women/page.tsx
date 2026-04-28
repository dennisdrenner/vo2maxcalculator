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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What is a good VO2 max for a woman?</h2>
        <p className="mt-3 text-slate-700">
          The Cooper Institute classifies women's VO2 max into the same six bands used for men —
          Poor, Below Average, Average, Good, Excellent, Superior — but with sex-specific cutoffs.
          Female norms are 15–20% lower than male norms at every age, reflecting structural
          differences in cardiac size, hemoglobin, and lean-mass percentage. The interpretation
          in plain English:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Poor</strong> (under the 20th percentile): below the threshold associated
            with normal cardiovascular reserve. Activities of daily living may feel effortful.
          </li>
          <li>
            <strong>Average</strong> (40th–60th percentile): typical for a moderately active
            adult woman. Capable of light recreational exercise.
          </li>
          <li>
            <strong>Good</strong> (60th–80th percentile): consistent with regular aerobic
            training. Recreational runners and cyclists with a few years of training usually
            land here.
          </li>
          <li>
            <strong>Excellent / Superior</strong> (80th percentile and above): the territory of
            competitive amateur athletes and trained masters women.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For a 35-year-old woman, the median (50th percentile) is about{' '}
          <strong>30 ml/kg/min</strong>; the boundary into "Excellent" is about{' '}
          <strong>36</strong>. For a 55-year-old woman, the median drops to about{' '}
          <strong>26</strong> and "Excellent" starts at about <strong>32</strong>. The full
          table below has the exact cutoffs for every decade.
        </p>
      </section>

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
        <h2 className="text-2xl font-bold text-slate-900">How VO2 max changes with age</h2>
        <p className="mt-3 text-slate-700">
          For untrained women, VO2 max declines roughly <strong>10% per decade</strong> after about
          age 30. The mechanism is the same as in men — reductions in maximum heart rate and
          stroke volume, plus gradual loss of capillary density. For trained women, the rate of
          decline is closer to <strong>5% per decade</strong>, and consistent endurance training
          can largely flatten the curve through the 50s.
        </p>
        <p className="mt-3 text-slate-700">
          The practical takeaway: a substantial chunk of what gets blamed on aging is actually
          detraining. Endurance-trained women in their 60s routinely score above the median for
          women in their 30s. The <Link href="/improve/" className="text-teal-700 underline">training guide</Link>{' '}
          covers what works to slow the decline.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">How to improve your score</h2>
        <p className="mt-3 text-slate-700">
          The same three levers that work for men work for women — and the relative response to
          training is often slightly larger:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Volume of easy aerobic work (zone 2).</strong> 2–3 sessions per week of
            45–60 minutes at a conversational pace. See{' '}
            <Link href="/improve/zone-2-training/" className="text-teal-700 underline">zone 2 training</Link>.
          </li>
          <li>
            <strong>One weekly high-intensity interval session.</strong> The Norwegian 4×4 has
            the best evidence-base across both sexes. See{' '}
            <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">the 4×4 details</Link>.
          </li>
          <li>
            <strong>Consistency over months.</strong> Untrained women typically gain 15–25% in
            8–12 weeks of structured training — a slightly larger relative response than men in
            most published studies.
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">How accurate is this table?</h2>
        <p className="mt-3 text-slate-700">
          The Cooper Institute norms are derived from the Aerobics Center Longitudinal Study,
          where participants completed maximal treadmill tests with measured oxygen uptake (the
          gold-standard methodology). The same dataset underlies the percentile tables in ACSM's
          Guidelines for Exercise Testing and Prescription, 11th edition.
        </p>
        <p className="mt-3 text-slate-700">
          Field-test estimates from the calculator on this site are estimates — typical
          correlation with lab-measured VO2 max is around r&nbsp;=&nbsp;0.85–0.90 for trained
          populations and somewhat lower for general adults. If your field-test number lands
          within 3–5 ml/kg/min of a lab measurement, that's the expected agreement, not a flaw.
        </p>
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
