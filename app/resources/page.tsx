import type { Metadata } from 'next';
import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import { ArticleSchema, BreadcrumbSchema } from '@/components/Schema';
import { Hero } from '@/components/Hero';
import { buildMetadata, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Resources — Studies, Experts, and Videos on VO2 Max',
  description:
    'Curated VO2 max resources: foundational PubMed studies, expert podcasts (Peter Attia, Rhonda Patrick, Andrew Huberman), training videos, and recommended blogs.',
  path: '/resources/',
  keywords: [
    'vo2 max studies',
    'peter attia vo2 max',
    'rhonda patrick vo2 max',
    'nick norwitz',
    'andrew huberman vo2 max',
    'vo2 max pubmed',
  ],
});

interface Resource {
  label: string;
  href: string;
  blurb: string;
  source?: string;
}

const STUDIES: Resource[] = [
  {
    label: 'Cooper KH. A means of assessing maximal oxygen intake. JAMA. 1968',
    href: 'https://pubmed.ncbi.nlm.nih.gov/5694044/',
    blurb:
      'The founding paper. Dr. Kenneth Cooper validates the 12-minute run against lab-measured VO2 max in 115 U.S. Air Force airmen.',
    source: 'JAMA',
  },
  {
    label: 'Kline GM et al. Rockport 1-mile walk test. MSSE. 1987',
    href: 'https://pubmed.ncbi.nlm.nih.gov/3600239/',
    blurb:
      'Validation of the Rockport 1-mile walk in 343 adults 30–69. Correlation with lab VO2 max of r = 0.88; the reference for all walking-based tests today.',
    source: 'Medicine & Science in Sports & Exercise',
  },
  {
    label: 'George JD et al. 1-mile run/walk. MSSE. 1993',
    href: 'https://pubmed.ncbi.nlm.nih.gov/8455458/',
    blurb:
      'The George submaximal 1-mile test: VO2 max from time, heart rate, sex, and weight. Validation in 124 college-age adults.',
    source: 'Medicine & Science in Sports & Exercise',
  },
  {
    label: 'Helgerud J et al. Aerobic HIIT vs moderate training. MSSE. 2007',
    href: 'https://pubmed.ncbi.nlm.nih.gov/17414804/',
    blurb:
      'The Norwegian 4×4 protocol established. 4×4-min intervals at 85–95% HRmax produced 7.2% VO2 max gains vs. 0% for matched-volume lactate-threshold work.',
    source: 'Medicine & Science in Sports & Exercise',
  },
  {
    label: 'Wisløff U et al. HIIT in heart failure patients. Circulation. 2007',
    href: 'https://pubmed.ncbi.nlm.nih.gov/17576867/',
    blurb:
      'Post-MI patients gained +17.9% VO2 max after 12 weeks of 4×4 intervals — proof that high-intensity intervals are safe and effective even in compromised hearts.',
    source: 'Circulation',
  },
  {
    label: 'Howden EJ et al. Reversing cardiac effects of sedentary aging. Circulation. 2018',
    href: 'https://pubmed.ncbi.nlm.nih.gov/29311053/',
    blurb:
      "The Dallas trial. Two years of progressive exercise including 4×4 intervals in 53 sedentary middle-aged adults produced an 18% VO2 max gain and measurably reversed left-ventricular stiffness. Ben Levine's group at UT Southwestern.",
    source: 'Circulation',
  },
  {
    label: 'Mandsager K et al. Fitness and long-term mortality. JAMA Network Open. 2018',
    href: 'https://pubmed.ncbi.nlm.nih.gov/30646288/',
    blurb:
      '122,007 Cleveland Clinic patients. The fittest quintile had 80% lower all-cause mortality; there was no upper threshold of benefit. The most cited modern study on VO2 max and longevity.',
    source: 'JAMA Network Open',
  },
  {
    label: 'Kodama S et al. Cardiorespiratory fitness meta-analysis. JAMA. 2009',
    href: 'https://pubmed.ncbi.nlm.nih.gov/19454641/',
    blurb:
      '33 studies, 102,980 adults. Each 1-MET increase in fitness was associated with 13% lower all-cause mortality and 15% lower cardiovascular mortality. The foundational meta-analysis.',
    source: 'JAMA',
  },
  {
    label: 'Myers J et al. Exercise capacity and mortality. NEJM. 2002',
    href: 'https://pubmed.ncbi.nlm.nih.gov/11882703/',
    blurb:
      '6,213 men referred for treadmill testing. Exercise capacity (measured in METs) was the strongest mortality predictor — stronger than smoking, hypertension, or diabetes.',
    source: 'New England Journal of Medicine',
  },
  {
    label: 'Blair SN et al. Physical fitness and mortality. JAMA. 1989',
    href: 'https://pubmed.ncbi.nlm.nih.gov/2795824/',
    blurb:
      "The original large-cohort study. 13,344 adults followed 8 years at the Cooper Clinic in Dallas. The least-fit quintile had 3.4× higher all-cause mortality — the founding fitness-longevity signal.",
    source: 'JAMA',
  },
];

