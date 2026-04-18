import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About VO2 Max Calculator',
  description:
    'About this site: who we are, why we built it, how it stays accurate, and how we make money (ads + affiliates, not data selling).',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'About', url: `${SITE_URL}/about/` },
        ]}
      />
      <ArticleSchema
        headline="About VO2 Max Calculator"
        description="Who we are and why we built this site."
        url={`${SITE_URL}/about/`}
        datePublished="2026-04-13"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-resources.jpg"
        label="About"
        title="About"
        subtitle="Who we are, why we built it, how we make money, and our editorial standards."
        size="sm"
      />

      <article className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-lg text-slate-700">
        VO2 Max Calculator is a free, independent reference site for estimating and interpreting
        cardiorespiratory fitness. We built it because most VO2 max calculators on the web
        implement a single formula, use outdated norms, or gate results behind email signups. Our
        goal is the opposite: every validated field test, the correct formula with a citation,
        the full percentile chart, and zero friction.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Who we are</h2>
        <p className="mt-3 text-slate-700">
          This site is built and maintained by <strong>Dennis Drenner</strong>, founder of{' '}
          <a href="https://smartravenai.com" className="text-teal-700 underline" target="_blank" rel="noopener noreferrer">
            Smart Raven AI
          </a>
          , based in Maryland. Dennis holds a degree in biology from the University of Maryland
          and works as a software developer. He is serious about fitness, has undergone lab-based
          CPET testing himself, and has spent years studying the exercise physiology literature
          behind VO2 max estimation. After being frustrated by the lack of comprehensive,
          transparent, and free VO2 max tools online, he built this site to provide the resource
          he wished existed.
        </p>
        <p className="mt-3 text-slate-700">
          All formulas are sourced from peer-reviewed exercise physiology literature and
          cross-checked against the original publications. The normative data comes from The Cooper
          Institute's Aerobics Center Longitudinal Study. While we strive for accuracy, this site
          is for educational and informational purposes only — it is not a substitute for
          professional medical advice, diagnosis, or treatment.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What's on the site</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            A <Link href="/" className="text-teal-700 underline">master calculator</Link> covering
            17 validated field tests — running, walking, cycling, step, shuttle, treadmill, and
            non-exercise estimators.
          </li>
          <li>
            The <Link href="/chart/" className="text-teal-700 underline">full percentile chart</Link>{' '}
            sourced from The Cooper Institute's Aerobics Center Longitudinal Study (80,000+ adults).
          </li>
          <li>
            A{' '}
            <Link href="/percentile-calculator/" className="text-teal-700 underline">
              percentile lookup tool
            </Link>{' '}
            — enter any VO2 max and see your exact rank.
          </li>
          <li>
            Age-bracket pages (20s through 70s) and sex-specific breakdowns.
          </li>
          <li>
            Training guides for{' '}
            <Link href="/improve/zone-2-training/" className="text-teal-700 underline">zone 2</Link>,{' '}
            <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">Norwegian 4×4</Link>,{' '}
            <Link href="/improve/polarized-training/" className="text-teal-700 underline">polarized training</Link>, and{' '}
            <Link href="/improve/vo2-max-and-longevity/" className="text-teal-700 underline">
              VO2 max as a longevity predictor
            </Link>
            .
          </li>
          <li>
            Wearable reviews comparing{' '}
            <Link href="/wearables/garmin-vo2-max-accuracy/" className="text-teal-700 underline">Garmin</Link>,{' '}
            <Link href="/wearables/apple-watch-vo2-max/" className="text-teal-700 underline">Apple Watch</Link>, and{' '}
            <Link href="/wearables/whoop-vo2-max/" className="text-teal-700 underline">Whoop</Link>{' '}
            against lab-measured VO2 max.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Editorial standards</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Formulas come from peer-reviewed sources.</strong> Every calculator cites the
            primary paper. If you find a discrepancy between our implementation and the original
            source, please report it.
          </li>
          <li>
            <strong>Norms come from The Cooper Institute.</strong> The same dataset used in
            ACSM's Guidelines for Exercise Testing and Prescription, 11th edition.
          </li>
          <li>
            <strong>Accuracy claims are sourced.</strong> Where we cite correlation or
            standard-error-of-estimate figures, we reference the underlying validation study.
          </li>
          <li>
            <strong>No medical advice.</strong> Everything on the site is educational. If you
            have a cardiovascular condition or are starting from a deconditioned state, consult a
            qualified clinician before undertaking maximal or high-intensity testing.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">How we make money</h2>
        <p className="mt-3 text-slate-700">
          The site is supported by two revenue sources:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Google AdSense.</strong> Contextual display ads. We never sell visitor data;
            ads are served by Google's standard network.
          </li>
          <li>
            <strong>Amazon affiliate links</strong> on wearable-review and equipment pages. If
            you buy something after clicking an affiliate link, we receive a small commission at
            no cost to you. We only link products we think are worth recommending on their
            merits; affiliate status never influences our accuracy claims or rankings.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          We do not sell, rent, or trade user data. We do not require signup to access calculators
          or content. An optional email list exists for people who want occasional training-science
          updates — it's purely opt-in.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Contact</h2>
        <p className="mt-3 text-slate-700">
          Spotted a bug, a broken formula, or an out-of-date citation? We want to hear about it.
          Email us at{' '}
          <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
            dennis@smartravenai.com
          </a>{' '}
          — we try to reply within a week.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-900">Medical disclaimer</h2>
        <p className="mt-2 text-sm text-amber-800">
          This site provides educational fitness information only. It is <strong>not a substitute
          for professional medical advice, diagnosis, or treatment</strong>. The VO2 max estimates
          produced by these calculators are approximations derived from field-test regression
          equations — they are not clinical measurements. Always consult a qualified healthcare
          provider before beginning any exercise program, especially if you have a cardiovascular
          condition, are pregnant, or are starting from a deconditioned state. Do not use this site
          to make medical decisions.
        </p>
      </section>

      <RelatedLinks pageType="home" />
      </article>
    </>
  );
}
