import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Polar VO2 Max (OwnIndex) — Accuracy, Method, and Limits',
  description:
    "Polar's OwnIndex VO2 max estimate uses a 5-minute resting heart rate test plus age, sex, height, weight, and self-rated activity. Accuracy: ±3.5 ml/kg/min vs. lab.",
  path: '/wearables/polar-vo2-max/',
  keywords: ['polar vo2 max', 'polar ownindex', 'polar fitness test', 'polar fitness test accuracy'],
});

const FAQS: FaqItem[] = [
  {
    question: 'How does Polar measure VO2 max?',
    answer:
      "Polar's Fitness Test (OwnIndex) is a non-exercise estimate. It uses a 5-minute resting heart rate measurement combined with your age, sex, height, weight, and self-reported activity level (categorized as Top, High, Moderate, Low, or Occasional). The algorithm fits these inputs to a regression equation derived from a Polar internal validation study published in Medicine & Science in Sports & Exercise.",
  },
  {
    question: 'How accurate is Polar OwnIndex compared to a lab test?',
    answer:
      "Polar's published validation reports a standard error of about ±3.5 ml/kg/min vs. laboratory treadmill VO2 max — comparable to a well-administered field test like the Cooper 12-minute run, and slightly more accurate than wrist-HR-only estimates from Apple Watch or Whoop. The biggest source of error is the self-reported activity input: athletes who under-report or over-report their training will get a biased estimate.",
  },
  {
    question: 'Why does my Polar Fitness Test result seem off?',
    answer:
      "Three common causes. First: the activity-level input has a large weighting in the algorithm, so a wrong selection can shift the result by 5–10 ml/kg/min. Second: the test must be done lying still, fully relaxed, after waking up — caffeine, stress, or recent exercise can elevate resting HR and depress the estimate. Third: the test uses your reported maximum HR; if you're using the 220-age estimate and yours is meaningfully different from typical, the result will be off.",
  },
  {
    question: 'Which Polar devices support the Fitness Test?',
    answer:
      'Most Polar chest-strap-paired wearables and HR monitors support OwnIndex, including the H10 strap with Polar Beat or Polar Flow, the Vantage V2 and V3, the Grit X series, the Pacer/Pacer Pro, and older models like the M430 and OH1. Polar Flow then logs your test history over time, which is useful for tracking trends rather than absolute values.',
  },
  {
    question: 'Does the Polar Fitness Test work without a chest strap?',
    answer:
      'Some newer Polar watches with optical wrist HR can run the test, but the published accuracy data is from chest-strap measurements. Wrist-HR resting measurements are noisier than chest-strap measurements, so expect somewhat larger error bars when running the test from the watch alone.',
  },
];

