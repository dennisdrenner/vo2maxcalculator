import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Formulas — All 17 Test Equations in Plain Text',
  description:
    'Every VO2 max estimation formula used on this site, with variable definitions and citations. Cooper, Rockport, Åstrand, Bruce, beep test, and 12 more.',
  path: '/formula/',
  keywords: ['vo2 max formula', 'vo2 max equation', 'cooper formula', 'rockport formula'],
});

interface FormulaEntry {
  slug: string;
  name: string;
  formula: string;
  variables: string;
  citation: string;
}

const FORMULAS: FormulaEntry[] = [
  {
    slug: 'cooper-12-minute-run',
    name: 'Cooper 12-minute run',
    formula: 'VO2 max = (35.97 × miles) − 11.29 = (distance in meters × 0.0225) − 11.3',
    variables: 'miles = distance covered in 12 minutes',
    citation: 'Cooper KH. JAMA. 1968;203(3):201-204.',
  },
  {
    slug: '1-5-mile-run',
    name: '1.5-mile run',
    formula: 'VO2 max = 483 / time + 3.5',
    variables: 'time = decimal minutes to complete 1.5 miles',
    citation: 'ACSM Guidelines 11th ed. / George et al. 1993.',
  },
  {
    slug: '1-mile-run',
    name: '1-mile run (George et al.)',
    formula:
      'VO2 max = 100.5 + 8.344·sex − 0.1636·weightKg − 1.438·time − 0.1928·HR',
    variables: 'sex = 1 (male) / 0 (female); weightKg = body weight in kg; time = decimal minutes; HR = heart rate at finish (bpm)',
    citation: 'George JD, Vehrs PR, et al. MSSE 1993;25(3):401-406.',
  },
  {
    slug: '2-4-km-run',
    name: '2.4 km run',
    formula: 'VO2 max = 483 / time + 3.5 (same as 1.5-mile run)',
    variables: 'time = decimal minutes to complete 2.4 km',
    citation: 'Derived from ACSM 11th ed.',
  },
  {
    slug: 'rockport-1-mile-walk',
    name: 'Rockport 1-mile walk',
    formula:
      'VO2 max = 132.853 − 0.0769·weightLb − 0.3877·age + 6.315·sex − 3.2649·time − 0.1565·HR',
    variables: 'weightLb = body weight in lb; sex = 1/0; time = decimal minutes; HR = finishing heart rate (bpm)',
    citation: 'Kline GM et al. MSSE 1987;19(3):253-259.',
  },
  {
    slug: '1-5-mile-walk',
    name: '1.5-mile walk (modified Rockport)',
    formula:
      'VO2 max = 132.853 − 0.0769·weightLb − 0.3877·age + 6.315·sex − (3.2649/1.5)·time − 0.1565·HR',
    variables: 'Same as Rockport, time scaled by 1.5× for the longer distance',
    citation: 'Modified from Kline et al. 1987.',
  },
  {
    slug: 'beep-test',
    name: 'Beep test (20m MSR)',
    formula: 'VO2 max = 3.46 × (level + shuttle / (level × 0.4325 + 7.0048)) + 12.2',
    variables: 'level = final level reached; shuttle = final shuttle within level',
    citation: 'Flouris AD, Metsios GS, Koutedakis Y. Br J Sports Med. 2005;39(3):166-170.',
  },
  {
    slug: 'yo-yo-intermittent-recovery',
    name: 'Yo-Yo Intermittent Recovery Level 1',
    formula: 'VO2 max = distance × 0.0084 + 36.4',
    variables: 'distance = total meters covered (not including recovery jogs)',
    citation: 'Bangsbo J, Iaia FM, Krustrup P. Sports Med. 2008;38(1):37-51.',
  },
  {
    slug: 'queens-college-step-test',
    name: "Queen's College step test",
    formula:
      'Men:   VO2 max = 111.33 − 0.42 × recovery HR\nWomen: VO2 max = 65.81 − 0.1847 × recovery HR',
    variables: 'recovery HR = bpm from 15-s count taken 5–20 s post-exercise × 4',
    citation: 'McArdle WD et al. Med Sci Sports. 1972;4(4):182-186.',
  },
  {
    slug: 'harvard-step-test',
    name: 'Harvard step test',
    formula:
      'Fitness Index (FI) = (duration × 100) / (2 × (HR1 + HR2 + HR3))\nVO2 max ≈ 6.04 + 0.51 × FI',
    variables:
      'duration = seconds completed (≤300); HR1, HR2, HR3 = 30-s HR counts at 1:00–1:30, 2:00–2:30, 3:00–3:30 post-exercise',
    citation: 'Brouha L. Res Q. 1943;14:31-36.',
  },
  {
    slug: 'ymca-3-minute-step-test',
    name: 'YMCA 3-minute step test',
    formula:
      'Men:   VO2 max ≈ 70 − 0.35 × recovery HR\nWomen: VO2 max ≈ 65 − 0.33 × recovery HR',
    variables: 'recovery HR = 60-s pulse count beginning immediately post-exercise',
    citation: 'Golding LA, ed. YMCA Fitness Testing Manual, 4th ed. 2000.',
  },
  {
    slug: 'astrand-rhyming-cycle',
    name: 'Åstrand-Rhyming cycle ergometer',
    formula:
      'VO2AtLoad (L/min) = 0.012·W + 0.3\nPredicted VO2 max (L/min) = VO2AtLoad × (refHRmax − 60) / (HR − 60)\nVO2 max (ml/kg/min) = Predicted × ageFactor × 1000 / weightKg',
    variables:
      'W = workload in watts; HR = steady-state HR; refHRmax = 195 (men) / 198 (women); ageFactor from nomogram (1.10 at 15, 1.00 at 25, 0.75 at 50, 0.65 at 65)',
    citation: 'Åstrand PO, Rhyming I. J Appl Physiol. 1954;7(2):218-221.',
  },
  {
    slug: 'ymca-cycle-ergometer',
    name: 'YMCA multistage cycle ergometer',
    formula:
      'Slope = (W2 − W1) / (HR2 − HR1)\nPredictedMaxW = W2 + Slope × (HRmax − HR2)\nVO2 max = 10.8 × PredictedMaxW / weightKg + 7',
    variables: 'HRmax = 220 − age; W1, W2 = stage workloads; HR1, HR2 = steady-state HRs',
    citation: 'Golding LA, ed. YMCA Manual. ACSM Guidelines 11th ed.',
  },
  {
    slug: 'resting-heart-rate',
    name: 'Resting HR method (Uth-Sørensen-Overgaard-Pedersen)',
    formula: 'VO2 max = 15.3 × (HRmax / HRrest)',
    variables: 'HRmax = measured max HR or (220 − age); HRrest = true resting HR',
    citation: 'Uth N et al. Eur J Appl Physiol. 2004;91(1):111-115.',
  },
  {
    slug: 'non-exercise-estimator',
    name: 'Non-exercise estimator (Jackson et al.)',
    formula: 'VO2 max = 56.363 + 1.921·PAR − 0.381·age − 0.754·BMI + 10.987·sex',
    variables: 'sex = 1/0; PAR = physical activity rating (0–7); BMI in kg/m²',
    citation: 'Jackson AS et al. MSSE 1990;22(6):863-870.',
  },
  {
    slug: 'bruce-treadmill-protocol',
    name: 'Bruce treadmill protocol',
    formula:
      'Men:   VO2 max = 14.76 − 1.379·t + 0.451·t² − 0.012·t³\nWomen: VO2 max = 4.38·t − 3.9',
    variables: 't = decimal minutes to exhaustion on standard Bruce protocol',
    citation: 'Bruce RA, Kusumi F, Hosmer D. Am Heart J. 1973;85(4):546-562.',
  },
  {
    slug: '6-minute-walk-test',
    name: '6-minute walk test',
    formula: 'VO2 max = 4.948 + 0.023 × distance',
    variables: 'distance = total meters covered in 6 minutes',
    citation: 'Burr JF et al. Phys Sportsmed. 2011;39(2):133-139.',
  },
];

