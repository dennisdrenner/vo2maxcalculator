import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { AdSlot } from '@/components/AdSlot';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import {
  AGE_BRACKETS,
  bracketLabel,
  bracketToDecadeSlug,
  categoryForVo2Max,
} from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

const MIN_VALUE = 25;
const MAX_VALUE = 70;

type Params = { value: string };

export function generateStaticParams() {
  return Array.from({ length: MAX_VALUE - MIN_VALUE + 1 }, (_, i) => ({
    value: String(MIN_VALUE + i),
  }));
}

function parseValue(raw: string): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  if (n < MIN_VALUE || n > MAX_VALUE) return null;
  return n;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { value } = await params;
  const v = parseValue(value);
  if (v == null) return { title: 'Not found' };

  const anchorMale = categoryForVo2Max(v, 35, 'male');
  const anchorFemale = categoryForVo2Max(v, 35, 'female');
  const description = `A VO2 max of ${v} ml/kg/min is ${anchorMale.category.toLowerCase()} for a 35-year-old man (${anchorMale.percentile}th percentile) and ${anchorFemale.category.toLowerCase()} for a 35-year-old woman (${anchorFemale.percentile}th percentile). Full breakdown across every age.`;

  return buildMetadata({
    title: `Is ${v} a Good VO2 Max?`,
    description,
    path: `/good-vo2-max/${v}/`,
    keywords: [`vo2 max ${v}`, `is ${v} a good vo2 max`, `${v} ml/kg/min`],
  });
}

