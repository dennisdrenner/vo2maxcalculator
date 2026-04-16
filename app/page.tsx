import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from '@/components/Calculator';
import RelatedLinks from '@/components/RelatedLinks';
import { FaqSchema, WebApplicationSchema, type FaqItem } from '@/components/Schema';
import { AdSlot } from '@/components/AdSlot';
import { Hero } from '@/components/Hero';
import { SectionLabel } from '@/components/SectionLabel';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'VO2 Max Calculator — Free Tool, 17 Test Methods',
  description:
    'Calculate your VO2 max with 17 validated field tests: Cooper 12-minute run, 1.5-mile run, Rockport walk, Åstrand cycle, Bruce treadmill, and more. Free, no signup. Get percentile, category, and training guidance.',
  path: '/',
  keywords: ['vo2 max calculator', 'vo2 max test', 'cardiovascular fitness', 'aerobic capacity'],
});

const FAQS: FaqItem[] = [
  {
    question: 'What is VO2 max?',
    answer:
      'VO2 max is the maximum volume of oxygen your body can use during intense exercise, measured in milliliters per kilogram of body weight per minute (ml/kg/min). It is the single most validated measure of cardiorespiratory fitness and a strong independent predictor of all-cause mortality.',
  },
  {
    question: 'How is VO2 max calculated?',
    answer:
      'Each field test uses a validated regression equation. For example, the Cooper 12-minute run uses VO2 max = (35.97 × miles) − 11.29. The Rockport 1-mile walk uses VO2 max = 132.853 − (0.0769 × weight in lb) − (0.3877 × age) + (6.315 × sex) − (3.2649 × walk time) − (0.1565 × final heart rate). This calculator implements 17 such equations from peer-reviewed literature.',
  },
  {
    question: 'What is a good VO2 max?',
    answer:
      'A good VO2 max depends on age and sex. For a 35-year-old man, 42 ml/kg/min is average (50th percentile) and 49 ml/kg/min is good (75th percentile). For a 35-year-old woman, 30 is average and 36 is good. See the full chart for every age bracket.',
  },
  {
    question: 'Which test is most accurate?',
    answer:
      'For running-trained individuals, the 1.5-mile run and Cooper 12-minute run are the most accurate field tests (r ≈ 0.90 against lab treadmill VO2 max). For non-runners, the Rockport 1-mile walk is preferred. The Åstrand-Rhyming cycle ergometer test is the best submaximal option and does not require running.',
  },
  {
    question: 'Is this calculator free?',
    answer:
      'Yes. All 17 calculators, the percentile tool, and every reference chart are free and require no signup. We support the site through Google AdSense ads and Amazon affiliate links for training equipment.',
  },
  {
    question: 'How often should I retest?',
    answer:
      'Every 4–8 weeks for trained athletes, every 8–12 weeks for recreational exercisers. VO2 max responds measurably to 6–8 weeks of consistent aerobic training, with typical gains of 5–20% in untrained individuals.',
  },
  {
    question: 'Does VO2 max change with age?',
    answer:
      'VO2 max typically declines about 10% per decade after age 30 in untrained adults, though consistent aerobic training slows this to roughly 5% per decade. Masters athletes in their 60s routinely test at levels above untrained 30-year-olds.',
  },
];

