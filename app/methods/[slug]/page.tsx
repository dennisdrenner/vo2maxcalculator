import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calculator } from '@/components/Calculator';
import RelatedLinks from '@/components/RelatedLinks';
import { AdSlot } from '@/components/AdSlot';
import { Hero } from '@/components/Hero';
import { ArticleSchema, BreadcrumbSchema, FaqSchema } from '@/components/Schema';
import { METHODS, getMethod, type MethodSlug } from '@/lib/methods';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { METHOD_ARTICLES } from '@/content/methods';

type Params = { slug: string };

export function generateStaticParams() {
  return METHODS.map((m) => ({ slug: m.slug }));
}

function isValidSlug(slug: string): slug is MethodSlug {
  return METHODS.some((m) => m.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) return { title: 'Not found' };
  const method = getMethod(slug);
  const article = METHOD_ARTICLES[slug];
  return buildMetadata({
    title: `${method.displayName} VO2 Max Calculator — Formula, Protocol, Accuracy`,
    description:
      article?.metaDescription ??
      `${method.description} Free calculator with the exact formula, step-by-step protocol, accuracy data, and citation.`,
    path: `/methods/${slug}/`,
    keywords: [method.displayName.toLowerCase(), `${method.shortName} vo2 max`, 'vo2 max test'],
  });
}

const ACCURACY_LABEL: Record<'high' | 'moderate' | 'low', string> = {
  high: 'High (r ≈ 0.85–0.95 vs lab)',
  moderate: 'Moderate (r ≈ 0.70–0.85 vs lab)',
  low: 'Rough estimate (r < 0.70 vs lab)',
};

export default async function MethodPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!isValidSlug(slug)) notFound();
  const method = getMethod(slug);
  const article = METHOD_ARTICLES[slug];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Methods', url: `${SITE_URL}/methods/` },
          { name: method.displayName, url: `${SITE_URL}/methods/${slug}/` },
        ]}
      />
      <ArticleSchema
        headline={`${method.displayName}: VO2 Max Calculator and Protocol`}
        description={method.description}
        url={`${SITE_URL}/methods/${slug}/`}
        datePublished="2026-04-13"
      />
      {article?.faqs?.length ? <FaqSchema items={article.faqs} /> : null}

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-methods.jpg"
        label={`Method · ${method.category}`}
        title={`${method.displayName} VO2 Max Calculator`}
        subtitle={method.description}
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <div>
        {article?.lead ?? (
          <p className="text-lg text-slate-700">
            Enter your inputs below to calculate your VO2 max using the{' '}
            {method.displayName} formula.
          </p>
        )}
      </div>

      <dl className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Equipment</dt>
          <dd className="mt-0.5 text-sm text-slate-800">{method.equipment}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Time required</dt>
          <dd className="mt-0.5 text-sm text-slate-800">~{method.timeMinutes} minutes</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Accuracy</dt>
          <dd className="mt-0.5 text-sm text-slate-800">{ACCURACY_LABEL[method.accuracy]}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Category</dt>
          <dd className="mt-0.5 text-sm text-slate-800 capitalize">{method.category}</dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Calculate your VO2 max</h2>
        <div className="mt-4">
          <Calculator defaultMethod={slug} hideMethodSelector />
        </div>
      </section>

      <AdSlot slot="method-mid" className="my-10" />

      {article?.body ?? (
        <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          Extended article content for this method is not yet published. Use the calculator above —
          it is fully functional and uses the same formula that would appear in the article.
        </section>
      )}

      {article?.faqs?.length ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {article.faqs.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-slate-700">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Citation</h2>
        <p className="mt-2 text-sm text-slate-700">
          {method.citationUrl ? (
            <a
              href={method.citationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-700 hover:underline"
            >
              {method.citation} ↗
            </a>
          ) : (
            method.citation
          )}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Norms referenced on this page are from The Cooper Institute — see{' '}
          <Link href="/methodology/" className="text-teal-700 underline">
            methodology
          </Link>
          . For more studies and expert resources, see our{' '}
          <Link href="/resources/" className="text-teal-700 underline">
            resources page
          </Link>
          .
        </p>
      </section>

      <RelatedLinks pageType="method" methodSlug={slug} />
      </article>
    </>
  );
}
