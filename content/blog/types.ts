import type { ReactNode } from 'react';
import type { FaqItem } from '@/components/Schema';

export type BlogTag = 'personal' | 'video' | 'research' | 'methodology' | 'training';

export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description, ~150–160 characters. */
  description: string;
  /** Shown on the blog hub card. Plain text. */
  excerpt: string;
  /** ISO date, e.g. "2026-04-24". */
  datePublished: string;
  dateModified?: string;
  tags: BlogTag[];
  /** Keyword list for <meta name="keywords">. */
  keywords?: string[];
  /** Optional override for the hero background image URL. */
  heroImage?: string;
  /** One-paragraph lead that opens the article (above the ad slot). */
  lead: ReactNode;
  /** Main body, rendered after the lead. */
  body: ReactNode;
  /** FAQs are appended and wired into FaqSchema. */
  faqs?: FaqItem[];
}

export type BlogPostMap = Record<string, BlogPost>;

export interface BlogTagInfo {
  tag: BlogTag;
  label: string;
  description: string;
}

export const ALL_TAGS: BlogTagInfo[] = [
  { tag: 'personal', label: 'Personal', description: 'First-hand experience and lab tests' },
  { tag: 'video', label: 'Video', description: 'Commentary on YouTube and podcast content' },
  { tag: 'research', label: 'Research', description: 'Study roundups and new findings' },
  { tag: 'methodology', label: 'Methodology', description: 'How the measurements and norms work' },
  { tag: 'training', label: 'Training', description: 'Putting the science into a plan' },
];

export const TAG_LABEL: Record<BlogTag, string> = Object.fromEntries(
  ALL_TAGS.map((t) => [t.tag, t.label]),
) as Record<BlogTag, string>;
