import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleSchema, BreadcrumbSchema, FaqSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { AdSlot } from '@/components/AdSlot';
import { getAllPosts, getPost, getPostSlugs } from '@/content/blog';
import { TAG_LABEL } from '@/content/blog/types';
import { buildMetadata, SITE_URL } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Not found' };

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified ?? post.datePublished,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const publishedLabel = new Date(post.datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Blog', url: `${SITE_URL}/blog/` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}/` },
        ]}
      />
      <ArticleSchema
        headline={post.title}
        description={post.description}
        url={`${SITE_URL}/blog/${post.slug}/`}
        datePublished={post.datePublished}
        dateModified={post.dateModified ?? post.datePublished}
      />
      {post.faqs?.length ? <FaqSchema items={post.faqs} /> : null}

      <Hero
        bgImage={post.heroImage ?? 'https://calculatorsites.b-cdn.net/vo2max/hero-resources.jpg'}
        label={post.tags.map((t) => TAG_LABEL[t]).join(' · ')}
        title={post.title}
        subtitle={post.excerpt}
      />

      <article className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <time dateTime={post.datePublished}>{publishedLabel}</time>
          <span aria-hidden="true">·</span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
              >
                {TAG_LABEL[t]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">{post.lead}</div>

        <AdSlot slot="blog-mid" className="my-10" />

        <div>{post.body}</div>

        {post.faqs?.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <dl className="mt-6 space-y-6">
              {post.faqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold text-slate-900">{f.question}</dt>
                  <dd className="mt-2 text-slate-700">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-14 border-t border-slate-200 pt-8">
            <h2 className="text-lg font-semibold text-slate-900">More on the blog</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}/`} className="text-teal-700 hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 text-sm text-slate-500">
          <Link href="/blog/" className="text-teal-700 hover:underline">
            ← All blog posts
          </Link>
        </p>
      </article>
    </>
  );
}
