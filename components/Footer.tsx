import Link from 'next/link';

const FOOTER_LINKS = [
  {
    heading: 'Calculators',
    items: [
      { href: '/', label: 'VO2 Max Calculator' },
      { href: '/percentile-calculator/', label: 'Percentile Calculator' },
    ],
  },
  {
    heading: 'Reference',
    items: [
      { href: '/chart/', label: 'VO2 Max Chart' },
      { href: '/by-age/', label: 'By Age' },
      { href: '/by-age/men/', label: 'Men by Age' },
      { href: '/by-age/women/', label: 'Women by Age' },
      { href: '/good-vo2-max/', label: 'What Is Good?' },
      { href: '/good-vo2-max/by-age/', label: 'Good by Age' },
    ],
  },
  {
    heading: 'Methods',
    items: [
      { href: '/methods/', label: 'All 17 Methods' },
      { href: '/methods/cooper-12-minute-run/', label: 'Cooper 12-min' },
      { href: '/methods/1-5-mile-run/', label: '1.5-mile Run' },
      { href: '/methods/rockport-1-mile-walk/', label: 'Rockport Walk' },
      { href: '/methods/beep-test/', label: 'Beep Test' },
      { href: '/formula/', label: 'All Formulas' },
    ],
  },
  {
    heading: 'Training & About',
    items: [
      { href: '/improve/', label: 'How to Improve' },
      { href: '/wearables/', label: 'Wearables' },
      { href: '/methodology/', label: 'Methodology' },
      { href: '/about/', label: 'About' },
      { href: '/privacy/', label: 'Privacy Policy' },
      { href: '/terms/', label: 'Terms of Service' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-slate-900">{col.heading}</h4>
              <ul className="mt-2 space-y-1 text-sm">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-slate-600 hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} VO2 Max Calculator. Information on this site is for educational purposes and is not medical advice. Consult a physician before beginning an exercise program.
        </p>
      </div>
    </footer>
  );
}