interface ExpertLink {
  href: string;
  label: string;
}

interface Expert {
  name: string;
  role: string;
  blurb: string;
  links: ExpertLink[];
}

const EXPERTS: Expert[] = [
  {
    name: 'Peter Attia, MD',
    role: 'Physician, longevity author (Outlive)',
    blurb:
      'Arguably the loudest advocate in mainstream media for VO2 max as a longevity metric. His podcast, The Drive, has multiple deep-dive episodes on cardiorespiratory fitness, zone 2 training, and interval prescription.',
    links: [
      { href: 'https://peterattiamd.com/', label: 'peterattiamd.com' },
      { href: 'https://peterattiamd.com/category/the-drive/', label: 'The Drive podcast' },
      { href: 'https://www.youtube.com/@PeterAttiaMD', label: 'YouTube' },
    ],
  },
  {
    name: 'Rhonda Patrick, PhD',
    role: 'Biomedical scientist, FoundMyFitness',
    blurb:
      'Specializes in synthesizing exercise-physiology research for general audiences. Her interviews with Martin Gibala on HIIT physiology and with Peter Attia on VO2 max are essential listening.',
    links: [
      { href: 'https://www.foundmyfitness.com/', label: 'FoundMyFitness' },
      { href: 'https://www.youtube.com/@FoundMyFitness', label: 'YouTube' },
      { href: 'https://x.com/foundmyfitness', label: 'X (Twitter)' },
    ],
  },
  {
    name: 'Nick Norwitz, PhD',
    role: 'Metabolic-health researcher (Harvard / Oxford)',
    blurb:
      'Focuses on metabolic health, low-carb physiology, and cardiovascular risk. His explainers cut through conflicting headlines on cholesterol, fitness, and mortality.',
    links: [
      { href: 'https://www.youtube.com/@NickNorwitzPhD', label: 'YouTube' },
      { href: 'https://x.com/nicknorwitz', label: 'X (Twitter)' },
    ],
  },
  {
    name: 'Benjamin Levine, MD',
    role: 'Cardiologist, UT Southwestern / The Cooper Institute',
    blurb:
      'Author of the landmark Howden et al. 2018 Dallas trial showing that consistent exercise including Norwegian 4×4 intervals can reverse cardiac stiffness in middle-aged sedentary adults. The most authoritative voice on exercise and the aging heart.',
    links: [
      {
        href: 'https://www.utsouthwestern.edu/education/medical-school/departments/internal-medicine/divisions/cardiology/faculty/benjamin-levine.html',
        label: 'UT Southwestern profile',
      },
      {
        href: 'https://www.youtube.com/results?search_query=benjamin+levine+cardiologist+exercise',
        label: 'YouTube talks',
      },
    ],
  },
  {
    name: 'Iñigo San Millán, PhD',
    role: 'Exercise physiologist, Team EF Education–EasyPost',
    blurb:
      'The authority on Zone 2 training. Coach to Tour de France winner Tadej Pogačar. His interviews with Peter Attia on mitochondrial adaptation are the clearest explanation of why low-intensity volume matters for high-intensity performance.',
    links: [
      {
        href: 'https://peterattiamd.com/inigosanmillan/',
        label: 'Peter Attia interview series',
      },
      { href: 'https://x.com/doctorisanmi', label: 'X (Twitter)' },
    ],
  },
  {
    name: 'Stacy Sims, PhD',
    role: "Women's exercise physiology researcher",
    blurb:
      "The leading voice on how female physiology differs from male physiology in exercise science. Essential reading for women evaluating VO2 max tests that were originally validated on male cohorts.",
    links: [
      { href: 'https://www.drstacysims.com/', label: 'drstacysims.com' },
      { href: 'https://www.instagram.com/drstacysims/', label: 'Instagram' },
      { href: 'https://www.youtube.com/@drstacysims', label: 'YouTube' },
    ],
  },
  {
    name: 'Andy Galpin, PhD',
    role: 'Exercise scientist, USC Human Performance Center',
    blurb:
      'Deep on the physiology of muscle, strength, and endurance combined. His podcast "Perform with Dr. Andy Galpin" mixes practical programming with rigorous science.',
    links: [
      { href: 'https://www.andygalpin.com/', label: 'andygalpin.com' },
      { href: 'https://www.youtube.com/@drandygalpin', label: 'YouTube' },
      { href: 'https://www.instagram.com/drandygalpin/', label: 'Instagram' },
    ],
  },
  {
    name: 'Andrew Huberman, PhD',
    role: 'Neuroscientist, Stanford; Huberman Lab podcast',
    blurb:
      'Huberman Lab has multiple episodes on fitness and longevity, including guest appearances by Andy Galpin, Peter Attia, and others. Good starting point for listeners new to exercise science.',
    links: [
      { href: 'https://www.hubermanlab.com/', label: 'hubermanlab.com' },
      { href: 'https://www.youtube.com/@hubermanlab', label: 'YouTube' },
      { href: 'https://www.instagram.com/hubermanlab/', label: 'Instagram' },
    ],
  },
];