export default function HomePage() {
  return (
    <div>
      <WebApplicationSchema
        name="VO2 Max Calculator"
        description="Free VO2 max calculator with 17 validated field tests."
        url={SITE_URL + '/'}
      />
      <FaqSchema items={FAQS} />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-homepage.jpg"
        label="Free • No signup"
        title="VO2 Max Calculator"
        subtitle="Calculate your VO2 max in 2 minutes using any of 17 validated field tests. Get your percentile rank, fitness category, and an evidence-based plan to improve."
        size="lg"
      />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <Calculator />
      </section>

      <AdSlot slot="home-mid" className="mx-auto my-8 max-w-4xl px-4" />

      <section className="mx-auto max-w-4xl px-4 py-10">
        <SectionLabel>The Basics</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">What is VO2 max?</h2>
        <img
          src="https://calculatorsites.b-cdn.net/vo2max/inline-physiology.jpg"
          alt="Illustration of oxygen flowing from lungs through the heart and bloodstream to working muscles."
          width={800}
          height={450}
          loading="lazy"
          className="mt-4 w-full rounded-2xl md:float-right md:ml-6 md:mt-2 md:mb-2 md:w-80"
        />
        <p className="mt-4 text-slate-700">
          VO2 max — short for maximal oxygen uptake — is the highest rate at which your body can
          consume and use oxygen during exercise. It is expressed in milliliters of oxygen per
          kilogram of body weight per minute (ml/kg/min). Physiologically, it represents the ceiling
          of your aerobic energy system: how much oxygen your lungs can extract, your heart can
          pump, your blood can carry, and your muscles can use.
        </p>
        <p className="mt-4 text-slate-700">
          VO2 max is the most thoroughly validated measure of cardiorespiratory fitness in
          exercise physiology. It is also one of the strongest known predictors of all-cause
          mortality: a 2018 JAMA Network Open study following 122,007 adults found that each
          one-MET increase in treadmill performance was associated with a 12% reduction in
          mortality risk, with the fittest quintile showing a 5-fold survival advantage over the
          least fit.
        </p>
        <h3 className="mt-8 text-xl font-semibold text-slate-900">Why it matters</h3>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>Strongest single predictor of longevity among modifiable risk factors.</li>
          <li>Correlates with endurance performance across running, cycling, rowing, and skiing.</li>
          <li>Trackable over time — a direct signal of whether your training is working.</li>
          <li>Responsive to training: 5–20% gains in 6–12 weeks are typical in untrained adults.</li>
        </ul>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <SectionLabel>Walkthrough</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">How to use this calculator</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-slate-700">
            <li>
              <strong>Pick a test.</strong> The default is the Cooper 12-minute run. If you don't
              run, try the <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">Rockport 1-mile walk</Link>{' '}
              or <Link href="/methods/astrand-rhyming-cycle/" className="text-teal-700 underline">Åstrand-Rhyming cycle test</Link>.
            </li>
            <li>
              <strong>Enter your inputs.</strong> Age, sex, and test-specific measurements like
              distance covered, time, or heart rate.
            </li>
            <li>
              <strong>Read the result.</strong> Your VO2 max in ml/kg/min, your age- and
              sex-adjusted percentile, and your fitness category (Poor, Fair, Average, Good,
              Excellent, Superior).
            </li>
            <li>
              <strong>Compare and improve.</strong> See the <Link href="/chart/" className="text-teal-700 underline">full chart</Link>{' '}
              or jump to <Link href="/improve/" className="text-teal-700 underline">how to improve VO2 max</Link>.
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-charcoal py-14 text-white">
        <div className="mx-auto max-w-4xl px-4">
        <SectionLabel className="text-brand-soft">Methods</SectionLabel>
        <h2 className="mt-2 text-2xl font-bold text-white">The 17 test methods</h2>
        <p className="mt-3 text-slate-300">
          Each test uses a peer-reviewed regression equation validated against direct gas analysis.
          Running tests are the most accurate for runners; walking and cycling tests are preferred
          when running isn't practical.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <MethodGroup
            title="Running"
            items={[
              ['cooper-12-minute-run', 'Cooper 12-minute run'],
              ['1-5-mile-run', '1.5-mile run'],
              ['1-mile-run', '1-mile run (Kline)'],
              ['2-4-km-run', '2.4 km run'],
            ]}
          />
          <MethodGroup
            title="Walking"
            items={[
              ['rockport-1-mile-walk', 'Rockport 1-mile walk'],
              ['1-5-mile-walk', '1.5-mile walk'],
              ['6-minute-walk-test', '6-minute walk test'],
            ]}
          />
          <MethodGroup
            title="Cycling"
            items={[
              ['astrand-rhyming-cycle', 'Åstrand-Rhyming cycle'],
              ['ymca-cycle-ergometer', 'YMCA cycle ergometer'],
            ]}
          />
          <MethodGroup
            title="Step tests"
            items={[
              ['queens-college-step-test', "Queen's College step"],
              ['harvard-step-test', 'Harvard step test'],
              ['ymca-3-minute-step-test', 'YMCA 3-minute step'],
            ]}
          />
          <MethodGroup
            title="Shuttle & treadmill"
            items={[
              ['beep-test', 'Beep test (20m MST)'],
              ['yo-yo-intermittent-recovery', 'Yo-Yo IR1'],
              ['bruce-treadmill-protocol', 'Bruce treadmill protocol'],
            ]}
          />
          <MethodGroup
            title="No-exercise estimators"
            items={[
              ['resting-heart-rate', 'Resting heart rate'],
              ['non-exercise-estimator', 'Non-exercise (Jackson)'],
            ]}
          />
        </div>
        <div className="mt-6">
          <Link href="/methods/" className="text-sm font-semibold text-brand-soft underline">
            See all methods with accuracy, equipment, and time →
          </Link>
        </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Frequently asked questions</h2>
          <dl className="mt-6 space-y-6">
            {FAQS.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-slate-700">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4">
        <RelatedLinks pageType="home" />
      </div>
    </div>
  );
}

function MethodGroup({ title, items }: { title: string; items: Array<[string, string]> }) {
  return (
    <div className="rounded-2xl border border-charcoal-mid bg-charcoal-deep p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg">
      <h3 className="font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm">
        {items.map(([slug, label]) => (
          <li key={slug}>
            <Link href={`/methods/${slug}/`} className="text-slate-300 hover:text-brand-soft">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
