import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { BlogList } from '@/components/BlogList';
import { getAllPosts, getActiveTags } from '@/content/blog';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Blog — Training Science, Research, and Commentary',
  description:
    'Peer-reviewed research, training-science commentary, and first-hand lab test experience on VO2 max, cardiorespiratory fitness, and endurance training.',
  path: '/blog/',
  keywords: ['vo2 max blog', 'vo2 max research', 'vo2 max training articles', 'cardiorespiratory fitness articles'],
});

export default function BlogHubPage() {
  const posts = getAllPosts();
  const activeTags = getActiveTags();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Blog', url: `${SITE_URL}/blog/` },
        ]}
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-resources.jpg"
        label="Blog"
        title="VO2 Max Blog"
        subtitle="Research roundups, training-science commentary, video breakdowns, and first-hand lab test notes — updated regularly."
        size="sm"
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <BlogList posts={posts} activeTags={activeTags} />
      </section>
    </>
  );
}
