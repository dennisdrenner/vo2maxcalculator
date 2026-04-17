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
      { href: '/equipment/', label: 'Equipment' },
      { href: '/resources/', label: 'Resources' },
      { href: '/methodology/', label: 'Methodology' },
      { href: '/about/', label: 'About' },
      { href: '/privacy/', label: 'Privacy Policy' },
      { href: '/terms/', label: 'Terms of Service' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-charcoal-deep bg-charcoal-deep text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-nav text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {col.heading}
              </h4>
              <ul className="mt-3 space-y-1.5 text-xs uppercase tracking-wide">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-slate-400 transition-colors hover:text-brand-soft">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-charcoal/60 pt-6 text-xs uppercase tracking-wide text-slate-500">
          © {new Date().getFullYear()} VO2 Max Calculator. Information on this site is for educational purposes and is not medical advice. Consult a physician before beginning an exercise program.
        </p>
      </div>
    </footer>
  );
}
