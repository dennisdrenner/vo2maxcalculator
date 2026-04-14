import type { ReactNode } from 'react';
import type { FaqItem } from '@/components/Schema';
import type { MethodSlug } from '@/lib/methods';

export interface MethodArticle {
  /** One-paragraph lead answer (GEO-optimized first 100 words). */
  lead: ReactNode;
  /** Full article body, rendered below the Calculator. */
  body: ReactNode;
  /** Appended below body; wired into FaqSchema + rendered as <dl>. */
  faqs: FaqItem[];
  /** Optional short description used in list cards / meta when overriding METHODS.description. */
  metaDescription?: string;
}

export type MethodArticleMap = Partial<Record<MethodSlug, MethodArticle>>;
