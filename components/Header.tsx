'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Calculator' },
  { href: '/chart/', label: 'Chart' },
  { href: '/by-age/', label: 'By Age' },
  { href: '/percentile-calculator/', label: 'Percentile' },
  { href: '/good-vo2-max/', label: 'What is Good?' },
  { href: '/methods/', label: 'Methods' },
  { href: '/improve/', label: 'Improve' },
  { href: '/equipment/', label: 'Equipment' },
  { href: '/resources/', label: 'Resources' },
];

const NAV_LINK_BASE =
  'font-nav uppercase tracking-wider text-sm transition-colors duration-150';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever navigation changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-brand-fg">
          VO2 Max Calculator
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${NAV_LINK_BASE} block rounded-md px-3 py-2 ${
                      active
                        ? 'bg-brand-soft text-brand-fg'
                        : 'text-slate-700 hover:bg-brand-soft hover:text-brand-fg'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open ? (
        <>
          <div
            className="fixed inset-0 top-[65px] z-30 bg-slate-900/40 md:hidden"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="absolute left-0 right-0 top-full z-40 border-b border-slate-200 bg-white shadow-lg md:hidden"
            aria-label="Primary mobile"
          >
            <ul className="mx-auto max-w-6xl px-4 py-2">
              {NAV.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${NAV_LINK_BASE} block border-b border-slate-100 px-1 py-3 text-base active:bg-brand-soft ${
                        active ? 'text-brand-fg' : 'text-slate-700 hover:text-brand-fg'
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
