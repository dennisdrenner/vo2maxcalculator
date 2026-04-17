'use client';

import { useState } from 'react';
import Link from 'next/link';
import { METHODS, type MethodSlug } from '@/lib/methods';

type Activity = 'run' | 'walk' | 'cycle' | 'step' | 'none';
type Effort = 'max' | 'sub' | 'none';

interface Rec {
  slug: MethodSlug;
  name: string;
  why: string;
  time: number;
  accuracy: string;
  image: string;
}

const ACTIVITY_OPTIONS: { value: Activity; label: string }[] = [
  { value: 'run', label: 'Run' },
  { value: 'walk', label: 'Walk' },
  { value: 'cycle', label: 'Cycle' },
  { value: 'step', label: 'Step' },
  { value: 'none', label: 'No exercise' },
];

const EFFORT_OPTIONS: { value: Effort; label: string; desc: string }[] = [
  { value: 'max', label: 'All-out', desc: 'Most accurate' },
  { value: 'sub', label: 'Moderate', desc: 'Easier to do' },
  { value: 'none', label: 'None', desc: 'No physical test' },
];

function recommend(activity: Activity, effort: Effort): Rec[] {
  const img = (slug: string) =>
    `https://calculatorsites.b-cdn.net/vo2max/methods/${slug}.jpg`;
  const m = (slug: string) => METHODS.find((x) => x.slug === slug)!;

  if (activity === 'none' || effort === 'none') {
    return [
      { slug: 'non-exercise-estimator', name: m('non-exercise-estimator').displayName, why: 'No physical test required — uses age, sex, BMI, and activity level', time: 2, accuracy: 'low', image: img('non-exercise-estimator') },
      { slug: 'resting-heart-rate', name: m('resting-heart-rate').displayName, why: 'Just sit still for 60 seconds and count your pulse', time: 1, accuracy: 'low', image: img('resting-heart-rate') },
    ];
  }

  if (activity === 'run') {
    if (effort === 'max') {
      return [
        { slug: 'cooper-12-minute-run', name: m('cooper-12-minute-run').displayName, why: 'Gold standard field test — run as far as you can in 12 minutes', time: 12, accuracy: 'high', image: img('cooper-12-minute-run') },
        { slug: '1-5-mile-run', name: m('1-5-mile-run').displayName, why: 'Run 1.5 miles as fast as possible — great if you know a measured route', time: 10, accuracy: 'high', image: img('1-5-mile-run') },
      ];
    }
    return [
      { slug: '1-mile-run', name: m('1-mile-run').displayName, why: 'Submaximal — run 1 mile at a steady pace with a heart rate monitor', time: 10, accuracy: 'moderate', image: img('1-mile-run') },
    ];
  }

  if (activity === 'walk') {
    if (effort === 'max') {
      return [
        { slug: 'rockport-1-mile-walk', name: m('rockport-1-mile-walk').displayName, why: 'Walk 1 mile as fast as you can — the most validated walking test', time: 15, accuracy: 'high', image: img('rockport-1-mile-walk') },
      ];
    }
    return [
      { slug: '6-minute-walk-test', name: m('6-minute-walk-test').displayName, why: 'Walk at your own pace for 6 minutes — ideal for older adults or beginners', time: 6, accuracy: 'moderate', image: img('6-minute-walk-test') },
      { slug: '1-5-mile-walk', name: m('1-5-mile-walk').displayName, why: 'Walk 1.5 miles at a brisk pace — no heart rate monitor needed', time: 22, accuracy: 'moderate', image: img('1-5-mile-walk') },
    ];
  }

  if (activity === 'cycle') {
    if (effort === 'max') {
      return [
        { slug: 'ymca-cycle-ergometer', name: m('ymca-cycle-ergometer').displayName, why: 'Multistage protocol on a stationary bike — common in gyms', time: 12, accuracy: 'moderate', image: img('ymca-cycle-ergometer') },
      ];
    }
    return [
      { slug: 'astrand-rhyming-cycle', name: m('astrand-rhyming-cycle').displayName, why: 'Single submaximal workload for 6 minutes — the classic cycle test', time: 6, accuracy: 'moderate', image: img('astrand-rhyming-cycle') },
    ];
  }

  if (activity === 'step') {
    if (effort === 'max') {
      return [
        { slug: 'harvard-step-test', name: m('harvard-step-test').displayName, why: 'Step up and down for 5 minutes — high bench, vigorous effort', time: 5, accuracy: 'moderate', image: img('harvard-step-test') },
        { slug: 'queens-college-step-test', name: m('queens-college-step-test').displayName, why: '3 minutes of stepping at a set cadence — quick and effective', time: 3, accuracy: 'moderate', image: img('queens-college-step-test') },
      ];
    }
    return [
      { slug: 'ymca-3-minute-step-test', name: m('ymca-3-minute-step-test').displayName, why: 'Easy 3-minute test on a low step — just count your recovery pulse', time: 3, accuracy: 'moderate', image: img('ymca-3-minute-step-test') },
    ];
  }

  return [];
}

