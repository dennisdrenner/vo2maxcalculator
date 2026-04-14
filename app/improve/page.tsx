import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How to Improve VO2 Max — Evidence-Based Training Guide',
  description:
    'Proven methods to increase VO2 max: zone 2 base training, Norwegian 4x4 intervals, polarized 80/20 programming. What works, how much, and how fast.',
  path: '/improve/',
  keywords: ['improve vo2 max', 'increase vo2 max', 'vo2 max training'],
});

const FAQS: FaqItem[] = [
  {
    question: 'How much can I improve my VO2 max?',
    answer:
      'Untrained adults typically see 15–20% gains in 8–12 weeks of structured aerobic training. Already-fit recreational athletes see 3–10% gains in 12 weeks. Elite athletes near genetic ceilings see 1–3% per year.',
  },
  {
    question: 'What type of training increases VO2 max fastest?',
    answer:
      'High-intensity intervals at 85–95% of HRmax — particularly Norwegian 4x4 (four 4-minute intervals) — produce the fastest VO2 max gains per hour of training. Studies show 5–10% improvements in 6–8 weeks with 2 HIIT sessions per week.',
  },
  {
    question: 'How often should I train for VO2 max?',
    answer:
      'Most research supports 3–5 sessions per week: 2–3 sessions of zone 2 (easy aerobic, 60–70% HRmax), 1–2 sessions of intervals, and 1 rest day. This "polarized" 80/20 split is standard in elite endurance programs.',
  },
  {
    question: 'Does strength training help VO2 max?',
    answer:
      "Directly, no — strength training alone doesn't meaningfully raise VO2 max. Indirectly, yes: it increases running economy and power, letting you sustain a higher percentage of your VO2 max for longer. Include 2 sessions per week.",
  },
  {
    question: 'How long until I see results?',
    answer:
      'Measurable VO2 max improvements appear in 4–6 weeks of consistent training. Peak response for most protocols is at 8–12 weeks. After that, further gains require progressive overload: longer intervals, higher volume, or added variety.',
  },
];

export default function ImproveHubPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Improve VO2 max', url: `${SITE_URL}/improve/` },
        ]}
      />
      <ArticleSchema
        headline="How to improve VO2 max"
        description="Evidence-based training methods to increase cardiorespiratory fitness."
        url={`${SITE_URL}/improve/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <div className="mb-8 overflow-hidden rounded-2xl">
        <img
          src="https://calculatorsites.b-cdn.net/vo2max/hero-improve.jpg"
          alt="Athletic person walking briskly uphill on a forest trail at sunrise"
          width={800}
          height={450}
          loading="eager"
          className="h-auto w-full"
        />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        How to Improve VO2 Max
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        VO2 max is highly trainable. Untrained adults typically gain <strong>15–20%</strong> in
        8–12 weeks of structured training; already-fit recreational athletes gain{' '}
        <strong>3–10%</strong>. The fastest gains come from combining low-intensity base training
        with high-intensity intervals — the "polarized" 80/20 model used by most elite endurance
        programs.
      </p>
      <p className="mt-3 text-slate-700">
        This guide is organized around four topics, each with its own full article:
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <ArticleCard
          href="/improve/zone-2-training/"
          title="Zone 2 training"
          hook="The aerobic base-building method used by every elite endurance athlete. 60–70% HRmax, 45–90 minutes, 2–3× per week."
        />
        <ArticleCard
          href="/improve/norwegian-4x4/"
          title="Norwegian 4x4 intervals"
          hook="The most VO2-max-effective interval protocol ever tested: 4 × 4 minutes at 85–95% HRmax with 3-minute recoveries."
        />
        <ArticleCard
          href="/improve/polarized-training/"
          title="Polarized (80/20) training"
          hook="Why elite endurance athletes spend ~80% of training at easy intensities and ~20% at hard intensities — and what that means for you."
        />
        <ArticleCard
          href="/improve/vo2-max-and-longevity/"
          title="VO2 max and longevity"
          hook="The evidence linking VO2 max to all-cause mortality. Why each MET gain is associated with 10–15% lower mortality risk."
        />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">The training principles that actually work</h2>
        <p className="mt-3 text-slate-700">
          Despite endless marketing of new methods, VO2 max training rests on three principles
          established in exercise physiology by the 1980s and confirmed in hundreds of
          randomized trials since:
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
          <li>
            <strong>Time at high percent-VO2 max drives adaptation.</strong> More minutes
            accumulated at 85–95% of VO2 max per week = more improvement. Intervals are
            efficient because they let you accumulate more total time at that intensity than
            continuous efforts.
          </li>
          <li>
            <strong>Low-intensity volume builds the aerobic base.</strong> Zone 2 training
            (60–70% HRmax) increases mitochondrial density, capillary network, and fat
            oxidation — all prerequisites for tolerating higher-intensity work.
          </li>
          <li>
            <strong>Recovery is where adaptation happens.</strong> VO2 max gains result from
            repeated cycles of overload and recovery. Two to three hard sessions per week is the
            durable sweet spot; more causes overreaching for most non-elite athletes.
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">What doesn't work (or barely works)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Only low-intensity training.</strong> 100% zone 2 produces modest VO2 max
            gains — continuous easy cardio alone rarely exceeds 5–8% improvement. You need some
            high-intensity stimulus.
          </li>
          <li>
            <strong>Only high-intensity training.</strong> All-HIIT programs burn out quickly and
            plateau after 6–8 weeks. Without an aerobic base you can't recover between
            high-intensity sessions.
          </li>
          <li>
            <strong>Altitude training for non-elites.</strong> "Live high, train low" helps elite
            athletes eke out 1–3% gains. For recreational athletes the return-on-effort is
            dominated by just training more consistently.
          </li>
          <li>
            <strong>Strength training alone.</strong> Lifting doesn't raise VO2 max directly.
            But 2 strength sessions per week alongside aerobic training improves running economy
            and delays fatigue — indirect but real.
          </li>
        </ul>
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

      <RelatedLinks pageType="improve" />
    </article>
  );
}

function ArticleCard({ href, title, hook }: { href: string; title: string; hook: string }) {
  return (
    <Link href={href} className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-500">
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{hook}</p>
      <span className="mt-3 inline-block text-sm font-semibold text-teal-700">Read →</span>
    </Link>
  );
}
