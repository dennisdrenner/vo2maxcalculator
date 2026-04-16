import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { AdSlot } from '@/components/AdSlot';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Polarized Training (80/20) — How Elite Endurance Athletes Train',
  description:
    'Polarized training: ~80% easy aerobic, ~20% high intensity, <5% moderate "tempo." The distribution used by elite endurance athletes and validated in dozens of RCTs.',
  path: '/improve/polarized-training/',
  keywords: ['polarized training', '80/20 training', 'endurance training'],
});

const FAQS: FaqItem[] = [
  {
    question: 'What is polarized training?',
    answer:
      'A training distribution that places roughly 80% of total volume at low intensity (zone 1–2, below the first lactate threshold) and about 20% at high intensity (zone 4–5, above the second lactate threshold), with minimal time in the "moderate" middle. Coined by sports scientist Stephen Seiler based on observational data from elite endurance athletes.',
  },
  {
    question: 'Why not just train at moderate intensity all the time?',
    answer:
      'Moderate-intensity continuous training ("threshold work") causes high central fatigue without providing enough high-intensity VO2 max stimulus. Polarized training separates these adaptations: easy sessions build the aerobic base without fatigue; hard sessions provide the top-end stimulus. The combination produces more improvement per week than moderate continuous training.',
  },
  {
    question: 'Is polarized the same as 80/20?',
    answer:
      '80/20 is the popular name. Technically, polarized means 80% easy / 20% hard with very little moderate. "80/20 running" popularized by Matt Fitzgerald uses the same principle with a slightly more generous moderate allowance. Both reference Seiler\'s original research on elite rowers, skiers, and distance runners.',
  },
  {
    question: 'How many hard sessions per week?',
    answer:
      'For recreational athletes: 2 sessions per week at high intensity (intervals or races). Elite athletes often do 2–3. Going above 3 for non-elites reliably produces overreaching within 4–6 weeks.',
  },
  {
    question: 'Does polarized training work for absolute beginners?',
    answer:
      'For the first 4–8 weeks of training, simply accumulating volume (mostly zone 1–2) produces large VO2 max gains without structured high-intensity work. After that base period, adding 1–2 high-intensity sessions per week (a polarized approach) continues progress.',
  },
];

