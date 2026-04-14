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
      className="my-3 block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-brand hover:shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900">{item.label}</div>
          <div className="mt-0.5 text-sm text-slate-600">{item.blurb}</div>
          {item.price ? (
            <div className="mt-1 text-sm font-medium text-brand-fg">{item.price}</div>
          ) : null}
        </div>
        <span className="shrink-0 rounded-md bg-brand-soft px-3 py-1 text-sm font-medium text-brand-fg">
          View →
        </span>
      </div>
      <div className="mt-2 text-xs text-slate-400">Affiliate link</div>
    </a>
  );
}
