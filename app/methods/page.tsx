import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { METHODS, methodsByCategory } from '@/lib/methods';

type Category = 'run' | 'walk' | 'cycle' | 'step' | 'shuttle' | 'treadmill' | 'non-exercise';
type Accuracy = 'high' | 'moderate' | 'low';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'All 17 VO2 Max Test Methods',
  description:
    'Compare all 17 validated VO2 max field tests: Cooper 12-minute run, 1.5-mile run, Rockport walk, Åstrand cycle, Bruce treadmill, and more. Accuracy, equipment, time required.',
  path: '/methods/',
  keywords: ['vo2 max tests', 'vo2 max methods', 'field test comparison'],
});

const CATEGORY_LABEL: Record<Category, string> = {
  run: 'Running tests',
  walk: 'Walking tests',
  cycle: 'Cycle ergometer tests',
  step: 'Step tests',
  shuttle: 'Shuttle tests',
  treadmill: 'Treadmill protocols',
  'non-exercise': 'No-exercise estimators',
};

const ACCURACY_BADGE: Record<Accuracy, string> = {
  high: 'bg-emerald-100 text-emerald-800',
  moderate: 'bg-amber-100 text-amber-800',
  low: 'bg-rose-100 text-rose-800',
};

export default function MethodsHubPage() {
  const grouped = methodsByCategory();
  const categoryOrder: Category[] = [
    'run',
    'walk',
    'cycle',
    'step',
    'shuttle',
    'treadmill',
    'non-exercise',
  ];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Methods', url: `${SITE_URL}/methods/` },
        ]}
      />
      <ArticleSchema
        headline="All 17 VO2 Max Test Methods"
        description="Comparison of every validated field test for VO2 max."
        url={`${SITE_URL}/methods/`}
        datePublished="2026-04-13"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-methods.jpg"
        label="Methods"
        title="All 17 VO2 Max Test Methods"
        subtitle="Every validated field test we support, grouped by category — running, walking, cycling, step, shuttle, treadmill, and no-exercise estimators."
      />

      <article className="mx-auto max-w-5xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        Every field test we support, grouped by category. For most trained runners, the Cooper
        12-minute run or the 1.5-mile run are the most accurate. For non-runners, the Rockport
        walk or Åstrand cycle ergometer tests are the standard options. Non-exercise estimators
        are the least accurate but require no physical test.
      </p>

      <section className="mt-10 rounded-2xl bg-charcoal p-6 text-white sm:p-8">
        <h2 className="text-2xl font-bold text-white">The gold standard: lab CPET</h2>
        <p className="mt-3 text-slate-300">
          The most accurate way to measure VO2 max is a <strong className="text-white">cardiopulmonary exercise test (CPET)</strong> in
          a clinical or sports-medicine lab. You wear a mask connected to a metabolic cart that measures
          the exact volume and composition of every breath while running on a treadmill or cycling an
          ergometer at progressively harder intensities until exhaustion. The result is a direct
          measurement — not an estimate.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-charcoal-deep p-4">
            <p className="font-nav text-xs font-semibold uppercase tracking-wider text-brand-soft">Cost</p>
            <p className="mt-1 text-sm text-slate-300">$200–$500 at most sports-medicine clinics and university exercise-physiology labs.</p>
          </div>
          <div className="rounded-xl bg-charcoal-deep p-4">
            <p className="font-nav text-xs font-semibold uppercase tracking-wider text-brand-soft">Duration</p>
            <p className="mt-1 text-sm text-slate-300">8–15 minutes of graded exercise, plus setup and recovery. ~45 minutes total visit.</p>
          </div>
          <div className="rounded-xl bg-charcoal-deep p-4">
            <p className="font-nav text-xs font-semibold uppercase tracking-wider text-brand-soft">Accuracy</p>
            <p className="mt-1 text-sm text-slate-300">Direct measurement — this is the benchmark. All field tests below are validated against it.</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          If you have access to a CPET, take it — nothing else comes close. But for most people,
          the cost and logistics make field tests the practical alternative. The tier list below shows
          how closely each field test correlates with a lab-measured result.
        </p>
      </section>

      <section id="accuracy-tiers" className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Accuracy tier list</h2>
        <p className="mt-2 text-slate-700">
          How closely each method correlates with lab-measured VO2 max. Correlation values (r) are
          from the original validation studies.
        </p>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <strong>What does r mean?</strong> The correlation coefficient (r) measures how closely a
          field test's estimate tracks the lab-measured value, on a scale from 0 to 1. An r of 0.90
          means 90% of the variation in lab scores is captured by the field test — very strong. An r
          of 0.70 is moderate: useful for a ballpark, but individual estimates can be off by several
          ml/kg/min. Below 0.70, the estimate is rough and best used for tracking changes over time
          rather than pinning down an exact number.
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 font-nav text-lg font-bold text-white">S</span>
              <div>
                <p className="font-bold text-emerald-900">Gold standard — direct measurement</p>
                <p className="text-sm text-emerald-800">Lab CPET with metabolic cart (r = 1.00)</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 font-nav text-lg font-bold text-white">A</span>
              <p className="font-bold text-slate-900">High accuracy — r ≈ 0.87–0.92</p>
            </div>
            <ul className="mt-3 space-y-2 pl-[52px]">
              {METHODS.filter((m) => m.accuracy === 'high').map((m) => (
                <li key={m.slug} className="flex items-center gap-3">
                  <img src={`https://calculatorsites.b-cdn.net/vo2max/methods/${m.slug}.jpg`} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
                  <Link href={`/methods/${m.slug}/`} className="text-sm font-medium text-teal-700 hover:underline">{m.displayName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 font-nav text-lg font-bold text-white">B</span>
              <p className="font-bold text-slate-900">Moderate accuracy — r ≈ 0.75–0.88</p>
            </div>
            <ul className="mt-3 space-y-2 pl-[52px]">
              {METHODS.filter((m) => m.accuracy === 'moderate').map((m) => (
                <li key={m.slug} className="flex items-center gap-3">
                  <img src={`https://calculatorsites.b-cdn.net/vo2max/methods/${m.slug}.jpg`} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
                  <Link href={`/methods/${m.slug}/`} className="text-sm font-medium text-teal-700 hover:underline">{m.displayName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-400 font-nav text-lg font-bold text-white">C</span>
              <p className="font-bold text-slate-900">Low accuracy — r ≈ 0.50–0.75</p>
            </div>
            <ul className="mt-3 space-y-2 pl-[52px]">
              {METHODS.filter((m) => m.accuracy === 'low').map((m) => (
                <li key={m.slug} className="flex items-center gap-3">
                  <img src={`https://calculatorsites.b-cdn.net/vo2max/methods/${m.slug}.jpg`} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
                  <Link href={`/methods/${m.slug}/`} className="text-sm font-medium text-teal-700 hover:underline">{m.displayName}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="mb-2 text-left text-sm font-semibold text-slate-700">
            All 17 methods at a glance
          </caption>
          <thead>
            <tr>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Test</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Category</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Equipment</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-right">Time</th>
              <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {METHODS.map((m) => (
              <tr key={m.slug}>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">
                  <Link href={`/methods/${m.slug}/`} className="text-teal-700 hover:underline">
                    {m.displayName}
                  </Link>
                </th>
                <td className="border border-slate-200 px-3 py-2 capitalize text-slate-700">{m.category}</td>
                <td className="border border-slate-200 px-3 py-2 text-slate-700">{m.equipment}</td>
                <td className="border border-slate-200 px-3 py-2 text-right text-slate-700">~{m.timeMinutes} min</td>
                <td className="border border-slate-200 px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ACCURACY_BADGE[m.accuracy]}`}>
                    {m.accuracy}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <img
        src="https://calculatorsites.b-cdn.net/vo2max/hero-methods.jpg"
        alt="Flat-lay of fitness test equipment: stopwatch, heart rate monitor, sport watch, and measuring tape."
        width={800}
        height={450}
        loading="lazy"
        className="mt-10 w-full rounded-2xl"
      />

      <div className="mt-10 space-y-10">
        {categoryOrder.map((cat) => {
          const items = grouped[cat];
          if (!items?.length) return null;
          return (
            <section key={cat}>
              <h2 className="text-2xl font-bold text-slate-900">{CATEGORY_LABEL[cat]}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {items.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/methods/${m.slug}/`}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                  >
                    <img
                      src={`https://calculatorsites.b-cdn.net/vo2max/methods/${m.slug}.jpg`}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-slate-900">{m.displayName}</h3>
                        <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ACCURACY_BADGE[m.accuracy]}`}>
                          {m.accuracy}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{m.description}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        {m.equipment} · ~{m.timeMinutes} min
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Which test should you pick?</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Runner, want the most accurate field result:</strong>{' '}
            <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
              Cooper 12-minute run
            </Link>{' '}
            or{' '}
            <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
              1.5-mile run
            </Link>
            .
          </li>
          <li>
            <strong>Non-runner or older adult:</strong>{' '}
            <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
              Rockport 1-mile walk
            </Link>
            .
          </li>
          <li>
            <strong>Access to a cycle ergometer:</strong>{' '}
            <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
              Åstrand-Rhyming cycle test
            </Link>{' '}
            — best submaximal option.
          </li>
          <li>
            <strong>Team sport / shuttle context:</strong>{' '}
            <Link href="/methods/beep-test/" className="text-teal-700 underline">
              Beep test (20m multi-stage)
            </Link>{' '}
            or{' '}
            <Link href="/methods/yo-yo-intermittent-recovery/" className="text-teal-700 underline">
              Yo-Yo IR1
            </Link>
            .
          </li>
          <li>
            <strong>No test available, just want an estimate:</strong>{' '}
            <Link href="/methods/non-exercise-estimator/" className="text-teal-700 underline">
              Non-exercise estimator
            </Link>
            .
          </li>
        </ul>
      </section>

      <RelatedLinks pageType="home" />
    </article>
      </>
  );
}