const VIDEOS: Resource[] = [
  {
    label: 'Peter Attia: Why VO2 max is the single most important longevity marker',
    href: 'https://www.youtube.com/results?search_query=peter+attia+vo2+max+longevity',
    blurb:
      'A 10-minute overview of the Mandsager 2018 data and what it implies for training prescription. Probably the clearest mainstream explanation available.',
    source: 'YouTube',
  },
  {
    label: 'Rhonda Patrick × Martin Gibala on HIIT physiology',
    href: 'https://www.youtube.com/results?search_query=rhonda+patrick+martin+gibala+hiit',
    blurb:
      "Gibala (McMaster University) is the originator of much of the modern HIIT research. Patrick's interview is the best long-form explainer on why intervals work.",
    source: 'FoundMyFitness podcast',
  },
  {
    label: 'Global Triathlon Network: VO2 max testing explained',
    href: 'https://www.youtube.com/@gtn',
    blurb:
      'Practical videos on running the field tests (Cooper, 1.5-mile, etc.) in realistic conditions. Good for first-time testers who want to see the mechanics.',
    source: 'YouTube',
  },
  {
    label: 'Extramilest: Floris Gierman on zone 2 and MAF training',
    href: 'https://www.youtube.com/@Extramilest',
    blurb:
      'In-depth interviews with endurance athletes and coaches on Phil Maffetone\'s low-HR training method (closely related to zone 2).',
    source: 'YouTube',
  },
];

const BLOGS: Resource[] = [
  {
    label: 'Alex Hutchinson — Sweat Science at Outside',
    href: 'https://www.outsideonline.com/byline/alex-hutchinson/',
    blurb:
      'The best science journalism in endurance sports. Hutchinson (PhD in physics, elite distance runner) translates new studies into practical implications without sensationalism.',
    source: 'Outside magazine',
  },
  {
    label: 'iRunFar',
    href: 'https://www.irunfar.com/',
    blurb:
      'Endurance running science + race coverage. Training and recovery articles are consistently evidence-based.',
    source: 'iRunFar',
  },
  {
    label: 'TrainingPeaks Blog',
    href: 'https://www.trainingpeaks.com/blog/',
    blurb:
      'Practical periodization and interval programming content. Less academic than Sweat Science but strong on application.',
    source: 'TrainingPeaks',
  },
  {
    label: 'peterattiamd.com essays',
    href: 'https://peterattiamd.com/',
    blurb:
      'Long-form written companion pieces to The Drive podcast. The VO2 max and zone 2 essays are multi-thousand-word deep dives with extensive citations.',
    source: 'Peter Attia MD',
  },
];

