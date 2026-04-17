import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { SectionLabel } from '@/components/SectionLabel';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { DIRECTORY, STATE_NAMES, getStates, getFacilitiesByState } from '@/lib/directory';
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
                <a
                  key={st}
                  href={`#${st.toLowerCase()}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <span className="font-semibold text-slate-900">{name}</span>
                  <span className="text-sm text-slate-500">{facilities.length} {facilities.length === 1 ? 'lab' : 'labs'}</span>
                </a>
              );
            })}
          </div>
        </section>

        {states.map((st) => {
          const facilities = getFacilitiesByState(st);
          const name = STATE_NAMES[st] || st;
          return (
            <section key={st} id={st.toLowerCase()} className="mt-12 scroll-mt-20">
              <h2 className="text-xl font-bold text-slate-900">{name}</h2>
              <div className="mt-4 space-y-3">
                {facilities.map((f, i) => (
                  <div
                    key={`${f.city}-${i}`}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        {f.name ? (
                          <h3 className="font-bold text-slate-900">{f.name}</h3>
                        ) : null}
                        <p className="text-sm text-slate-700">
                          {f.city}, {f.state}
                          {f.address ? ` — ${f.address}` : ''}
                        </p>
                      </div>
                      {f.website ? (
                        <a
                          href={f.website.startsWith('http') ? f.website : `https://${f.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm font-semibold text-teal-700 hover:underline"
                        >
                          Website ↗
                        </a>
                      ) : null}
                    </div>
                    {f.phone ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Phone: <a href={`tel:${f.phone}`} className="text-teal-700 hover:underline">{f.phone}</a>
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

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
