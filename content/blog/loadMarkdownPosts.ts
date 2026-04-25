import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost, BlogTag } from './types';

interface PostMeta {
  tags: BlogTag[];
  /** Filename in `https://calculatorsites.b-cdn.net/vo2max/blog/<file>` (jpg) */
  heroImage?: string;
  /** Override the default 2026-04-25 datePublished if needed. */
  datePublished?: string;
}

/**
 * One row per markdown post. Slug here MUST match the slug in the .md frontmatter.
 * heroImage is set after image generation; until then, posts inherit the blog
 * fallback hero from the page template.
 */
const POST_META: Record<string, PostMeta> = {
  'vo2max-predicts-lifespan': { tags: ['research'] },
  '10-second-sprints-vo2max': { tags: ['training', 'research'] },
  'couch-to-top-25-percent-vo2max': { tags: ['training'] },
  'vo2max-at-80-masters-athletes': { tags: ['research'] },
  'experts-agree-disagree-vo2max': { tags: ['methodology'] },
  'andrew-huberman-vo2max': { tags: ['video'] },
  'andy-galpin-vo2max-training': { tags: ['video'] },
  'inigo-san-millan-zone-2': { tags: ['video'] },
  'rhonda-patrick-vo2max-tabata': { tags: ['video'] },
  'zone-2-vs-hiit-debate': { tags: ['methodology'] },
  'vo2max-non-responders-cardio': { tags: ['research'] },
  '10-minute-vo2max-workout': { tags: ['training'] },
  'vo2max-and-weight-training': { tags: ['training'] },
  'norwegian-training-method-vo2max': { tags: ['training'] },
  'test-vo2max-at-home': { tags: ['methodology'] },
  'vo2max-after-40': { tags: ['training'] },
  'lactate-not-the-enemy': { tags: ['research'] },
  'vo2max-brain-health-bdnf': { tags: ['research'] },
  'exercise-snacks-vo2max': { tags: ['training'] },
  'insulin-resistance-vo2max': { tags: ['research'] },
};

const DEFAULT_DATE = '2026-04-25';
const POSTS_DIR = path.join(process.cwd(), 'content', 'blog', 'posts');
const HERO_BASE = 'https://calculatorsites.b-cdn.net/vo2max/blog';

/**
 * Strip the leading H1 (the markdown body restates the frontmatter title) and
 * the trailing "Suggested Image Prompts" section (authoring artifact, not for
 * publication). Then split off the first paragraph as the article lead.
 */
function splitBody(rawBody: string): { lead: string; body: string } {
  let text = rawBody.replace(/^\s*#\s+.*$/m, '').trim();
  const promptIdx = text.search(/\n---\s*\n##\s+Suggested Image Prompts/i);
  if (promptIdx >= 0) text = text.slice(0, promptIdx).trim();

  const firstBlankLine = text.search(/\n\s*\n/);
  if (firstBlankLine === -1) return { lead: text, body: '' };

  const lead = text.slice(0, firstBlankLine).trim();
  const body = text.slice(firstBlankLine).trim();
  return { lead, body };
}

export function loadMarkdownPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    const slug: string | undefined = data.slug;
    const title: string | undefined = data.title;
    const description: string | undefined = data.meta_description ?? data.description;
    if (!slug || !title || !description) {
      console.warn(`[blog] skipping ${file}: missing slug/title/meta_description`);
      continue;
    }

    const meta = POST_META[slug];
    if (!meta) {
      console.warn(`[blog] no POST_META entry for ${slug} — skipping`);
      continue;
    }

    const { lead, body } = splitBody(content);
    const excerpt = lead.replace(/[*_`#>]/g, '').slice(0, 200);
    const heroImage = meta.heroImage ? `${HERO_BASE}/${meta.heroImage}` : undefined;

    posts.push({
      slug,
      title,
      description,
      excerpt,
      datePublished: meta.datePublished ?? DEFAULT_DATE,
      tags: meta.tags,
      heroImage,
      keywords: undefined,
      lead: null,
      bodyMarkdown: `${lead}\n\n${body}`.trim(),
    });
  }

  return posts;
}
