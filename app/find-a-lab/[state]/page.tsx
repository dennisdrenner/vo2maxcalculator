import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { SectionLabel } from '@/components/SectionLabel';
import { FacilityCard } from '@/components/FacilityCard';
import { DirectorySearch } from '@/components/DirectorySearch';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import {
  STATE_NAMES, getStates, getStateSlug, getStateBySlug, getFacilitiesByState,
} from '@/lib/directory';

type Params = { state: string };

export function generateStaticParams() {
  return getStates().map((abbr) => ({ state: getStateSlug(abbr) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { state } = await params;
  const abbr = getStateBySlug(state);
  if (!abbr) return { title: 'Not found' };
  const name = STATE_NAMES[abbr];
  const facilities = getFacilitiesByState(abbr);
  return buildMetadata({
    title: `VO2 Max Testing in ${name} — ${facilities.length} Labs`,
    description: `Find ${facilities.length} VO2 max and CPET testing facilities in ${name}. Lab locations, ratings, phone numbers, hours, and websites.`,
    path: `/find-a-lab/${state}/`,
    keywords: [
      `vo2 max test ${name.toLowerCase()}`,
      `cpet testing ${name.toLowerCase()}`,
      `metabolic testing ${name.toLowerCase()}`,
      `vo2 max lab ${name.toLowerCase()}`,
    ],
  });
}

export default async function StatePage({ params }: { params: Promise<Params> }) {
  const { state } = await params;
  const abbr = getStateBySlug(state);
  if (!abbr) notFound();

  const name = STATE_NAMES[abbr];
  const facilities = getFacilitiesByState(abbr);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Find a Lab', url: `${SITE_URL}/find-a-lab/` },
          { name: name, url: `${SITE_URL}/find-a-lab/${state}/` },
        ]}
      />
      <ArticleSchema
        headline={`VO2 Max Testing in ${name}`}
        description={`Directory of ${facilities.length} VO2 max and CPET testing facilities in ${name}.`}
        url={`${SITE_URL}/find-a-lab/${state}/`}
        datePublished="2026-04-18"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-methods.jpg"
        label="Lab Directory"
        title={`VO2 Max Testing in ${name}`}
        subtitle={`${facilities.length} testing ${facilities.length === 1 ? 'facility' : 'facilities'} offering VO2 max, CPET, and metabolic testing.`}
      />

      <article className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-lg text-slate-700">
          We found <strong>{facilities.length}</strong> {facilities.length === 1 ? 'facility' : 'facilities'} offering
          VO2 max and CPET testing in {name}. Browse the listings below, or search for a specific city.
        </p>

        <div className="mt-6">
          <DirectorySearch />
        </div>

        <section className="mt-10">
          <SectionLabel>{name}</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {facilities.length} {facilities.length === 1 ? 'Lab' : 'Labs'}
          </h2>

          <div className="mt-6 space-y-4">
            {facilities.map((f, i) => (
              <FacilityCard key={`${f.city}-${i}`} facility={f} />
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Know a lab we're missing?</h2>
          <p className="mt-2 text-sm text-slate-700">
            If you know of a facility in {name} that offers VO2 max or CPET testing, please email{' '}
            <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
              dennis@smartravenai.com
            </a>{' '}
            with the name, city, and website. We'll add it to the directory.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/find-a-lab/" className="text-teal-700 underline">
            ← Browse all states
          </Link>
          <Link href="/" className="text-teal-700 underline">
            Free VO2 max calculator →
          </Link>
        </div>
      </article>
    </>
  );
}