const PILL =
  'rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer';
const PILL_ACTIVE = 'border-brand bg-brand-soft text-brand-fg';
const PILL_INACTIVE =
  'border-charcoal-mid bg-charcoal-deep text-slate-300 hover:border-brand hover:text-brand-soft';

const ACCURACY_DOT: Record<string, string> = {
  high: 'bg-emerald-500',
  moderate: 'bg-amber-500',
  low: 'bg-slate-400',
};

export function TestPicker({
  onSelect,
}: {
  onSelect?: (slug: MethodSlug) => void;
}) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [effort, setEffort] = useState<Effort | null>(null);

  const recs = activity && effort ? recommend(activity, effort) : [];

  return (
    <div className="rounded-2xl bg-charcoal p-6 shadow-sm">
      <h3 className="text-lg font-bold text-white">
        Which test is right for you?
      </h3>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-300">
          What activity can you do?
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ACTIVITY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${PILL} ${activity === opt.value ? PILL_ACTIVE : PILL_INACTIVE}`}
              onClick={() => {
                setActivity(opt.value);
                if (opt.value === 'none') setEffort('none');
                else if (effort === 'none') setEffort(null);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {activity && activity !== 'none' && (
        <div className="mt-5">
          <p className="text-sm font-medium text-slate-300">
            How hard do you want to push?
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {EFFORT_OPTIONS.filter((o) => o.value !== 'none').map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`${PILL} ${effort === opt.value ? PILL_ACTIVE : PILL_INACTIVE}`}
                onClick={() => setEffort(opt.value)}
              >
                <span>{opt.label}</span>
                <span className="ml-1 text-xs font-normal text-slate-500">
                  ({opt.desc})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {recs.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-slate-300">
            {recs.length === 1 ? 'Recommended test' : 'Recommended tests'}
          </p>
          {recs.map((rec) => (
            <div
              key={rec.slug}
              className="flex items-center gap-4 rounded-xl border border-charcoal-mid bg-charcoal-deep p-4"
            >
              <img
                src={rec.image}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{rec.name}</span>
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${ACCURACY_DOT[rec.accuracy]}`}
                    title={`${rec.accuracy} accuracy`}
                  />
                </div>
                <p className="mt-0.5 text-sm text-slate-400">{rec.why}</p>
                <p className="mt-1 text-xs text-slate-500">~{rec.time} min</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-fg"
                onClick={() => {
                  onSelect?.(rec.slug);
                  document
                    .getElementById('calculator')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Use this test
              </button>
            </div>
          ))}
          <p className="text-xs text-slate-500">
            Or{' '}
            <Link
              href="/methods/"
              className="text-brand-soft underline"
            >
              browse all 17 methods
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
