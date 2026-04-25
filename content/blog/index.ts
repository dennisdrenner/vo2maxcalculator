import type { BlogPost, BlogPostMap, BlogTag } from './types';
import vo2MaxStudies from './vo2-max-studies-every-runner-should-know';
import myCpetTest from './my-vo2-max-test-at-54';
import { loadMarkdownPosts } from './loadMarkdownPosts';

const TSX_POSTS: BlogPostMap = {
  [vo2MaxStudies.slug]: vo2MaxStudies,
  [myCpetTest.slug]: myCpetTest,
};

export const BLOG_POSTS: BlogPostMap = (() => {
  const map: BlogPostMap = { ...TSX_POSTS };
  for (const p of loadMarkdownPosts()) {
    if (!map[p.slug]) map[p.slug] = p;
  }
  return map;
})();

export function getAllPosts(): BlogPost[] {
  return Object.values(BLOG_POSTS).sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS[slug];
}

export function getPostSlugs(): string[] {
  return Object.keys(BLOG_POSTS);
}

export function getPostsByTag(tag: BlogTag): BlogPost[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getActiveTags(): BlogTag[] {
  const set = new Set<BlogTag>();
  for (const p of Object.values(BLOG_POSTS)) {
    for (const t of p.tags) set.add(t);
  }
  return Array.from(set);
}
