import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema, FaqSchema, type FaqItem } from '@/components/Schema';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Zone 2 Training for VO2 Max — What It Is, How to Do It',
  description:
    'Zone 2 training means 60–70% of max heart rate — the aerobic base used by every elite endurance athlete. Protocol, physiology, and weekly programming.',
  path: '/improve/zone-2-training/',
  keywords: ['zone 2 training', 'aerobic base', 'zone 2 heart rate', 'mitochondrial training'],
});

const FAQS: FaqItem[] = [
  {
    question: 'What heart rate is zone 2?',
    answer:
      'Zone 2 is typically 60–70% of maximum heart rate, or about 65–75% of HR reserve. For a 40-year-old with HRmax 180, that\'s roughly 108–126 bpm. The more precise definition is the highest intensity at which blood lactate remains at or near baseline (<2 mmol/L).',
  },
  {
    question: 'How long should zone 2 sessions be?',
    answer:
      'Minimum effective dose is 45 minutes; the diminishing-returns range is 60–120 minutes per session. Two to four sessions per week totaling 3–6 hours produces most of the available adaptation in 12 weeks.',
  },
  {
    question: "Why is zone 2 called the 'aerobic base'?",
    answer:
      'Zone 2 intensity maximally stimulates mitochondrial biogenesis, capillary density, and fat oxidation — the structural adaptations that let you sustain higher intensities later. It is the foundation on which interval performance is built.',
  },
  {
    question: 'Is zone 2 the same as MAF training?',
    answer:
      'Very similar. Phil Maffetone\'s "MAF 180" formula (180 − age) produces a heart rate in the upper half of zone 2 for most people. MAF is more conservative — stricter adherence to a slightly lower ceiling.',
  },
  {
    question: 'Can I do zone 2 on a bike instead of running?',
    answer:
      'Yes — the mitochondrial adaptations transfer reasonably well across modalities. Cycling is often preferable for high-volume base work because it is lower impact. The caveat: running economy is specific, so if your goal is running performance you still need running volume.',
  },
  {
    question: 'How do I know if I am in zone 2?',
    answer:
      'Three field tests: (1) the "talk test" — you can speak in full sentences but not sing; (2) nasal breathing is sustainable; (3) RPE 3–4 out of 10. For precision, use a chest-strap HR monitor and stay at 60–70% HRmax.',
  },
];