export default function FormulaPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Formulas', url: `${SITE_URL}/formula/` },
        ]}
      />
      <ArticleSchema
        headline="VO2 Max Formulas — All 17 Test Equations"
        description="Every VO2 max estimation equation used on this site, with variables and citations."
        url={`${SITE_URL}/formula/`}
        datePublished="2026-04-13"
      />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        VO2 Max Formulas
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Every VO2 max equation used on this site in plain text, with variable definitions and
        citations. All formulas return VO2 max in <strong>ml/kg/min</strong>.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Need just the calculator?{' '}
        <Link href="/" className="text-teal-700 underline">
          Use the main VO2 max calculator
        </Link>
        . For per-test protocol and accuracy detail,{' '}
        <Link href="/methods/" className="text-teal-700 underline">
          see the methods hub
        </Link>
        .
      </p>

      <div className="mt-10 space-y-8">
        {FORMULAS.map((f) => (
          <section key={f.slug}>
            <h2 className="text-xl font-bold text-slate-900">
              <Link href={`/methods/${f.slug}/`} className="text-teal-700 hover:underline">
                {f.name}
              </Link>
            </h2>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800">
              {f.formula}
            </pre>
            <p className="mt-2 text-sm text-slate-700">
              <strong>Where:</strong> {f.variables}
            </p>
            <p className="mt-1 text-xs text-slate-500">{f.citation}</p>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Source of truth</h2>
        <p className="mt-3 text-slate-700">
          These are the same formulas implemented in the site's calculator. The working code
          is in <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">lib/formulas.ts</code>;
          each function is pure and has a unit test. If you spot a discrepancy between the
          formulas on this page and the calculator output, please open an issue — we keep these
          in sync on every release.
        </p>
        <p className="mt-3 text-slate-700">
          Normative percentile data (where your result ranks by age and sex) comes from{' '}
          <Link href="/methodology/" className="text-teal-700 underline">
            The Cooper Institute's Aerobics Center Longitudinal Study
          </Link>
          .
        </p>
      </section>

      <RelatedLinks pageType="method" />
    </article>
  );
}
