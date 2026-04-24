'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const NAV: NavItem[] = [
  { href: '/', label: 'Calculator' },
  { href: '/methods/', label: 'Tests' },
  { href: '/find-a-lab/', label: 'Find a Lab' },
  { href: '/blog/', label: 'Blog' },
  {
    href: '/chart/',
    label: 'Compare',
    children: [
      { href: '/chart/', label: 'Chart' },
      { href: '/by-age/', label: 'By Age' },
      { href: '/percentile-calculator/', label: 'Percentile' },
      { href: '/good-vo2-max/', label: 'What is Good?' },
    ],
  },
  {
    href: '/improve/',
    label: 'Improve',
    children: [
      { href: '/improve/', label: 'Training Guide' },
      { href: '/equipment/', label: 'Equipment' },
      { href: '/wearables/', label: 'Wearables' },
      { href: '/resources/', label: 'Resources' },
      { href: '/about/', label: 'About' },
    ],
  },
];

const NAV_LINK_BASE =
  'font-nav uppercase tracking-wider text-sm transition-colors duration-150';

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === '/' && pathname === '/') return true;
  if (item.href !== '/' && pathname.startsWith(item.href)) return true;
  if (item.children) {
    return item.children.some(
      (c) => c.href !== '/' && pathname.startsWith(c.href),
    );
  }
  return false;
}

function isChildActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href);
}

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="ml-1"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function DesktopDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const active = isActive(pathname, item);

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <li className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Link
        href={item.href}
        className={`${NAV_LINK_BASE} flex items-center rounded-md px-3 py-2 ${
          active
            ? 'bg-brand-soft text-brand-fg'
            : 'text-slate-700 hover:bg-brand-soft hover:text-brand-fg'
        }`}
      >
        {item.label}
        <ChevronDown />
      </Link>
      {open && item.children && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          {item.children.map((child) => {
            const childActive = isChildActive(pathname, child.href);
            return (
              <Link
                key={child.href}
                href={child.href}
                className={`${NAV_LINK_BASE} block px-4 py-2 text-xs ${
                  childActive
                    ? 'bg-brand-soft text-brand-fg'
                    : 'text-slate-700 hover:bg-brand-soft hover:text-brand-fg'
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <Link href="/" className="font-nav text-lg font-bold uppercase tracking-wider text-brand-fg">
          VO2 Max Calculator
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              if (item.children) {
                return (
                  <DesktopDropdown
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                );
              }
              const active = isActive(pathname, item);
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
                if (!item.children) {
                  const active = isActive(pathname, item);
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
                }
                return (
                  <li key={item.href} className="border-b border-slate-100 py-3">
                    <span className="font-nav text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      {item.label}
                    </span>
                    <ul className="mt-2 space-y-1 pl-3">
                      {item.children.map((child) => {
                        const childActive = isChildActive(pathname, child.href);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`${NAV_LINK_BASE} block py-2 text-base active:bg-brand-soft ${
                                childActive ? 'text-brand-fg' : 'text-slate-700 hover:text-brand-fg'
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
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
