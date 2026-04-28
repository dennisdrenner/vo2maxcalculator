import type { Metadata } from 'next';
import Link from 'next/link';
import { NormsTable } from '@/components/NormsTable';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
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
    <>
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

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-by-age.jpg"
        label="Norms by Age"
        title="VO2 Max Norms for Men by Age"
        subtitle="Cooper Institute percentile tables for men, ages 20–79."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        This is the complete male VO2 max percentile table from The Cooper Institute, ages 20–79.
        All values are in ml/kg/min, measured via treadmill maximal test with open-circuit
        spirometry. Compare your score to the column closest to your number.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What is a good VO2 max for a man?</h2>
        <p className="mt-3 text-slate-700">
          The Cooper Institute classifies men's VO2 max into six bands — Poor, Below Average,
          Average, Good, Excellent, and Superior — with the cutoff for each band varying by
          decade. The interpretation in plain English:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Poor</strong> (under the 20th percentile): below the threshold associated
            with normal cardiovascular reserve. Most adults in this band have noticeable
            shortness of breath on stairs.
          </li>
          <li>
            <strong>Average</strong> (40th–60th percentile): typical for a moderately active
            adult. Capable of light recreational exercise but limited at higher intensities.
          </li>
          <li>
            <strong>Good</strong> (60th–80th percentile): consistent with regular aerobic
            training. Recreational runners and cyclists with a few years of training usually
            land here.
          </li>
          <li>
            <strong>Excellent / Superior</strong> (80th percentile and above): the territory of
            competitive amateur athletes and trained masters. Sustained endurance work over
            years — not just gym time — is what gets you here.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          For a 35-year-old man, the median (50th percentile) is about <strong>42 ml/kg/min</strong>;
          the boundary into "Excellent" is about <strong>49</strong>. For a 55-year-old, the
          median drops to about <strong>34</strong> and "Excellent" starts at about{' '}
          <strong>40</strong>. The full table below has the exact cutoffs for every decade.
        </p>
      </section>

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
        <h2 className="text-2xl font-bold text-slate-900">How VO2 max changes with age</h2>
        <p className="mt-3 text-slate-700">
          For untrained men, VO2 max declines roughly <strong>10% per decade</strong> after about
          age 30, driven mostly by reductions in maximum heart rate and cardiac output. By the
          mid-60s, an untrained man's VO2 max is typically 30–40% below his peak. Trained men
          decline at roughly half that rate — about <strong>5% per decade</strong> — because
          consistent aerobic work preserves stroke volume and capillary density.
        </p>
        <p className="mt-3 text-slate-700">
          The practical takeaway: a substantial chunk of what gets blamed on aging is actually
          detraining. Endurance-trained men in their 60s routinely score above the median for men
          in their 30s. The <Link href="/improve/" className="text-teal-700 underline">training guide</Link>{' '}
          covers what works to slow the decline.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">How to improve your score</h2>
        <p className="mt-3 text-slate-700">
          Three levers are well-supported by the research. None are complicated:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Volume of easy aerobic work (zone 2).</strong> 2–3 sessions per week of
            45–60 minutes at a pace where you can hold a conversation. Builds the foundation
            everything else sits on. See <Link href="/improve/zone-2-training/" className="text-teal-700 underline">zone 2 training</Link>.
          </li>
          <li>
            <strong>One weekly high-intensity interval session.</strong> The Norwegian 4×4
            protocol — 4 minutes at 90–95% max HR, 3 minutes easy, repeated 4 times — has the
            best published evidence for raising VO2 max efficiently. See{' '}
            <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">the 4×4 details</Link>.
          </li>
          <li>
            <strong>Consistency over months.</strong> Measurable improvements show up in 4–6
            weeks; peak response lands at 8–12 weeks. Untrained men typically gain 15–20% in
            that window.
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
      </>
  );
}