export default function PolarPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Wearables', url: `${SITE_URL}/wearables/` },
          { name: 'Polar', url: `${SITE_URL}/wearables/polar-vo2-max/` },
        ]}
      />
      <ArticleSchema
        headline="Polar VO2 Max (OwnIndex) — Accuracy, Method, and Limits"
        description="How Polar's Fitness Test estimates VO2 max, how accurate it is vs. lab, and how to interpret your number."
        url={`${SITE_URL}/wearables/polar-vo2-max/`}
        datePublished="2026-04-28"
      />
      <FaqSchema items={FAQS} />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-wearables.jpg"
        label="Wearables"
        title="Polar VO2 Max (OwnIndex)"
        subtitle="Polar's Fitness Test estimates VO2 max from a 5-minute resting HR measurement plus demographics. Here's the methodology, the accuracy data, and how to read your number."
      />

      <article className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-lg text-slate-700">
          Polar's OwnIndex was the first widely-deployed wearable VO2 max estimate, dating back to
          the late 1990s — predating Garmin's FirstBeat integration by more than a decade and
          predating Apple Watch's cardio fitness feature by twenty years. It's a non-exercise
          estimate: you don't have to run anything, just lie still for five minutes while the
          watch measures your resting heart rate variability.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">How the Polar Fitness Test works</h2>
          <p className="mt-3 text-slate-700">
            The protocol is short and protocol-sensitive. Lie down on your back, fully relaxed,
            in a quiet room. Wear a chest strap or HR-capable Polar watch. Start the Fitness
            Test in Polar Flow or Polar Beat. The device will measure heart rate and heart-rate
            variability for about five minutes, then output an OwnIndex value plus a fitness
            classification (Elite to Very Low) for your age and sex bracket.
          </p>
          <p className="mt-3 text-slate-700">
            The algorithm uses several inputs:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>Your <strong>resting heart rate</strong> (lower = higher predicted VO2 max)</li>
            <li>Your <strong>heart rate variability</strong> at rest (higher = higher predicted VO2 max)</li>
            <li>Your <strong>age, sex, height, weight</strong></li>
            <li>Your <strong>self-rated activity level</strong> (Top / High / Moderate / Low / Occasional) — this has surprisingly high weighting</li>
          </ul>
          <p className="mt-3 text-slate-700">
            The output is your estimated VO2 max in ml/kg/min, plus an OwnIndex score on Polar's
            internal scale. The two are essentially the same number for most adults.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">How accurate is OwnIndex?</h2>
          <p className="mt-3 text-slate-700">
            Polar's own validation study reports a standard error of estimate of about{' '}
            <strong>±3.5 ml/kg/min</strong> vs. laboratory treadmill VO2 max — meaning your
            OwnIndex value should typically land within 3–4 points of what a lab test would
            produce. That's a meaningful margin (a 4-point gap can shift you a full percentile
            band on the <Link href="/chart/" className="text-teal-700 underline">Cooper Institute chart</Link>),
            but it's better than the ~5–8 ml/kg/min error band typical of wrist-only HR estimates
            from Apple Watch and Whoop.
          </p>
          <p className="mt-3 text-slate-700">
            Independent validation has been more mixed. Studies in trained athletes and in
            certain age brackets have reported larger errors — particularly under-prediction in
            highly fit endurance athletes whose resting HR is in the 40s. The OwnIndex algorithm
            assumes a healthy population distribution; outliers at either end of the fitness
            spectrum get worse estimates.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">The activity-level question matters more than you think</h2>
          <p className="mt-3 text-slate-700">
            One quirk worth naming: the self-rated activity input changes your OwnIndex result
            by 5–10 ml/kg/min depending on the bucket you select. This is by design — the
            algorithm uses your stated training history as a prior on your aerobic capacity. But
            it means the test is partly self-reported. If you bump yourself from "Moderate" to
            "Top," your OwnIndex jumps without anything physiologically changing.
          </p>
          <p className="mt-3 text-slate-700">
            Polar's definitions are stricter than most users assume:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li><strong>Top:</strong> regular heavy training 5+ hr/week, competitive endurance level</li>
            <li><strong>High:</strong> 3+ hr/week of vigorous training, training for an event</li>
            <li><strong>Moderate:</strong> 1–3 hr/week of moderate-vigorous activity</li>
            <li><strong>Low:</strong> &lt;1 hr/week of structured exercise</li>
            <li><strong>Occasional:</strong> mostly sedentary, occasional walks</li>
          </ul>
          <p className="mt-3 text-slate-700">
            For tracking changes over time, set this once and don't change it — that way the
            longitudinal trend reflects real changes in your resting HR rather than reclassification.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">How OwnIndex compares to other wearables</h2>
          <p className="mt-3 text-slate-700">
            Quick benchmarks against what a lab CPET would tell you:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
            <li>
              <strong>Polar OwnIndex:</strong> ±3.5 ml/kg/min (with chest strap, correct activity rating)
            </li>
            <li>
              <strong><Link href="/wearables/garmin-vo2-max-accuracy/" className="text-teal-700 underline">Garmin (FirstBeat)</Link>:</strong> ±3 ml/kg/min with chest strap, ±5–7 with wrist HR only
            </li>
            <li>
              <strong><Link href="/wearables/apple-watch-vo2-max/" className="text-teal-700 underline">Apple Watch Cardio Fitness</Link>:</strong> ±4–8 ml/kg/min mean absolute error
            </li>
            <li>
              <strong><Link href="/wearables/whoop-vo2-max/" className="text-teal-700 underline">Whoop Aerobic Fitness</Link>:</strong> ±5–8 ml/kg/min, less accurate at the high end
            </li>
            <li>
              <strong>Field tests</strong> (Cooper 12-min, 1.5-mile run): r ≈ 0.85–0.90 vs. lab in trained populations
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">How to use OwnIndex usefully</h2>
          <p className="mt-3 text-slate-700">
            Three practical recommendations:
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700">
            <li>
              <strong>Standardize your test conditions.</strong> Same time of day (early morning is
              best, before caffeine), same posture (lying flat), same room. The 4-point error band
              shrinks substantially when conditions are consistent.
            </li>
            <li>
              <strong>Track the trend, not the absolute.</strong> Even with calibration error, the
              direction of change is informative. A consistent 4-week downward trend in resting HR
              and upward trend in OwnIndex means your training is working, regardless of the
              absolute number.
            </li>
            <li>
              <strong>Cross-check with a field test.</strong> Run the{' '}
              <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">Cooper 12-minute run</Link>{' '}
              or <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">Rockport 1-mile walk</Link>{' '}
              once or twice a year and compare. If the two estimates disagree by more than 5
              ml/kg/min, the field test is usually closer to truth.
            </li>
          </ol>
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

        <RelatedLinks pageType="wearable" />
      </article>
    </>
  );
}
