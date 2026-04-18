'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slot, format = 'auto', responsive = true, className }: AdSlotProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

  useEffect(() => {
    if (!adsenseId || !adsEnabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silently ignore
    }
  }, [adsenseId, adsEnabled]);

  if (!adsenseId || !adsEnabled) {
    return null;
  }

  return (
    <div className={`my-6 ${className ?? ''}`}>
      <div className="mb-1 text-center text-[10px] uppercase tracking-wider text-slate-400">
        Advertisement
      </div>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', minHeight: 0 }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