export default function Zone2Page() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Improve VO2 max', url: `${SITE_URL}/improve/` },
          { name: 'Zone 2 training', url: `${SITE_URL}/improve/zone-2-training/` },
        ]}
      />
      <ArticleSchema
        headline="Zone 2 Training for VO2 Max"
        description="What zone 2 is, why it works, and how to program it."
        url={`${SITE_URL}/improve/zone-2-training/`}
        datePublished="2026-04-13"
      />
      <FaqSchema items={FAQS} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Zone 2 Training for VO2 Max
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        <strong>Zone 2</strong> is steady aerobic exercise at <strong>60–70% of your maximum
        heart rate</strong> — roughly the top of the intensity range where blood lactate remains
        at or near resting levels (&lt;2 mmol/L). It is the backbone of every elite endurance
        training plan and the single most effective method for building the aerobic base that
        lets you tolerate higher-intensity work. Practically, zone 2 means pace at which you can
        hold a conversation in full sentences while breathing through your nose — not a stroll,
        but well short of breathless.
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Why zone 2 works: the physiology</h2>
        <p className="mt-3 text-slate-700">
          Zone 2 intensity is the sweet spot for three specific adaptations:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Mitochondrial biogenesis.</strong> Zone 2 volume increases the number and
            size of mitochondria in your slow-twitch muscle fibers. More mitochondria = more
            oxidative capacity = ability to produce ATP aerobically at higher power outputs.
          </li>
          <li>
            <strong>Capillary density.</strong> New capillaries grow around the trained muscle
            fibers, improving oxygen delivery and metabolic waste clearance.
          </li>
          <li>
            <strong>Fat oxidation.</strong> Zone 2 training shifts substrate utilization toward
            fat at any given power output, preserving glycogen for higher-intensity demands.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          These adaptations are the structural foundation for VO2 max. You can push the
          top-end stimulus (interval training) only as hard as your aerobic base will support.
          Elite athletes routinely do 80%+ of total volume at or below zone 2 for precisely this
          reason.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Defining your zone 2</h2>
        <p className="mt-3 text-slate-700">
          There are three common definitions:
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Method</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">How to set it</th>
                <th scope="col" className="border border-slate-200 bg-slate-50 px-3 py-2 text-left">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">% of HRmax</th>
                <td className="border border-slate-200 px-3 py-2">60–70% of (220 − age)</td>
                <td className="border border-slate-200 px-3 py-2">Rough — HRmax formula has ±10 bpm SD</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">% of HR reserve</th>
                <td className="border border-slate-200 px-3 py-2">65–75% of (HRmax − HRrest) + HRrest</td>
                <td className="border border-slate-200 px-3 py-2">Better — accounts for resting HR</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Lactate threshold 1</th>
                <td className="border border-slate-200 px-3 py-2">Highest intensity with blood lactate &lt;2 mmol/L</td>
                <td className="border border-slate-200 px-3 py-2">Gold standard — requires lab test</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">MAF 180</th>
                <td className="border border-slate-200 px-3 py-2">HR cap = 180 − age (minus adjustments)</td>
                <td className="border border-slate-200 px-3 py-2">Conservative — sits in upper zone 2</td>
              </tr>
              <tr>
                <th scope="row" className="border border-slate-200 px-3 py-2 text-left font-medium">Talk test</th>
                <td className="border border-slate-200 px-3 py-2">Full sentences, nasal breathing sustainable</td>
                <td className="border border-slate-200 px-3 py-2">Surprisingly accurate for most people</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Programming zone 2: the weekly template</h2>
        <p className="mt-3 text-slate-700">
          A practical weekly zone 2 base for a recreational endurance athlete:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li><strong>Monday:</strong> Zone 2, 60 min</li>
          <li><strong>Tuesday:</strong> High-intensity intervals (e.g., Norwegian 4×4)</li>
          <li><strong>Wednesday:</strong> Zone 2, 60 min</li>
          <li><strong>Thursday:</strong> Rest or easy walk</li>
          <li><strong>Friday:</strong> Zone 2, 45 min + strength</li>
          <li><strong>Saturday:</strong> Long zone 2, 90–120 min</li>
          <li><strong>Sunday:</strong> Rest</li>
        </ul>
        <p className="mt-3 text-slate-700">
          Total: ~5 hours zone 2 plus one interval session — a clean 80/20 polarized split. Most
          of the VO2 max adaptation comes from the zone 2 volume; the interval session adds the
          top-end stimulus.
        </p>
        <p className="mt-3 text-slate-700">
          For beginners: start with three 30-minute zone 2 sessions per week for the first 4
          weeks, then add duration before adding intensity.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>Going too hard.</strong> The most common zone 2 error by a wide margin. If
            you can't speak in full sentences, you are above zone 2. Many recreational athletes
            do their "easy" days at zone 3 (tempo pace), which blunts recovery and dilutes the
            mitochondrial stimulus.
          </li>
          <li>
            <strong>Sessions too short.</strong> Under 45 minutes, the mitochondrial adaptation
            signal is weak. Zone 2 is a volume game — long sessions matter.
          </li>
          <li>
            <strong>Skipping zone 2 when time is limited.</strong> When life gets busy, most
            athletes preserve intervals and drop zone 2. Research on polarized training suggests
            the opposite is better: keep the base, cut the intensity.
          </li>
          <li>
            <strong>Relying only on % HRmax.</strong> The 220 − age formula has a standard
            deviation of ~10 bpm. If your true HRmax is 175 but the formula says 185, your zone
            2 cap is off by 6 bpm.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">How zone 2 fits with VO2 max intervals</h2>
        <p className="mt-3 text-slate-700">
          Zone 2 and high-intensity intervals are complementary, not competing. Zone 2 builds
          the aerobic base that lets you do productive intervals; intervals apply the top-end
          stimulus that raises VO2 max. A polarized program combines both. See the{' '}
          <Link href="/improve/norwegian-4x4/" className="text-teal-700 underline">
            Norwegian 4×4 article
          </Link>{' '}
          for the most VO2-max-effective interval protocol, and the{' '}
          <Link href="/improve/polarized-training/" className="text-teal-700 underline">
            polarized training guide
          </Link>{' '}
          for how to structure both together.
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

      <RelatedLinks pageType="improve" />
    </article>
  );
}
