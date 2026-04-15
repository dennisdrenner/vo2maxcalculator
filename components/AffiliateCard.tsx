'use client';

import { AFFILIATES, type AffiliateKey } from '@/lib/affiliates';
import { analytics } from '@/lib/analytics';

interface AffiliateCardProps {
  product: AffiliateKey;
}

export function AffiliateCard({ product }: AffiliateCardProps) {
  const item = AFFILIATES[product];
  if (!item || !item.url) return null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={() => analytics.affiliateClick(product)}
      className="my-3 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
    >
      {item.image ? (
        <img
          src={item.image}
          alt=""
          width={96}
          height={96}
          loading="lazy"
          className="h-20 w-20 shrink-0 rounded-md object-cover sm:h-24 sm:w-24"
        />
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-slate-900">{item.label}</div>
        <div className="mt-0.5 text-sm text-slate-600">{item.blurb}</div>
        {item.price ? (
          <div className="mt-1 text-sm font-medium text-brand-fg">{item.price}</div>
        ) : null}
        <div className="mt-1 text-xs text-slate-400">Affiliate link</div>
      </div>
      <span className="shrink-0 self-start rounded-md bg-brand-soft px-3 py-1 text-sm font-medium text-brand-fg">
        View →
      </span>
    </a>
  );
}
