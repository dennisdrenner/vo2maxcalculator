import type { ReactNode } from 'react';

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`font-nav text-xs font-medium uppercase tracking-[0.2em] text-brand ${className}`}
    >
      {children}
    </div>
  );
}
