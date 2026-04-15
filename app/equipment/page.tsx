import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { AffiliateCard } from '@/components/AffiliateCard';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Equipment for VO2 Max Testing — Recommended Gear',
  description:
    'The chest straps, running watches, and step platforms that matter for VO2 max testing. Evidence-based picks, honest limits. Polar H10, Garmin Forerunner 265/965, Apple Watch Ultra 2, Reebok step.',
  path: '/equipment/',
  keywords: [
    'best chest strap vo2 max',
    'best running watch vo2 max',
    'equipment for step test',
    'vo2 max testing gear',
    'polar h10 review',
  ],
});

const FAQS: FaqItem[] = [
  {
    question: 'Do I really need a chest strap?',
    answer:
      "If you're using a test that requires heart rate input (Rockport walk, 1-mile run, Åstrand cycle, YMCA cycle, step tests), yes. Wrist optical HR can err 5–15 bpm at exercise intensity, and every 10 bpm of HR error shifts VO2 max estimate by ~1.5 ml/kg/min. For running-only tests (Cooper, 1.5-mile run, beep test), no chest strap is needed.",
  },
  {
    question: 'Is Apple Watch accurate enough for VO2 max?',
    answer:
      'Apple Watch Cardio Fitness is accurate to about ±6 ml/kg/min vs. laboratory tests. Useful for trend tracking; less reliable for a single precise reading. Garmin paired with a chest strap is ~3 ml/kg/min more accurate at equivalent intensities.',
  },
  {
    question: 'Garmin FR265 vs FR965 — which should I get?',
    answer:
      'The FR265 is the best value for most runners — AMOLED display, full VO2 max and training-status suite, about 13-day battery. The FR965 adds multi-band GPS, built-in maps, titanium bezel, and 23-day battery for serious triathletes and ultra-endurance users. If you never plan to race longer than a marathon, the FR265 is plenty.',
  },
  {
    question: 'Can I use a Peloton for the Åstrand cycle test?',
    answer:
      'Only if the bike displays calibrated watts (not just "resistance level"). Newer Peloton Bike+ and most commercial gym ergometers display true power; older spin bikes typically do not. Without calibrated watts, cycle tests produce garbage estimates.',
  },
  {
    question: 'What step height do I need for the YMCA test?',
    answer:
      '12 inches (30 cm). A standard step-aerobics platform with risers adjusts to that height. The Queens College test uses 16.25" and the Harvard test uses 20" — both taller than most aerobic steps; for those, a sturdy plyo box is the usual substitute.',
  },
  {
    question: "What gear do I not need?",
    answer:
      "Lactate meters, smart scales with body-composition sensors, \"VO2 max training\" apps, and most subscription wearables add little or nothing to a home VO2 max assessment. A chest strap + a watch that displays HR and pace is 95% of what matters.",
  },
];