export default function PolarizedPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Improve VO2 max', url: `${SITE_URL}/improve/` },
          { name: 'Polarized training', url: `${SITE_URL}/improve/polarized-training/` },
        ]}
      />
      <ArticleSchema
        headline="Polarized Training"
        description="The 80/20 distribution used by elite endurance athletes."
        url={`${SITE_URL}/improve/polarized-training/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-improve.jpg"
        label="Training"
        title="Polarized Training (80/20)"
        subtitle="How elite endurance athletes actually structure their week — ~80% easy, ~20% hard, almost no moderate."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        <strong>Polarized training</strong> places roughly <strong>80% of total training volume
        at low intensity</strong> (below the first lactate threshold, approximately zones 1–2)
        and about <strong>20% at high intensity</strong> (above the second lactate threshold,
        approximately zones 4–5), with minimal time in the moderate-intensity "tempo" zone. The
        distribution was first characterized by sports scientist Stephen Seiler in a 2010 review
        and has been confirmed across elite rowers, cross-country skiers, cyclists, and distance
        runners.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The three-zone model</h2>
        <p className="mt-3 text-slate-700">
          Polarized training divides exercise intensity into three zones anchored on two
          physiological thresholds:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Zone</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Intensity marker</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Polarized volume</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Zone 1 (easy)</th>
                <td className="border border-slate-200 px-3 py-2">Below LT1, lactate &lt;2 mmol/L, talk test passes</td>
                <td className="border border-slate-200 px-3 py-2">~80%</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Zone 2 (moderate)</th>
                <td className="border border-slate-200 px-3 py-2">Between LT1 and LT2, 2–4 mmol/L lactate</td>
                <td className="border border-slate-200 px-3 py-2">&lt;5%</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Zone 3 (hard)</th>
                <td className="border border-slate-200 px-3 py-2">Above LT2, &gt;4 mmol/L lactate, intervals territory</td>
                <td className="border border-slate-200 px-3 py-2">~20%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          Note: Seiler's "zone 2" (moderate threshold work) is a different zone than the
          "zone 2" used in the 5-zone Joe Friel / Coggan heart-rate model, where zone 2 refers
          to what Seiler calls zone 1 (low aerobic). Keep the frameworks separate to avoid
          confusion.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What the research shows</h2>
        <p className="mt-3 text-slate-700">
          Three randomized trials have directly compared polarized training to other
          distributions:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Stöggl & Sperlich 2014</strong> (Frontiers in Physiology): 48 well-trained
            endurance athletes randomized to polarized, threshold, HIIT, or high-volume training
            for 9 weeks. Polarized produced the largest VO2 max gain (+12%), compared to
            threshold (+3%), HIIT (+7%), and high-volume (+2%).
          </li>
          <li>
            <strong>Muñoz et al. 2014</strong> (Int J Sports Physiol Perform): Recreational
            runners training polarized (77% Z1 / 3% Z2 / 20% Z3) improved 10 km times by 7%
            over 10 weeks vs. 4% for threshold-focused training.
          </li>
          <li>
            <strong>Neal et al. 2013</strong> (J Appl Physiol): Cyclists alternating polarized
            and threshold training blocks improved more in VO2 max during the polarized block.
          </li>
        </ul>
      </section>

      <AdSlot slot="improve-article" className="my-10" />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Building a polarized week</h2>
        <p className="mt-3 text-slate-700">
          A sample polarized week for a recreational athlete with 6 hours of weekly volume:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Day</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Session</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Zone</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Mon</th><td className="border border-slate-200 px-3 py-2">60 min easy aerobic</td><td className="border border-slate-200 px-3 py-2">Z1</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Tue</th><td className="border border-slate-200 px-3 py-2">4×4 min @ 90% HRmax</td><td className="border border-slate-200 px-3 py-2">Z3</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Wed</th><td className="border border-slate-200 px-3 py-2">45 min easy</td><td className="border border-slate-200 px-3 py-2">Z1</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Thu</th><td className="border border-slate-200 px-3 py-2">Rest or walk</td><td className="border border-slate-200 px-3 py-2">—</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Fri</th><td className="border border-slate-200 px-3 py-2">6×3 min @ 92–95% HRmax</td><td className="border border-slate-200 px-3 py-2">Z3</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Sat</th><td className="border border-slate-200 px-3 py-2">Long run 90–120 min easy</td><td className="border border-slate-200 px-3 py-2">Z1</td></tr>
              <tr><th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Sun</th><td className="border border-slate-200 px-3 py-2">60 min easy</td><td className="border border-slate-200 px-3 py-2">Z1</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-700">
          Total: ~360 minutes. ~300 min easy (83%), ~60 min hard (17%), 0 min moderate — a
          cleanly polarized distribution.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The most common polarized-training mistake</h2>
        <p className="mt-3 text-slate-700">
          Most recreational athletes believe they are training polarized when they are actually
          training "pyramidal" or just "moderate all the time." Seiler's data on this is
          striking: when self-reported volumes of elite vs. recreational athletes are compared,
          elite athletes spend <em>more</em> time in zone 1 (easy) and about the same or more
          time in zone 3 (hard) — the difference is recreational athletes spend much more time
          in the moderate middle.
        </p>
        <p className="mt-3 text-slate-700">
          The fix: keep easy days actually easy (see{' '}
          <Link href="/improve/zone-2-training/" className="text-teal-700 underline">
            zone 2 training
          </Link>
          ) and make hard days actually hard (see{' '}
          <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">
            Norwegian 4×4
          </Link>
          ). No compromise in the middle.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">When polarized is not the right answer</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Peaking for a race.</strong> In the final 4–6 weeks before a goal race,
            many coaches shift to a pyramidal distribution (more moderate, less volume) to
            sharpen race-specific fitness.
          </li>
          <li>
            <strong>Very low training volume (under 3 hours/week).</strong> At low volumes the
            distinction matters less; even a single hard session per week produces meaningful VO2
            max gains.
          </li>
          <li>
            <strong>Time-constrained training.</strong> If you only have 90 minutes per week,
            the HIIT-heavy "SIT" (sprint interval training) approach produces VO2 max gains
            comparable to polarized at much lower volumes — worth considering when volume is not
            an option.
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
      </>
  );
}
