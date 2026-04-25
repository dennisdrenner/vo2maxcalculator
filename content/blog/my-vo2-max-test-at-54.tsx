import Link from 'next/link';
import type { BlogPost } from './types';

const post: BlogPost = {
  slug: 'my-vo2-max-test-at-54',
  title: 'My VO2 Max Test at 54: Reading a Real CPET Report Section by Section',
  description:
    "A walkthrough of my own lab CPET report at age 54: 46 ml/kg/min VO2 max, what the ventilatory thresholds meant, and what the cardiologist prescribed.",
  excerpt:
    "I spend most of my working hours on this site explaining how VO2 max tests work. It felt overdue to actually take one. Here is what the five-page report said.",
  datePublished: '2026-04-24',
  tags: ['personal', 'methodology'],
  heroImage: 'https://calculatorsites.b-cdn.net/vo2max/me%20in%20race%202.jpg',
  keywords: [
    'cpet test results',
    'how to read cpet report',
    'vo2 max test report',
    'vo2 max test at 54',
    'ventilatory thresholds',
    'vo2peak vs vo2max',
    'lab vo2 max test',
    'sicor medellin vo2 max',
  ],

  lead: (
    <p className="text-lg text-slate-700">
      I walked into a cardiology clinic, got wired to twelve EKG leads, had a mask strapped to my
      face, and ran on a treadmill until I couldn't anymore. I came out with a five-page PDF — in
      Spanish — that decoded my cardiovascular fitness into a couple of dozen numbers. I spend
      most of my working hours on this site explaining how these tests work; taking one myself
      felt overdue, and I wanted a real baseline to measure against as I start to seriously work
      on improving. Here is what the report said, translated section by section, and what I took
      away from it.
    </p>
  ),

  body: (
    <>
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The headline numbers</h2>
        <p className="mt-3 text-slate-700">
          I'll put the summary at the top, because that's how my own brain reads a report — scan
          the top numbers, then go back and figure out why each one is what it is.
        </p>
        <ul className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-800">
          <li><strong>Age:</strong> 54</li>
          <li><strong>Height:</strong> 184 cm (6'0")</li>
          <li><strong>Weight:</strong> 83 kg (183 lb)</li>
          <li><strong>VO2 max (weight-adjusted):</strong> 46 ml/min/kg</li>
          <li><strong>VO2 peak (absolute):</strong> 2.79 L/min</li>
          <li><strong>Max heart rate reached:</strong> 153 bpm (89% of age-predicted max)</li>
          <li><strong>Aerobic threshold (VT1):</strong> ~125 bpm</li>
          <li><strong>Anaerobic threshold (VT2):</strong> between VT1 and peak HR</li>
          <li><strong>Peak RER:</strong> 1.09</li>
          <li><strong>Test duration to exhaustion:</strong> 6 min 21 sec</li>
          <li><strong>Classification on the report:</strong> "Excellent for age and gender"</li>
        </ul>
        <p className="mt-3 text-slate-700">
          What follows is a section-by-section translation of the report, plus my own commentary
          on what each number actually tells you. If you have a CPET coming up — or a PDF sitting
          in your inbox you haven't opened — this should help you read yours.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The protocol: what they actually had me do</h2>
        <figure className="mt-4 md:float-right md:ml-6 md:mt-2 md:mb-2 md:w-64">
          <video
            src="https://calculatorsites.b-cdn.net/vo2max/vo2max-test.mov"
            controls
            muted
            playsInline
            preload="metadata"
            aria-label="Short video clip of the author on the treadmill during a VO2 max test at Sicor clinic in Medellín, wearing a metabolic cart mask and EKG leads."
            className="w-full rounded-2xl"
          />
          <figcaption className="mt-2 text-xs text-slate-500">
            Me, mid-ramp, at Sicor in Medellín. Metabolic cart mask, twelve EKG leads, lumbar
            belt.
          </figcaption>
        </figure>
        <p className="mt-3 text-slate-700">
          I took the test at <strong>Sicor</strong> — a cardiology clinic in Medellín, Colombia —
          on an "athletic ramp" treadmill protocol. Three minutes at a 4.5 km/h walk to baseline
          the equipment, then progressively faster speeds and steeper grades until I reached
          11.84 km/h (about 7.4 mph) at a 2% incline, then stepped up to 3% grade for the final
          minute. Total time from the first step to exhaustion was 6 minutes and 21 seconds.
        </p>
        <p className="mt-3 text-slate-700">
          Short test times like this are normal for ramp protocols. The goal isn't endurance; it's
          to push you from comfortable to maximal effort quickly enough that the metabolic cart
          can cleanly resolve two ventilatory thresholds plus your peak oxygen uptake. Longer
          tests don't add information — they just add fatigue that muddies the signal.
        </p>
        <p className="mt-3 text-slate-700">
          Throughout the test, the mask measured the oxygen I inhaled and the carbon dioxide I
          exhaled on every breath. A twelve-lead EKG recorded my heart's electrical activity in
          parallel. A blood-pressure cuff inflated every two minutes. All of that data streamed
          into a single software package, which is where the five-page PDF came from. Every number
          on that PDF was derived from those three streams.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">VO2 max: 46 ml/min/kg (and why it says "peak," not "max")</h2>
        <p className="mt-3 text-slate-700">
          46 ml/min/kg is the number everyone wants to see. It's what goes at the top of the
          report, and it's what I think about when I compare my own fitness against the mortality
          studies I've{' '}
          <Link href="/blog/vo2-max-studies-every-runner-should-know/" className="text-teal-700 underline">
            written about elsewhere on this blog
          </Link>
          . For a 54-year-old man, the Cooper Institute's normative data — which is what the{' '}
          <Link href="/chart/" className="text-teal-700 underline">
            full percentile chart on this site
          </Link>{' '}
          uses — puts 46 at the lower edge of the "Excellent" bracket for my age group, comfortably
          above the 75th percentile for my decade.
        </p>
        <p className="mt-3 text-slate-700">
          One technical nuance is worth naming, because nearly every commercial CPET report
          handles it the same way mine did. The value is written as <strong>VO2 peak</strong>, not
          VO2 max. Strictly, a "true" VO2 max requires the respiratory exchange ratio (RER — the
          ratio of CO<sub>2</sub> exhaled to O<sub>2</sub> consumed) to exceed about 1.10–1.15 at
          peak effort. That's the physiological signature of genuinely maximal work — your muscles
          are burning more carbohydrate than oxygen can account for, and CO<sub>2</sub> production
          outruns oxygen intake.
        </p>
        <p className="mt-3 text-slate-700">
          My peak RER was 1.09. That's within a breath of the threshold, but it formally classifies
          the result as VO2 peak — the highest value observed during the test — rather than VO2
          max, the physiological ceiling. In practice the distinction is small: a few percent at
          most. But it's an honest label, and I respect reports that use it.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The ventilatory thresholds: where the zones actually are</h2>
        <p className="mt-3 text-slate-700">
          Peak numbers make good headlines. The more interesting data on a CPET are the two
          ventilatory thresholds — VT1 and VT2. They mark the points in the effort curve where
          your body's fuel mix and breathing pattern change gears.
        </p>
        <p className="mt-3 text-slate-700">
          <strong>VT1 (aerobic threshold)</strong> is where ventilation starts rising faster than
          oxygen uptake — the first hint of anaerobic energy production sneaking in. In training
          language, VT1 is the top of "zone 2." Below VT1 you can sustain effort indefinitely,
          talk in full sentences, and burn a high proportion of fat for fuel. Above VT1 you
          gradually begin to accumulate lactate.
        </p>
        <p className="mt-3 text-slate-700">
          My VT1 came in at a heart rate of roughly <strong>125 bpm</strong>. That number matters a
          lot for my everyday training. It's the ceiling I should stay below on easy days, and
          it's the exact number the cardiologist used when writing my training prescription
          (more below).
        </p>
        <p className="mt-3 text-slate-700">
          <strong>VT2 (anaerobic threshold, or respiratory compensation point)</strong> is the
          second gear change — above it, you can't clear CO<sub>2</sub> fast enough, breathing
          becomes much faster and more labored, and you fatigue in minutes rather than hours. VT2
          is the border of sustainable high-intensity work. My VT2 sat between VT1 and my peak
          HR of 153 bpm — typical for a trained adult.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The cardiology panel: the part people ignore</h2>
        <p className="mt-3 text-slate-700">
          A CPET is a cardiology test first and a fitness test second. The report devoted more
          space to the EKG and blood-pressure data than to VO2 — and that's the right priority
          if the goal is to catch arrhythmias, ischemia, or blood-pressure abnormalities before
          they matter.
        </p>
        <p className="mt-3 text-slate-700">
          My EKG showed a normal sinus rhythm at rest (83 bpm), normal ST and T segments, no
          significant ventricular repolarization changes during the test, and no notable
          arrhythmias during recovery. Blood pressure rose from 122/80 at rest to 150/82 at peak
          and dropped back to 130/82 in recovery — a textbook hypertensive response to exercise,
          which is a good thing, not a bad one. ("Hypertensive" here just means elevated during
          work, not elevated at rest.)
        </p>
        <p className="mt-3 text-slate-700">
          One number worth explaining: the double product, also called rate-pressure product. It's
          heart rate × systolic blood pressure, and it's a proxy for myocardial oxygen demand. It
          rose from about 10,000 at rest to 26,000 at peak — roughly a 2.5× increase. That's a
          normal cardiac reserve for someone my age. Double product is one of the better
          single-number summaries of how hard the heart is actually working, and it's
          under-discussed outside the cardiology world.
        </p>
        <p className="mt-3 text-slate-700">
          HR recovery — how fast heart rate drops in the first minute after effort — is another
          prognostically loaded metric. Mine dropped 18 beats in the first minute, which is
          within the normal range. A drop of less than 12 beats in the first minute is associated
          with higher cardiovascular mortality in the epidemiology literature.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">The training prescription</h2>
        <p className="mt-3 text-slate-700">
          The cardiologist's prescription, derived straight from my threshold data, was simple
          and well-calibrated:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>80% of training</strong> — at least three one-hour sessions per week — at
            heart rates between 113 and 125 bpm. That's my zone 2: below VT1, where fat
            oxidation dominates. In plain language: "able to talk with slight difficulty, not
            able to sing."
          </li>
          <li>
            <strong>20% of training</strong> — intervals pushing up toward 153 bpm (my measured
            peak), or activities that get me there.
          </li>
        </ul>
        <p className="mt-3 text-slate-700">
          This is the classic <Link href="/improve/polarized-training/" className="text-teal-700 underline">polarized training</Link>{' '}
          distribution that most of the endurance-science literature has converged on. The large
          easy base improves mitochondrial density and fat oxidation; the small high-intensity
          dose drives VO2 max and lactate tolerance. What I appreciated was that the thresholds
          were <em>mine</em> — not generic age-predicted zones from a 220-minus-age formula.
          That's the whole point of a lab test: to calibrate the zones to your actual
          physiology.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">What surprised me</h2>
        <p className="mt-3 text-slate-700">
          Three things:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>
            <strong>How short the test is.</strong> Six minutes of treadmill time. I expected
            something endurance-scale. The whole visit took about an hour; the max-effort portion
            was under seven minutes. A ramp protocol is designed to front-load information.
          </li>
          <li>
            <strong>How much of the report was cardiology, not fitness.</strong> The EKG and
            hemodynamic sections were longer than the VO2 section. For anyone over 40 who's never
            done a CPET, the medical screening value alone justifies the cost.
          </li>
          <li>
            <strong>How closely the field-test estimate matched.</strong> Before going in, I used{' '}
            <Link href="/" className="text-teal-700 underline">my own calculator</Link>{' '}
            with my recent 1.5-mile run time and got an estimate in the same decile as the lab
            result. That's consistent with the {' '}
            <Link href="/methods/1-5-mile-run/" className="text-teal-700 underline">
              correlation data on the 1.5-mile run method
            </Link>{' '}
            (r ≈ 0.90 against lab VO2 in trained populations). Field tests are less precise in
            absolute terms, but for tracking progress over time they're more than good enough.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">If you're thinking about getting one</h2>
        <p className="mt-3 text-slate-700">
          A CPET is worth it if you want to (a) calibrate your training zones precisely, (b) get
          a cardiology screen at the same time, or (c) establish a baseline you can retest
          against in one to three years. It's not worth it if you just want to know your VO2 max
          number — a field test like the{' '}
          <Link href="/methods/cooper-12-minute-run/" className="text-teal-700 underline">
            Cooper 12-minute run
          </Link>{' '}
          or{' '}
          <Link href="/methods/rockport-1-mile-walk/" className="text-teal-700 underline">
            Rockport 1-mile walk
          </Link>{' '}
          will land you in the same decile for no cost.
        </p>
        <p className="mt-3 text-slate-700">
          Expect to pay $150–400 in the U.S., depending on the city and whether the test is
          bundled with a cardiology consult. If you want help finding a lab, the{' '}
          <Link href="/find-a-lab/" className="text-teal-700 underline">
            lab directory on this site
          </Link>{' '}
          lists more than a thousand facilities across all 50 states.
        </p>
      </section>
    </>
  ),

  faqs: [
    {
      question: 'What is the difference between VO2 max and VO2 peak?',
      answer:
        'VO2 max is the physiological ceiling on oxygen consumption and is only confirmed when the respiratory exchange ratio exceeds about 1.10–1.15 at peak effort. VO2 peak is the highest oxygen consumption actually observed during the test, regardless of whether that ceiling was reached. In practice the two are usually within a few percent of each other, but honest reports distinguish them.',
    },
    {
      question: 'Do I need a lab CPET if I already have field-test estimates?',
      answer:
        "Not to know your number — the Cooper 12-minute run and 1.5-mile run correlate around r ≈ 0.90 with lab VO2 in trained populations, which is enough to track progress. A lab test earns its cost when you want individually calibrated ventilatory thresholds for training, when you want a cardiology screen at the same time, or when you want a baseline you can retest against in a few years.",
    },
    {
      question: 'How much does a CPET test cost in the U.S.?',
      answer:
        "Typically $150–400, depending on location and whether the test is bundled with a cardiologist consultation. Sports-medicine clinics and university exercise-physiology labs tend to be on the lower end; hospital-based cardiology programs tend to be on the higher end. The Find a Lab directory on this site lists facilities by state.",
    },
    {
      question: 'Why is the test so short?',
      answer:
        'Ramp protocols are designed to front-load information. The goal is to push you from comfortable to maximal effort quickly enough to cleanly resolve two ventilatory thresholds plus peak oxygen uptake. Most well-designed ramps get you to exhaustion in 6–12 minutes; longer tests add fatigue without adding information.',
    },
  ],
};

export default post;
