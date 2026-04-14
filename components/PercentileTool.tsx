'use client';

import { useState } from 'react';
import { categoryForVo2Max, type Sex } from '@/lib/norms';

export function PercentileTool() {
  const [vo2max, setVo2max] = useState('42');
  const [age, setAge] = useState('35');
  const [sex, setSex] = useState<Sex>('male');
  const [result, setResult] = useState<{ percentile: number; category: string } | null>(null);
  const [error, setError] = useState('');

  function calculate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const v = Number(vo2max);
      const a = Number(age);
      if (!v || v < 5 || v > 100) throw new Error('Enter a VO2 max between 5 and 100.');
      if (!a || a < 10 || a > 100) throw new Error('Enter an age between 10 and 100.');
      setResult(categoryForVo2Max(v, a, sex));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setResult(null);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={calculate} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">VO2 max (ml/kg/min)</span>
            <input
              type="number"
              step="0.1"
              min={5}
              max={100}
              value={vo2max}
              onChange={(e) => setVo2max(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">Age</span>
            <input
              type="number"
              min={10}
              max={100}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700">Sex</span>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        {error ? (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            {error}
          </div>
        ) : null}
        <button
          type="submit"
          className="w-full rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-fg sm:w-auto"
        >
          Calculate percentile
        </button>
      </form>

      {result ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm uppercase tracking-wide text-slate-500">Result</div>
          <div className="mt-1 text-3xl font-bold text-brand-fg">
            {result.percentile}th percentile
          </div>
          <div className="mt-1 text-slate-700">
            Category: <strong>{result.category}</strong>
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Your VO2 max of {vo2max} is higher than {result.percentile}% of{' '}
            {sex === 'male' ? 'men' : 'women'} aged {age}.
          </div>
        </div>
      ) : null}
    </div>
  );
}
