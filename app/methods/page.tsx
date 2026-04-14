import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
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
    <article className="mx-auto max-w-5xl px-4 py-10">
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

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        All 17 VO2 Max Test Methods
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Every field test we support, grouped by category. For most trained runners, the Cooper
        12-minute run or the 1.5-mile run are the most accurate. For non-runners, the Rockport
        walk or Åstrand cycle ergometer tests are the standard options. Non-exercise estimators
        are the least accurate but require no physical test.
      </p>

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
                    className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-500"
                  >
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
  );
}
