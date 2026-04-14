/**
 * SEO metadata helpers. Every page calls `buildMetadata(...)` from its
 * `generateMetadata()` export so canonical URLs, OG tags, and Twitter cards
 * stay consistent across ~80 routes.
 */

import type { Metadata } from 'next';

export const SITE_URL = (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
export const SITE_NAME = 'VO2 Max Calculator';
export const DEFAULT_OG_IMAGE = '/og-default.png';

export interface BuildMetadataInput {
  title: string;
  description: string;
  /** Absolute path beginning with `/`, with trailing slash. */
  path: string;
  ogImage?: string;
  /** Set true for thin/programmatic pages you don't want in the index. */
  noindex?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
}

function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { title, description, path, ogImage, noindex, keywords, publishedTime, modifiedTime } = input;
  const url = absoluteUrl(path);
  const image = ogImage ? absoluteUrl(ogImage) : absoluteUrl(DEFAULT_OG_IMAGE);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    openGraph: {
      type: 'article',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Convenience for breadcrumb JSON-LD items used across pages. */
export function breadcrumbItems(trail: Array<{ name: string; path: string }>) {
  return trail.map((t, i) => ({
    position: i + 1,
    name: t.name,
    item: absoluteUrl(t.path),
  }));
}
