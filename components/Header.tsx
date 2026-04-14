import Link from 'next/link';

const NAV = [
  { href: '/', label: 'Calculator' },
  { href: '/chart/', label: 'Chart' },
  { href: '/by-age/', label: 'By Age' },
  { href: '/percentile-calculator/', label: 'Percentile' },
  { href: '/good-vo2-max/', label: 'What is Good?' },
  { href: '/methods/', label: 'Methods' },
  { href: '/improve/', label: 'Improve' },
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-brand-fg">
          VO2 Max Calculator
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-slate-700 hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
