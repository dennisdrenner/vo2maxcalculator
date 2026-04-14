import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Methodology — Sources, Formulas, and Norm Data',
  description:
    'How this site computes VO2 max and percentile ranks. Sources, formula implementations, interpolation methods, and known limitations.',
  path: '/methodology/',
  keywords: ['vo2 max methodology', 'cooper institute norms', 'acsm percentiles'],
});

export default function MethodologyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Methodology', url: `${SITE_URL}/methodology/` },
        ]}
      />
      <ArticleSchema
        headline="Methodology"
        description="How this site computes VO2 max and percentile ranks."
        url={`${SITE_URL}/methodology/`}
        datePublished="2026-04-13"
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Methodology
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        This page documents exactly how every number on this site is computed, from the raw
        input in the calculator to the final percentile rank and fitness category. We prioritize
        reproducibility: if you follow the formulas and data below, you should get the same
        result as the on-site calculator.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">VO2 max estimation formulas</h2>
        <p className="mt-3 text-slate-700">
          Each of the 17 field tests has its own regression formula from a peer-reviewed
          source. The full list, with variable definitions and citations, is on the{' '}
          <Link href="/formula/" className="text-teal-700 underline">
            formula reference page
          </Link>
          . Formulas are implemented as pure functions in{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">lib/formulas.ts</code> and
          covered by unit tests.
        </p>
        <p className="mt-3 text-slate-700">
          Where the source paper gave the formula in mixed units (e.g., weight in kg, HR in bpm,
          time in minutes), we reproduce the formula exactly as published. Unit conversion
          happens in the UI layer before the formula is called, so users can enter imperial or
          metric inputs equivalently.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Percentile norm data</h2>
        <p className="mt-3 text-slate-700">
          Percentile norms come from <strong>The Cooper Institute</strong>, a nonprofit research
          organization in Dallas, Texas founded by Dr. Kenneth H. Cooper in 1970. The Cooper
          Institute's <strong>Aerobics Center Longitudinal Study (ACLS)</strong> has collected
          standardized maximal treadmill VO2 max data (with open-circuit spirometry) on more
          than 80,000 adults since the late 1970s.
        </p>
        <p className="mt-3 text-slate-700">
          The specific norms we use — VO2 max values at the 5th, 10th, 25th, 50th, 75th, 90th,
          and 95th percentiles, for men and women across six age decades (20–29 through 70–79)
          — are the published ACLS percentile tables reproduced in:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>
            American College of Sports Medicine. <em>ACSM's Guidelines for Exercise Testing and
            Prescription</em>, 11th edition (2021). Table 4.7.
          </li>
          <li>
            The Cooper Institute, <em>Physical Fitness Specialist Certification</em> reference
            materials, 2019 edition.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          The same percentile tables have been used in clinical exercise physiology and sports
          medicine curricula for decades. They are the de facto North American standard.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Percentile interpolation</h2>
        <p className="mt-3 text-slate-700">
          The Cooper Institute publishes seven percentile breakpoints per age-and-sex bracket
          (5th, 10th, 25th, 50th, 75th, 90th, 95th). To return a precise percentile for a given
          VO2 max value, we linearly interpolate between adjacent breakpoints:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800">
          if v is between breakpoint p1 (value v1) and p2 (value v2):
          {'\n'}  ratio = (v − v1) / (v2 − v1)
          {'\n'}  percentile = p1 + ratio × (p2 − p1)
        </pre>
        <p className="mt-3 text-slate-700">
          Values below the 5th-percentile breakpoint return a percentile proportional to the ratio
          (capped at ≥1); values above the 95th return a percentile in [95, 99].
        </p>
        <p className="mt-3 text-slate-700">
          Linear interpolation between percentile breakpoints is the standard approach in
          population-health statistics when the underlying full-cohort distribution is not
          available. Accuracy within a narrow band (±5 ml/kg/min of a breakpoint) is within 2–3
          percentile points of what the full underlying distribution would produce.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Fitness categories</h2>
        <p className="mt-3 text-slate-700">
          ACSM groups percentile rankings into six categories:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li><strong>Poor:</strong> below 20th percentile</li>
          <li><strong>Fair:</strong> 20th–39th</li>
          <li><strong>Average:</strong> 40th–59th</li>
          <li><strong>Good:</strong> 60th–79th</li>
          <li><strong>Excellent:</strong> 80th–94th</li>
          <li><strong>Superior:</strong> 95th and above</li>
        </ul>
        <p className="mt-3 text-slate-700">
          These thresholds apply within each age-and-sex bracket. A score that is "Average" for
          a 25-year-old woman may be "Excellent" for a 70-year-old woman at the same absolute
          VO2 max.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Known limitations</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Field-test VO2 max is an estimate, not a measurement.</strong> Direct
            VO2 max measurement requires maximal exercise with open-circuit spirometry.
            Field-test formulas are validated against that gold standard but have
            standard errors of estimate ranging from about 3 to 8 ml/kg/min depending on test.
          </li>
          <li>
            <strong>Norms are North American.</strong> The Cooper Institute cohort is
            predominantly white, middle-class, and U.S.-resident. Non-North American populations
            may differ in distribution, though the structural shape (decline with age, sex gap)
            is consistent across published international datasets.
          </li>
          <li>
            <strong>Binary sex categories.</strong> The source data records sex as male/female.
            We report norms accordingly. We recognize this framework does not capture all human
            physiological variation; users with a chromosomal, hormonal, or anatomical profile
            not well-represented by binary norms should interpret results with additional caution.
          </li>
          <li>
            <strong>Age 18–19 and 80+ are out of range.</strong> Our norms table covers 20–79.
            Users outside this range are bucketed to the nearest bracket (20–29 for 18–19; 70–79
            for 80+), which introduces additional uncertainty.
          </li>
          <li>
            <strong>The HRmax = 220 − age formula is imprecise.</strong> Any test that uses
            HRmax (Åstrand, YMCA cycle, resting HR method) inherits a ±10 bpm uncertainty from
            this formula. A lab-determined HRmax improves accuracy.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Reproducibility</h2>
        <p className="mt-3 text-slate-700">
          Every formula is a pure function in the repository's{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">lib/formulas.ts</code>. Unit
          tests in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">tests/formulas.test.ts</code>{' '}
          verify each formula against worked examples from the original papers. Norm data is in{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">lib/norms.ts</code> with
          the source header.
        </p>
        <p className="mt-3 text-slate-700">
          If you find a discrepancy between our computation and your reading of the source paper,
          please get in touch via the <Link href="/about/" className="text-teal-700 underline">
            about page
          </Link>
          . Corrections are applied on the next release.
        </p>
      </section>

      <RelatedLinks pageType="home" />
    </article>
  );
}
