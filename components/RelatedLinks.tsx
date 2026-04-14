/**
 * RelatedLinks — curated internal link cluster per plan §3.2.
 *
 * Given a pageType and optional context, renders 4–6 links chosen to reinforce
 * topical authority and distribute PageRank toward conversion surfaces
 * (the calculator, percentile tool, chart).
 */

import Link from 'next/link';
import { METHODS, type MethodSlug } from '@/lib/methods';
import { AGE_BRACKETS, bracketToDecadeSlug, type AgeBracket } from '@/lib/norms';

type PageType =
  | 'method'
  | 'by-age-hub'
  | 'by-age-decade'
  | 'good-vo2-hub'
  | 'good-vo2-value'
  | 'improve'
  | 'wearable'
  | 'chart'
  | 'percentile'
  | 'home';

interface Props {
  pageType: PageType;
  methodSlug?: MethodSlug;
  ageBracket?: AgeBracket;
  vo2Value?: number;
}

interface Link {
  href: string;
  label: string;
  description?: string;
}

function buildLinks({ pageType, methodSlug, ageBracket, vo2Value }: Props): Link[] {
  switch (pageType) {
    case 'method': {
      const current = methodSlug ? METHODS.find((m) => m.slug === methodSlug) : null;
      const related = METHODS
        .filter((m) => m.slug !== methodSlug && (!current || m.category === current.category))
        .slice(0, 2);
      const fallback = METHODS
        .filter((m) => m.slug !== methodSlug && !related.includes(m))
        .slice(0, 2);
      const siblings = [...related, ...fallback].slice(0, 2);
      return [
        { href: '/chart/', label: 'VO2 max chart by age and sex', description: 'Full percentile tables' },
        { href: '/percentile-calculator/', label: 'Percentile calculator', description: 'See where your number ranks' },
        { href: '/by-age/', label: 'VO2 max norms by age', description: 'Decade-by-decade breakdown' },
        ...siblings.map((m) => ({
          href: `/methods/${m.slug}/`,
          label: `${m.displayName}`,
          description: m.shortName,
        })),
        { href: '/improve/', label: 'How to improve VO2 max', description: 'Evidence-based training' },
      ];
    }
    case 'by-age-decade': {
      const other = AGE_BRACKETS.filter((b) => b !== ageBracket).slice(0, 2);
      return [
        { href: '/', label: 'VO2 max calculator', description: 'Estimate yours in 2 minutes' },
        { href: '/percentile-calculator/', label: 'Percentile calculator' },
        { href: '/chart/', label: 'Full VO2 max chart' },
        { href: '/good-vo2-max/by-age/', label: 'What is a good VO2 max by age?' },
        ...other.map((b) => ({
          href: `/by-age/${bracketToDecadeSlug(b)}/`,
          label: `VO2 max norms for ${b}`,
        })),
      ];
    }
    case 'by-age-hub':
      return [
        { href: '/', label: 'VO2 max calculator' },
        { href: '/percentile-calculator/', label: 'Percentile calculator' },
        { href: '/chart/', label: 'Full VO2 max chart' },
        { href: '/good-vo2-max/by-age/', label: 'What is a good VO2 max by age?' },
      ];
    case 'good-vo2-value':
      return [
        { href: '/', label: 'Calculate your VO2 max', description: 'Pick a test, get your score' },
        { href: '/chart/', label: 'Full percentile chart' },
        { href: '/percentile-calculator/', label: 'Percentile calculator' },
        { href: '/improve/', label: 'How to improve VO2 max' },
        ...(vo2Value
          ? [
              { href: `/good-vo2-max/${vo2Value - 1}/`, label: `Is ${vo2Value - 1} a good VO2 max?` },
              { href: `/good-vo2-max/${vo2Value + 1}/`, label: `Is ${vo2Value + 1} a good VO2 max?` },
            ]
          : []),
      ].slice(0, 6);
    case 'good-vo2-hub':
      return [
        { href: '/', label: 'VO2 max calculator' },
        { href: '/chart/', label: 'Full VO2 max chart' },
        { href: '/percentile-calculator/', label: 'Percentile calculator' },
        { href: '/improve/', label: 'How to improve VO2 max' },
      ];
    case 'improve':
      return [
        { href: '/', label: 'Calculate your VO2 max' },
        { href: '/chart/', label: 'VO2 max percentile chart' },
        { href: '/improve/zone-2-training/', label: 'Zone 2 training guide' },
        { href: '/improve/norwegian-4x4/', label: 'Norwegian 4x4 intervals' },
        { href: '/improve/polarized-training/', label: 'Polarized training' },
        { href: '/improve/vo2-max-and-longevity/', label: 'VO2 max and longevity' },
      ];
    case 'wearable':
      return [
        { href: '/', label: 'Calculate your VO2 max (lab-style tests)' },
        { href: '/wearables/garmin-vo2-max-accuracy/', label: 'Garmin VO2 max accuracy' },
        { href: '/wearables/apple-watch-vo2-max/', label: 'Apple Watch VO2 max' },
        { href: '/wearables/whoop-vo2-max/', label: 'Whoop VO2 max' },
        { href: '/chart/', label: 'Full VO2 max chart' },
      ];
    case 'chart':
      return [
        { href: '/', label: 'VO2 max calculator' },
        { href: '/percentile-calculator/', label: 'Percentile calculator' },
        { href: '/by-age/', label: 'Norms by age decade' },
        { href: '/good-vo2-max/by-age/', label: 'What is a good VO2 max by age?' },
        { href: '/improve/', label: 'How to improve your score' },
      ];
    case 'percentile':
      return [
        { href: '/', label: 'VO2 max calculator' },
        { href: '/chart/', label: 'Full percentile chart' },
        { href: '/by-age/', label: 'Norms by age' },
        { href: '/improve/', label: 'Improve your VO2 max' },
      ];
    case 'home':
      return [
        { href: '/chart/', label: 'VO2 max chart' },
        { href: '/percentile-calculator/', label: 'Percentile calculator' },
        { href: '/by-age/', label: 'Norms by age' },
        { href: '/methods/', label: 'All 17 test methods' },
        { href: '/improve/', label: 'How to improve' },
      ];
  }
}

export default function RelatedLinks(props: Props) {
  const links = buildLinks(props).slice(0, 6);
  return (
    <nav aria-label="Related pages" className="my-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Related</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-lg bg-white p-3 ring-1 ring-slate-200 transition hover:ring-teal-500"
            >
              <span className="block font-medium text-teal-700">{l.label}</span>
              {l.description ? (
                <span className="mt-0.5 block text-sm text-slate-600">{l.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
