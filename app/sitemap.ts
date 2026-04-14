import type { MetadataRoute } from 'next';
import { METHODS } from '@/lib/methods';
import { AGE_BRACKETS, bracketToDecadeSlug } from '@/lib/norms';
import { SITE_URL } from '@/lib/seo';

const NOW = new Date();

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

function entry(path: string, priority: number, changeFrequency: ChangeFrequency): MetadataRoute.Sitemap[number] {
  const url = `${SITE_URL}${path}`;
  return { url, lastModified: NOW, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticP0: Array<[string, number]> = [
    ['/', 1.0],
    ['/chart/', 0.9],
    ['/percentile-calculator/', 0.9],
    ['/by-age/', 0.9],
    ['/by-age/men/', 0.85],
    ['/by-age/women/', 0.85],
  ];

  const staticP1: Array<[string, number]> = [
    ['/good-vo2-max/', 0.8],
    ['/good-vo2-max/men/', 0.75],
    ['/good-vo2-max/women/', 0.75],
    ['/good-vo2-max/by-age/', 0.8],
    ['/methods/', 0.85],
    ['/improve/', 0.8],
    ['/wearables/', 0.75],
    ['/formula/', 0.7],
    ['/methodology/', 0.6],
    ['/about/', 0.5],
  ];

  const improveArticles = [
    '/improve/zone-2-training/',
    '/improve/norwegian-4x4/',
    '/improve/polarized-training/',
    '/improve/vo2-max-and-longevity/',
  ];

  const wearableArticles = [
    '/wearables/garmin-vo2-max-accuracy/',
    '/wearables/apple-watch-vo2-max/',
    '/wearables/whoop-vo2-max/',
  ];

  const methodPages = METHODS.map((m) => `/methods/${m.slug}/`);

  const decadePages = AGE_BRACKETS.map((b) => `/by-age/${bracketToDecadeSlug(b)}/`);

  const goodVo2ValuePages = Array.from({ length: 46 }, (_, i) => `/good-vo2-max/${25 + i}/`);

  return [
    ...staticP0.map(([p, pr]) => entry(p, pr, 'weekly')),
    ...staticP1.map(([p, pr]) => entry(p, pr, 'monthly')),
    ...methodPages.map((p) => entry(p, 0.75, 'monthly')),
    ...decadePages.map((p) => entry(p, 0.7, 'monthly')),
    ...improveArticles.map((p) => entry(p, 0.7, 'monthly')),
    ...wearableArticles.map((p) => entry(p, 0.65, 'monthly')),
    ...goodVo2ValuePages.map((p) => entry(p, 0.5, 'monthly')),
  ];
}
