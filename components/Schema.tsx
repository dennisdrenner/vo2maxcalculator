const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VO2 Max Calculator',
        url: SITE_URL,
      }}
    />
  );
}

interface WebAppProps {
  name: string;
  description: string;
  url: string;
}

export function WebApplicationSchema({ name, description, url }: WebAppProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        description,
        url,
        applicationCategory: 'HealthApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }}
    />
  );
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author = 'VO2 Max Calculator Editorial',
}: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        datePublished,
        dateModified: dateModified || datePublished,
        author: { '@type': 'Organization', name: author },
        publisher: {
          '@type': 'Organization',
          name: 'VO2 Max Calculator',
          url: SITE_URL,
        },
        mainEntityOfPage: url,
      }}
    />
  );
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export interface HowToStep {
  name: string;
  text: string;
}

export function HowToSchema({
  name,
  steps,
  totalTime,
}: {
  name: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        totalTime,
        step: steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