export default async function GoodVo2ValuePage({ params }: { params: Promise<Params> }) {
  const { value } = await params;
  const v = parseValue(value);
  if (v == null) notFound();

  // Build a matrix: rows = age bracket, columns = sex, cell = {percentile, category}
  const rows = AGE_BRACKETS.map((bracket) => {
    const midAge = Number(bracket.split('-')[0]) + 5; // representative age within bracket
    return {
      bracket,
      midAge,
      male: categoryForVo2Max(v, midAge, 'male'),
      female: categoryForVo2Max(v, midAge, 'female'),
    };
  });

  const anchorMale = categoryForVo2Max(v, 35, 'male');
  const anchorFemale = categoryForVo2Max(v, 35, 'female');

  const faqs: FaqItem[] = [
    {
      question: `Is ${v} a good VO2 max?`,
      answer: `It depends on age and sex. For a 35-year-old man, ${v} ml/kg/min is "${anchorMale.category}" (${anchorMale.percentile}th percentile). For a 35-year-old woman, ${v} is "${anchorFemale.category}" (${anchorFemale.percentile}th percentile). See the full table below for every age bracket.`,
    },
    {
      question: `What does a VO2 max of ${v} ml/kg/min mean physiologically?`,
      answer: `A VO2 max of ${v} means your body can use ${v} ml of oxygen per kilogram of body weight per minute at maximum effort. For a 175-lb (79 kg) adult that's ${(v * 79 / 1000).toFixed(1)} liters of oxygen per minute — enough to sustain roughly ${Math.round(v / 3.5)} METs of activity.`,
    },
    {
      question: `How can I improve from a VO2 max of ${v}?`,
      answer:
        'Consistent aerobic training — zone 2 workouts 2–3 times per week plus one HIIT session — typically produces 5–15% gains in 8–12 weeks. See /improve/ for specific programs.',
    },
  ];

  const neighbors = [v - 1, v + 1].filter((n) => n >= MIN_VALUE && n <= MAX_VALUE);

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'What is a good VO2 max?', url: `${SITE_URL}/good-vo2-max/` },
          { name: `${v} ml/kg/min`, url: `${SITE_URL}/good-vo2-max/${v}/` },
        ]}
      />
      <ArticleSchema
        headline={`Is ${v} a good VO2 max?`}
        description={`How a VO2 max of ${v} ml/kg/min ranks by age and sex.`}
        url={`${SITE_URL}/good-vo2-max/${v}/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={faqs} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Is {v} a Good VO2 Max?
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        A VO2 max of <strong>{v} ml/kg/min</strong> is{' '}
        <strong>"{anchorMale.category}"</strong> for a 35-year-old man ({anchorMale.percentile}th
        percentile) and <strong>"{anchorFemale.category}"</strong> for a 35-year-old woman ({anchorFemale.percentile}th
        percentile). The table below shows how {v} ranks in every age bracket.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Want your exact percentile?{' '}
        <Link href="/percentile-calculator/" className="text-teal-700 underline">
          Enter your age and sex in the percentile calculator
        </Link>
        .
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="mb-2 text-left text-sm font-semibold text-slate-700">
            Where {v} ml/kg/min ranks by age and sex
          </caption>
          <thead>
            <tr>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left" rowSpan={2}>
                Age bracket
              </th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-center" colSpan={2}>
                Men
              </th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-center" colSpan={2}>
                Women
              </th>
            </tr>
            <tr>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Percentile</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Category</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Percentile</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.bracket}>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">
                  <Link href={`/by-age/${bracketToDecadeSlug(r.bracket)}/`} className="text-teal-700 hover:underline">
                    {bracketLabel(r.bracket)}
                  </Link>
                </th>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{r.male.percentile}</td>
                <td className="border border-slate-200 px-3 py-2">{r.male.category}</td>
                <td className="border border-slate-200 px-3 py-2 text-right tabular-nums">{r.female.percentile}</td>
                <td className="border border-slate-200 px-3 py-2">{r.female.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What {v} ml/kg/min means physiologically</h2>
        <p className="mt-3 text-slate-700">
          VO2 max of {v} ml/kg/min is equivalent to <strong>{(v / 3.5).toFixed(1)} METs</strong>{' '}
          (one MET = 3.5 ml/kg/min, resting oxygen consumption). Practically, someone at this
          level can sustain steady-state exercise at roughly 60–70% of {v} — that is, {(v * 0.65).toFixed(1)}{' '}
          ml/kg/min, or about {Math.round(v * 0.65 / 3.5)} METs — for an hour or more. For context,
          brisk walking is ~4 METs, jogging ~7 METs, and competitive running ~12–16 METs.
        </p>
        <p className="mt-3 text-slate-700">
          Each MET above the population median is associated with an ~10–15% reduction in
          all-cause mortality risk in long-term cohort studies, even after adjusting for
          traditional cardiovascular risk factors.
        </p>
      </section>

      <AdSlot slot="value-mid" className="my-10" />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Next steps</h2>
        <p className="mt-3 text-slate-700">
          Whether {v} is good for <em>you</em> depends on where you want to go. Three common paths:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>If you're below average for your bracket:</strong>{' '}
            <Link href="/improve/zone-2-training/" className="text-teal-700 underline">
              start with zone-2 training
            </Link>{' '}
            — the highest-return intervention for beginners.
          </li>
          <li>
            <strong>If you're average-to-good:</strong> add{' '}
            <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">
              Norwegian 4x4 intervals
            </Link>{' '}
            once a week. Consistent use produces 5–10% gains in 8 weeks.
          </li>
          <li>
            <strong>If you're excellent-or-better:</strong>{' '}
            <Link href="/improve/polarized-training/" className="text-teal-700 underline">
              polarized training
            </Link>{' '}
            (80% easy / 20% hard) is the dominant approach in elite endurance programs.
          </li>
        </ul>
      </section>

      {neighbors.length ? (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">Nearby values</h2>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {neighbors.map((n) => (
              <li key={n}>
                <Link href={`/good-vo2-max/${n}/`} className="text-teal-700 hover:underline">
                  Is {n} a good VO2 max?
                </Link>
              </li>
            ))}
            <li>
              <Link href="/good-vo2-max/" className="text-teal-700 hover:underline">
                All values (25–70) →
              </Link>
            </li>
          </ul>
        </section>
      ) : null}

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

      <RelatedLinks pageType="good-vo2-value" vo2Value={v} />
    </article>
  );
}
