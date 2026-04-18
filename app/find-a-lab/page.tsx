import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { SectionLabel } from '@/components/SectionLabel';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { DIRECTORY, STATE_NAMES, getStates, getFacilitiesByState, getStateSlug } from '@/lib/directory';
import { DirectorySearch } from '@/components/DirectorySearch';

export const metadata: Metadata = buildMetadata({
  title: 'Find a VO2 Max Lab Near You — Testing Directory',
  description:
    `Find VO2 max and CPET lab testing facilities near you. ${DIRECTORY.total_facilities} locations across ${DIRECTORY.total_states} states. Metabolic testing, cardiopulmonary exercise testing, and sports performance labs.`,
  path: '/find-a-lab/',
  keywords: ['vo2 max test near me', 'CPET testing near me', 'metabolic testing lab', 'vo2 max lab'],
});

export default function FindALabPage() {
  const states = getStates();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Find a Lab', url: `${SITE_URL}/find-a-lab/` },
        ]}
      />
      <ArticleSchema
        headline="Find a VO2 Max Lab Near You"
        description={`Directory of ${DIRECTORY.total_facilities} VO2 max and CPET testing facilities across the United States.`}
        url={`${SITE_URL}/find-a-lab/`}
        datePublished="2026-04-17"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-methods.jpg"
        label="Lab Directory"
        title="Find a VO2 Max Lab Near You"
        subtitle={`${DIRECTORY.total_facilities} testing facilities across ${DIRECTORY.total_states} states. CPET, metabolic testing, and sports performance labs.`}
      />

      <article className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-lg text-slate-700">
          The gold standard for measuring VO2 max is a{' '}
          <Link href="/methods/#accuracy-tiers" className="text-teal-700 underline">
            cardiopulmonary exercise test (CPET)
          </Link>{' '}
          in a clinical lab. You wear a mask connected to a metabolic cart while exercising at
          progressively harder intensities until exhaustion. The result is a direct measurement —
          not an estimate. Tests typically cost $150–$500 and take about 45 minutes.
        </p>
        <p className="mt-3 text-slate-700">
          Finding a facility can be surprisingly difficult — many labs don't advertise well. We
          built this directory to help. Search by city or state, or browse below.
        </p>

        <img
          src="https://calculatorsites.b-cdn.net/vo2max/inline-cpet.jpg"
          alt="Person running on a treadmill during a CPET lab test, wearing a metabolic mask connected to a gas analysis cart."
          width={800}
          height={450}
          loading="lazy"
          className="mt-8 w-full rounded-2xl"
        />

        <div className="mt-8">
          <DirectorySearch />
        </div>

        <section className="mt-12 rounded-2xl bg-charcoal p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold text-white">What to expect from a lab test</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-charcoal-deep p-4">
              <p className="font-nav text-xs font-semibold uppercase tracking-wider text-brand-soft">Cost</p>
              <p className="mt-1 text-sm text-slate-300">
                $150–$500 depending on location. University labs are cheapest ($150–$200).
                Insurance covers it if ordered by a doctor for a medical reason.
              </p>
            </div>
            <div className="rounded-xl bg-charcoal-deep p-4">
              <p className="font-nav text-xs font-semibold uppercase tracking-wider text-brand-soft">Duration</p>
              <p className="mt-1 text-sm text-slate-300">
                The exercise portion is 8–15 minutes. Total visit including setup, calibration,
                and cooldown is ~45 minutes.
              </p>
            </div>
            <div className="rounded-xl bg-charcoal-deep p-4">
              <p className="font-nav text-xs font-semibold uppercase tracking-wider text-brand-soft">What you get</p>
              <p className="mt-1 text-sm text-slate-300">
                VO2 max (ml/kg/min), ventilatory thresholds (VT1/VT2), heart rate zones,
                and often a lactate threshold estimate. Some labs include a written report.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <SectionLabel>Directory</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Browse by state</h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {states.map((st) => {
              const facilities = getFacilitiesByState(st);
              const name = STATE_NAMES[st] || st;
              return (
                <Link
                  key={st}
                  href={`/find-a-lab/${getStateSlug(st)}/`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <span className="font-semibold text-slate-900">{name}</span>
                  <span className="flex items-center gap-1 text-sm text-slate-500">
                    {facilities.length} {facilities.length === 1 ? 'lab' : 'labs'}
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Know a lab we're missing?</h2>
          <p className="mt-2 text-sm text-slate-700">
            If you know of a facility that offers VO2 max or CPET testing, please email{' '}
            <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
              dennis@smartravenai.com
            </a>{' '}
            with the name, city, and website. We'll add it to the directory.
          </p>
        </section>

        <div className="mt-8">
          <p className="text-sm text-slate-500">
            Don't have access to a lab?{' '}
            <Link href="/" className="text-teal-700 underline">
              Use our free field-test calculator
            </Link>{' '}
            to estimate your VO2 max at home.
          </p>
        </div>
      </article>
    </>
  );
}
