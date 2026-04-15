import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NormsTable } from '@/components/NormsTable';
import RelatedLinks from '@/components/RelatedLinks';
import { AdSlot } from '@/components/AdSlot';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import {
  ACSM_NORMS,
  DECADE_SLUGS,
  bracketLabel,
  decadeSlugToBracket,
  type AgeBracket,
} from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

type Params = { decade: string };

export function generateStaticParams() {
  return DECADE_SLUGS.map((d) => ({ decade: d }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { decade } = await params;
  const bracket = decadeSlugToBracket(decade);
  if (!bracket) return { title: 'Not found' };
  return buildMetadata({
    title: `VO2 Max Norms for Your ${decade} (ages ${bracketLabel(bracket)})`,
    description: `Complete VO2 max percentile tables for men and women in their ${decade}. Compare your score to Cooper Institute norms and see training targets for ages ${bracketLabel(bracket)}.`,
    path: `/by-age/${decade}/`,
    keywords: [`vo2 max ${decade}`, `vo2 max ages ${bracketLabel(bracket)}`],
  });
}

export default async function ByAgeDecadePage({ params }: { params: Promise<Params> }) {
  const { decade } = await params;
  const bracket = decadeSlugToBracket(decade);
  if (!bracket) notFound();

  const male = ACSM_NORMS.find((n) => n.sex === 'male' && n.ageBracket === bracket)!;
  const female = ACSM_NORMS.find((n) => n.sex === 'female' && n.ageBracket === bracket)!;

  const faqs: FaqItem[] = [
    {
      question: `What is an average VO2 max in your ${decade}?`,
      answer: `The 50th-percentile VO2 max for men in their ${decade} is ${male.percentiles[50].toFixed(1)} ml/kg/min. For women, it's ${female.percentiles[50].toFixed(1)} ml/kg/min.`,
    },
    {
      question: `What is a good VO2 max in your ${decade}?`,
      answer: `ACSM classifies the 60th–79th percentile as "Good." For men in their ${decade} that means roughly ${estimateP60(male, 60)}–${male.percentiles[75].toFixed(1)} ml/kg/min; for women, ${estimateP60(female, 60)}–${female.percentiles[75].toFixed(1)}.`,
    },
    {
      question: `What is considered excellent for ages ${bracketLabel(bracket)}?`,
      answer: `The 90th-percentile VO2 max is ${male.percentiles[90].toFixed(1)} ml/kg/min for men and ${female.percentiles[90].toFixed(1)} for women in the ${bracketLabel(bracket)} bracket.`,
    },
    {
      question: `How can I improve my VO2 max in my ${decade}?`,
      answer:
        'A combination of zone-2 training 2–3 times per week and high-intensity intervals (Norwegian 4x4 or 30/30 intervals) 1–2 times per week typically produces 5–15% gains over 8–12 weeks. See /improve/ for structured programs.',
    },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'VO2 Max by Age', url: `${SITE_URL}/by-age/` },
          { name: `In your ${decade}`, url: `${SITE_URL}/by-age/${decade}/` },
        ]}
      />
      <ArticleSchema
        headline={`VO2 Max Norms for Your ${decade}`}
        description={`Percentile tables and training targets for ages ${bracketLabel(bracket)}.`}
        url={`${SITE_URL}/by-age/${decade}/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={faqs} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        VO2 Max Norms for Your {decade}
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        If you're between ages {bracketLabel(bracket)}, the median VO2 max is{' '}
        <strong>{male.percentiles[50].toFixed(1)} ml/kg/min</strong> for men and{' '}
        <strong>{female.percentiles[50].toFixed(1)} ml/kg/min</strong> for women. Anything at or
        above the 60th percentile is "Good" in the ACSM framework; 80th and above is "Excellent."
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Don't know your VO2 max yet?{' '}
        <Link href="/" className="text-teal-700 underline">
          Calculate it in 2 minutes with one of 17 field tests
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Men — ages {bracketLabel(bracket)}
        </h2>
        <NormsTable sex="male" brackets={[bracket]} caption={`Men, ${bracketLabel(bracket)}`} />
        <DecadeInterpretation row={male} sex="male" decade={decade} />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Women — ages {bracketLabel(bracket)}
        </h2>
        <NormsTable sex="female" brackets={[bracket]} caption={`Women, ${bracketLabel(bracket)}`} />
        <DecadeInterpretation row={female} sex="female" decade={decade} />
      </section>

      <AdSlot slot="decade-mid" className="my-10" />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Training targets for your {decade}</h2>
        <p className="mt-3 text-slate-700">
          If you are below the 40th percentile, structured aerobic training typically yields
          10–20% gains in 8–12 weeks — the biggest relative returns are available here. Above the
          75th percentile, gains slow to roughly 3–8% per training block, but maintenance becomes
          the priority: VO2 max loss in trained adults is about half the rate of untrained peers.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <Link href="/improve/zone-2-training/" className="text-teal-700 underline">
              Zone 2 training
            </Link>{' '}
            — 2–3 sessions per week, 45–90 minutes each.
          </li>
          <li>
            <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">
              Norwegian 4x4 intervals
            </Link>{' '}
            — 1 session per week at 85–95% max heart rate.
          </li>
          <li>
            <Link href="/improve/polarized-training/" className="text-teal-700 underline">
              Polarized training
            </Link>{' '}
            — the 80/20 rule used by most elite endurance athletes.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-slate-900">{f.question}</dt>
              <dd className="mt-2 text-slate-700">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedLinks pageType="by-age-decade" ageBracket={bracket} />
    </article>
  );
}

function estimateP60(
  row: { percentiles: { 50: number; 75: number } },
  _target: number
): string {
  // 60th percentile sits 40% of the way from 50th to 75th band
  const v = row.percentiles[50] + 0.4 * (row.percentiles[75] - row.percentiles[50]);
  return v.toFixed(1);
}

function DecadeInterpretation({
  row,
  sex,
  decade,
}: {
  row: { percentiles: { 5: number; 25: number; 50: number; 75: number; 90: number; 95: number } };
  sex: 'male' | 'female';
  decade: string;
}) {
  const pronoun = sex === 'male' ? 'men' : 'women';
  return (
    <p className="mt-3 text-slate-700">
      For {pronoun} in their {decade}: below {row.percentiles[25].toFixed(1)} ml/kg/min is
      "Poor-to-Fair"; {row.percentiles[50].toFixed(1)} is the median; {row.percentiles[75].toFixed(1)}{' '}
      puts you in the top quartile ("Good"); {row.percentiles[90].toFixed(1)} is "Excellent" (top
      10%); and anything above {row.percentiles[95].toFixed(1)} is "Superior" — top 5% of {pronoun}{' '}
      in this age bracket.
    </p>
  );
}
