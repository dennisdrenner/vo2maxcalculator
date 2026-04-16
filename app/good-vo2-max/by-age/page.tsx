import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { ACSM_NORMS, AGE_BRACKETS, bracketLabel, bracketToDecadeSlug } from '@/lib/norms';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is a Good VO2 Max by Age?',
  description:
    'Age-adjusted "Good" and "Excellent" VO2 max thresholds for men and women, 20s through 70s. Based on Cooper Institute percentile norms.',
  path: '/good-vo2-max/by-age/',
  keywords: ['good vo2 max by age', 'vo2 max age thresholds'],
});

export default function GoodVo2ByAgePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'What is a good VO2 max?', url: `${SITE_URL}/good-vo2-max/` },
          { name: 'By age', url: `${SITE_URL}/good-vo2-max/by-age/` },
        ]}
      />
      <ArticleSchema
        headline="What is a good VO2 max by age?"
        description="Age-adjusted good and excellent thresholds for men and women."
        url={`${SITE_URL}/good-vo2-max/by-age/`}
        datePublished="2026-04-13"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-good-vo2.jpg"
        label="Thresholds"
        title="What Is a Good VO2 Max by Age?"
        subtitle="Age- and sex-adjusted thresholds at every decade from 20s through 70s."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        "Good" (60th–79th percentile) and "Excellent" (80th–94th) VO2 max values shift substantially
        across decades. The tables below give the threshold values at each age bracket, for men and
        women, so you can see exactly where your score sits.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Men</h2>
        <ThresholdTable sex="male" />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Women</h2>
        <ThresholdTable sex="female" />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Decade pages</h2>
        <p className="mt-3 text-slate-700">
          Each decade has a dedicated reference page with full percentile tables and
          training recommendations:
        </p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {AGE_BRACKETS.map((b) => {
            const slug = bracketToDecadeSlug(b);
            return (
              <li key={b}>
                <Link href={`/by-age/${slug}/`} className="text-teal-700 hover:underline">
                  VO2 max norms for your {slug} ({bracketLabel(b)})
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <RelatedLinks pageType="good-vo2-hub" />
    </article>
      </>
  );
}

function ThresholdTable({ sex }: { sex: 'male' | 'female' }) {
  const rows = AGE_BRACKETS.map((b) => ACSM_NORMS.find((n) => n.sex === sex && n.ageBracket === b)!);
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Age</th>
            <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Average (50th)</th>
            <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Good (60th+)</th>
            <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Excellent (80th+)</th>
            <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Superior (95th+)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const p60 = row.percentiles[50] + 0.4 * (row.percentiles[75] - row.percentiles[50]);
            const p80 = row.percentiles[75] + (1 / 3) * (row.percentiles[90] - row.percentiles[75]);
            return (
              <tr key={row.ageBracket}>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">
                  {bracketLabel(row.ageBracket)}
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
      <p className="mt-2 text-xs text-slate-500">Source: The Cooper Institute. Values in ml/kg/min.</p>
    </div>
  );
}
