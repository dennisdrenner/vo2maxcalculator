'use client';

import Link from 'next/link';
import { categoryForVo2Max, ageToBracket, bracketToDecadeSlug, Sex } from '@/lib/norms';
import { EmailGate } from './EmailGate';

interface ResultProps {
  vo2max: number;
  age: number;
  sex: Sex;
  method: string;
  methodSlug: string;
}

export function Result({ vo2max, age, sex, method, methodSlug }: ResultProps) {
  const { percentile, category } = categoryForVo2Max(vo2max, age, sex);
  const bracket = ageToBracket(age);
  const decadeSlug = bracketToDecadeSlug(bracket);
  const rounded = Math.round(vo2max);

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
        <div>
          <div className="text-sm uppercase tracking-wide text-slate-500">Your VO2 max</div>
          <div className="mt-1 text-5xl font-bold text-brand-fg tabular-nums">
            {vo2max.toFixed(1)}
            <span className="ml-2 text-base font-medium text-slate-500">ml/kg/min</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-auto sm:text-right">
          <div className="text-sm uppercase tracking-wide text-slate-500">Category</div>
          <div className="mt-1 text-2xl font-semibold">{category}</div>
          <div className="text-sm text-slate-600">
            {percentile}th percentile ({sex === 'male' ? 'men' : 'women'} {bracket})
          </div>
        </div>
      </div>

      <PercentileBar percentile={percentile} />

      <div className="mt-6 text-sm text-slate-700">
        Your VO2 max is higher than <strong>{percentile}%</strong> of{' '}
        {sex === 'male' ? 'men' : 'women'} aged {bracket}. Method: {method}.
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link
          href={`/by-age/${decadeSlug}/`}
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm hover:border-brand hover:bg-brand-soft"
        >
          <div className="font-semibold">Compare to age norms</div>
          <div className="text-slate-600">See how you rank at {bracket}</div>
        </Link>
        <Link
          href={`/good-vo2-max/${rounded}/`}
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm hover:border-brand hover:bg-brand-soft"
        >
          <div className="font-semibold">Is {rounded} good?</div>
          <div className="text-slate-600">What this value means</div>
        </Link>
        <Link
          href="/improve/"
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm hover:border-brand hover:bg-brand-soft"
        >
          <div className="font-semibold">Improve your VO2 max</div>
          <div className="text-slate-600">Evidence-based training</div>
        </Link>
      </div>

      <EmailGate vo2max={vo2max} age={age} sex={sex} method={methodSlug} />
    </section>
  );
}

function PercentileBar({ percentile }: { percentile: number }) {
  const clamped = Math.max(1, Math.min(99, percentile));
  return (
    <div className="mt-6">
      <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-rose-200 via-amber-200 to-emerald-300">
        <div
          className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-slate-900"
          style={{ left: `${clamped}%` }}
          aria-hidden
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>5th</span>
        <span>25th</span>
        <span>50th</span>
        <span>75th</span>
        <span>95th</span>
      </div>
    </div>
  );
}