const ORGS: Resource[] = [
  {
    label: 'The Cooper Institute',
    href: 'https://www.cooperinstitute.org/',
    blurb:
      'The source of the percentile norms used on this site. Ongoing research from the Aerobics Center Longitudinal Study (ACLS), the largest cardiorespiratory fitness dataset in the world.',
  },
  {
    label: 'American College of Sports Medicine (ACSM)',
    href: 'https://www.acsm.org/',
    blurb:
      'Publisher of the Guidelines for Exercise Testing and Prescription (now in its 11th edition) — the authoritative reference on exercise testing methodology.',
  },
  {
    label: 'American Heart Association — Exercise recommendations',
    href: 'https://www.heart.org/en/healthy-living/fitness',
    blurb:
      'Official AHA guidance on exercise for cardiovascular health, including the 150-minutes-per-week moderate or 75-minutes-per-week vigorous baseline.',
  },
];

function ExpertAvatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .replace(/,.*$/, '')
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('');
  const gradients = [
    'from-teal-600 to-teal-800',
    'from-slate-700 to-slate-900',
    'from-emerald-600 to-teal-800',
    'from-charcoal to-charcoal-deep',
  ];
  const g = gradients[index % gradients.length];
  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${g} font-nav text-xl font-bold uppercase tracking-wide text-white`}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function ExternalList({ items }: { items: Resource[] }) {
  return (
    <ul className="mt-4 space-y-5">
      {items.map((r) => (
        <li key={r.href}>
          <a
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-700 hover:underline"
          >
            {r.label} ↗
          </a>
          {r.source ? (
            <span className="ml-2 text-xs text-slate-500">({r.source})</span>
          ) : null}
          <p className="mt-1 text-sm text-slate-700">{r.blurb}</p>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Resources', url: `${SITE_URL}/resources/` },
        ]}
      />
      <ArticleSchema
        headline="Resources: Studies, Experts, and Videos on VO2 Max"
        description="Curated external resources on VO2 max — peer-reviewed studies, podcasts, YouTube channels, blogs, and organizations."
        url={`${SITE_URL}/resources/`}
        datePublished="2026-04-15"
      />

      <Hero
        bgImage="https://calculatorsites.b-cdn.net/vo2max/hero-resources.jpg"
        label="Further Reading"
        title="VO2 Max Resources"
        subtitle="Curated PubMed studies, expert podcasts, YouTube channels, and blogs for going deeper on the science."
      />

      <article className="mx-auto max-w-4xl px-4 py-10">
      <p className="mt-4 text-lg text-slate-700">
        A curated list of resources for readers who want to go deeper than what we cover on this
        site. Studies are linked to PubMed. Podcasts, YouTube channels, blogs, and organizations
        are linked to their canonical home pages. None of the links below are affiliate links —
        they're editorial picks, full stop.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Foundational studies (PubMed)</h2>
        <p className="mt-2 text-slate-700">
          The primary-literature basis for the calculators and norms on this site, plus the
          landmark epidemiology studies linking VO2 max to longevity.
        </p>
        <ExternalList items={STUDIES} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Experts and podcasts</h2>
        <p className="mt-2 text-slate-700">
          Researchers, physicians, and coaches whose work on VO2 max, cardiorespiratory fitness,
          and longevity is worth following.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {EXPERTS.map((e, i) => (
            <div
              key={e.name}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
            >
              <ExpertAvatar name={e.name} index={i} />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-900">{e.name}</h3>
                <p className="text-xs uppercase tracking-wide text-slate-500">{e.role}</p>
                <p className="mt-2 text-sm text-slate-700">{e.blurb}</p>
                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                  {e.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-700 hover:underline"
                      >
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">YouTube & video content</h2>
        <p className="mt-2 text-slate-700">
          Search-based links (rather than specific video URLs) so the results stay current when
          hosts upload new content.
        </p>
        <ExternalList items={VIDEOS} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Blogs & written resources</h2>
        <ExternalList items={BLOGS} />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Organizations</h2>
        <ExternalList items={ORGS} />
      </section>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Missing something?</h2>
        <p className="mt-2 text-sm text-slate-700">
          If there's a paper, podcast, or researcher we should add, email{' '}
          <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
            dennis@smartravenai.com
          </a>
          . This list is editorially curated, not comprehensive — the goal is quality over
          volume.
        </p>
      </section>

      <div className="mt-12">
        <Link href="/" className="text-sm font-semibold text-teal-700 hover:underline">
          ← Back to the calculator
        </Link>
      </div>

      <RelatedLinks pageType="home" />
    </article>
      </>
  );
}