export default function EquipmentPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Equipment', url: `${SITE_URL}/equipment/` },
        ]}
      />
      <ArticleSchema
        headline="Equipment for VO2 Max Testing"
        description="Recommended chest straps, running watches, and step platforms for accurate VO2 max field testing."
        url={`${SITE_URL}/equipment/`}
        datePublished="2026-04-14"
      />
      <FaqSchema items={FAQS} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Equipment for VO2 Max Testing
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Most VO2 max field tests need two things: a reliable <strong>heart rate monitor</strong>{' '}
        and either a <strong>measured running course</strong> or a{' '}
        <strong>calibrated piece of equipment</strong> (cycle ergometer, step platform, treadmill).
        This page lists the exact gear we recommend for each test — what actually improves
        accuracy vs. what's marketing.
      </p>
      <p className="mt-2 text-sm text-slate-600">
        As an Amazon Associate we earn from qualifying purchases — clicking an affiliate link
        doesn't change the price you pay. See our{' '}
        <Link href="/about/" className="text-teal-700 underline">
          editorial standards
        </Link>{' '}
        for how we pick these.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Heart rate monitors</h2>
        <p className="mt-3 text-slate-700">
          The single highest-impact upgrade for VO2 max field testing. Chest straps are
          accurate to within ±1 bpm at all exercise intensities; wrist optical sensors can err
          by 5–15 bpm, especially during high-intensity running. Tests with a heart-rate input
          term in the formula (Rockport walk, 1-mile George, Åstrand cycle, YMCA cycle,
          step tests) inherit that HR error directly — ~1.5 ml/kg/min per 10 bpm.
        </p>
        <div className="mt-4">
          <AffiliateCard product="polarH10" />
        </div>
        <p className="mt-3 text-slate-700 text-sm">
          The Polar H10 is the reference chest strap in most published exercise-physiology
          validation studies. If you own any fitness watch and want to upgrade one thing,
          this is it.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Running watches</h2>
        <p className="mt-3 text-slate-700">
          A GPS running watch lets you retest VO2 max passively every time you run — the
          algorithm re-estimates from pace + HR data. All three watches below produce VO2 max
          estimates within 3–6 ml/kg/min of lab values when paired with a chest strap. See our{' '}
          <Link href="/wearables/" className="text-teal-700 underline">
            wearables reviews
          </Link>{' '}
          for the accuracy data.
        </p>
        <div className="mt-4">
          <AffiliateCard product="garminFr265" />
          <AffiliateCard product="garminFr965" />
          <AffiliateCard product="appleWatchUltra" />
        </div>
        <p className="mt-3 text-slate-700 text-sm">
          Our pick for most runners: <strong>Garmin Forerunner 265</strong>. Full FirstBeat VO2
          max + training-status metrics, AMOLED display, ~13-day battery. The FR965 adds maps
          and titanium for serious triathletes. Apple Watch Ultra 2 is the right pick if you
          already live in the Apple ecosystem.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Step platforms</h2>
        <p className="mt-3 text-slate-700">
          Step-based tests (YMCA 3-minute, Queens College, Harvard) use recovery HR on a
          specific bench height. Each test uses a different height:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-slate-700">
          <li>
            <Link href="/methods/ymca-3-minute-step-test/" className="text-teal-700 underline">
              YMCA 3-minute step test
            </Link>{' '}
            — 12" (30 cm)
          </li>
          <li>
            <Link href="/methods/queens-college-step-test/" className="text-teal-700 underline">
              Queens College step test
            </Link>{' '}
            — 16.25" (41 cm)
          </li>
          <li>
            <Link href="/methods/harvard-step-test/" className="text-teal-700 underline">
              Harvard step test
            </Link>{' '}
            — 20" (50 cm)
          </li>
        </ul>
        <div className="mt-4">
          <AffiliateCard product="stepBench" />
        </div>
        <p className="mt-3 text-slate-700 text-sm">
          A standard adjustable aerobic step covers the YMCA test comfortably. For Queens
          College and Harvard, most testers use a plyo box instead — aerobic steps typically
          top out at 10–12".
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Cycle ergometers</h2>
        <p className="mt-3 text-slate-700">
          We don't recommend a specific consumer bike — the requirement is simpler than the
          purchase decision. For the{' '}
          <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">
            Åstrand-Rhyming
          </Link>{' '}
          and{' '}
          <Link href="/methods/ymca-cycle-ergometer/" className="text-teal-700 underline">
            YMCA multistage cycle
          </Link>{' '}
          tests, you need a bike that displays <strong>calibrated watts</strong> (not just
          an arbitrary "resistance level"). Any commercial gym bike, most Peloton Bike+ models,
          and any ergometer certified to ISO 20957 will work.
        </p>
        <p className="mt-3 text-slate-700">
          Dedicated home ergometers (Wahoo Kickr Core, Saris M2, Concept2 BikeErg) all display
          true watts and work perfectly. A standard spin bike without a power meter does not.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What you don't need</h2>
        <p className="mt-3 text-slate-700">
          The VO2 max industry is full of well-marketed gear that adds little or nothing to a
          home assessment:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Lactate meters</strong> — useful for elite-level lactate-threshold
            training; irrelevant to VO2 max field tests.
          </li>
          <li>
            <strong>Portable gas analyzers</strong> (K5, VO2 Master) — genuinely measure VO2
            max directly, but at $5,000–$25,000 they're lab equipment, not consumer gear.
          </li>
          <li>
            <strong>Body-composition scales</strong> — don't help VO2 max estimation
            (though they're fine for general fitness tracking).
          </li>
          <li>
            <strong>"VO2 max training" subscription apps</strong> — most just wrap zone 2 and
            interval programming around HR data you already have. The underlying methods are
            the same things we cover in{' '}
            <Link href="/improve/" className="text-teal-700 underline">
              our training guides
            </Link>
            .
          </li>
          <li>
            <strong>HRV rings (Oura, Whoop)</strong> — informative for recovery, but their VO2
            max estimates are less accurate than a running watch + chest strap combination.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Our typical recommendation</h2>
        <p className="mt-3 text-slate-700">
          If you want to build a home VO2 max testing setup without overbuying, the minimum
          effective kit is:
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
          <li>
            <strong>A chest-strap HR monitor</strong> (Polar H10) — <em>mandatory for
            accurate HR-dependent tests</em>.
          </li>
          <li>
            <strong>A GPS running watch</strong> (Garmin FR265 or Apple Watch Ultra 2) — for
            passive ongoing tracking plus pace/distance for running tests.
          </li>
          <li>
            <strong>Optional:</strong> an adjustable step platform if you plan to do step
            tests at home.
          </li>
        </ol>
        <p className="mt-3 text-slate-700">
          Everything else on this page is incremental — nice to have for specific tests, not
          needed for a baseline home program.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <dl className="mt-6 space-y-6">
          {FAQS.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-slate-900">{f.question}</dt>
              <dd className="mt-2 text-slate-700">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <RelatedLinks pageType="home" />
    </article>
  );
}
