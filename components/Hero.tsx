import type { ReactNode } from 'react';

interface HeroProps {
  /** Optional Bunny CDN image URL — when omitted the hero is a flat charcoal block. */
  bgImage?: string;
  /** Tiny uppercase label rendered in Oswald above the title (e.g., "REFERENCE"). */
  label?: string;
  /** Page title in white sans (rendered as h1). */
  title: ReactNode;
  /** Optional subtitle paragraph (max ~2 sentences). */
  subtitle?: ReactNode;
  /** Hero size — sm (smaller pages), md (default), lg (homepage). */
  size?: 'sm' | 'md' | 'lg';
  /** Override the default container width. */
  className?: string;
}

const SIZE_PADDING: Record<NonNullable<HeroProps['size']>, string> = {
  sm: 'py-10 sm:py-14',
  md: 'py-14 sm:py-20',
  lg: 'py-16 sm:py-24',
};

const SIZE_TITLE: Record<NonNullable<HeroProps['size']>, string> = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-3xl sm:text-5xl',
};

export function Hero({
  bgImage,
  label,
  title,
  subtitle,
  size = 'md',
  className = '',
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-charcoal ${className}`}
    >
      {bgImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
          aria-hidden
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal-deep/95 via-charcoal/80 to-charcoal/40"
        aria-hidden
      />
      <div className={`relative mx-auto max-w-6xl px-6 sm:px-12 ${SIZE_PADDING[size]}`}>
        {label ? (
          <div className="mb-3 font-nav text-xs font-medium uppercase tracking-[0.2em] text-brand-soft">
            {label}
          </div>
        ) : null}
        <h1
          className={`max-w-3xl font-bold tracking-tight text-white ${SIZE_TITLE[size]}`}
        >
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
