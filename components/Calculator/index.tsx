'use client';

import { useEffect, useMemo, useState } from 'react';
import { METHODS, getMethod, type MethodInput, type MethodSlug, type UnitSystem } from '@/lib/methods';
import { categoryForVo2Max, type Sex } from '@/lib/norms';
import { analytics } from '@/lib/analytics';
import { Result } from './Result';

interface CalculatorProps {
  defaultMethod?: MethodSlug;
  hideMethodSelector?: boolean;
}

const UNIT_KEY = 'vo2-units';

export function Calculator({ defaultMethod = 'cooper-12-minute-run', hideMethodSelector }: CalculatorProps) {
  const [slug, setSlug] = useState<MethodSlug>(defaultMethod);
  const [units, setUnits] = useState<UnitSystem>('imperial');
  const [age, setAge] = useState<string>('30');
  const [sex, setSex] = useState<Sex>('male');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ vo2max: number; method: string; slug: string } | null>(null);
  const [error, setError] = useState<string>('');

  const method = useMemo(() => getMethod(slug), [slug]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(UNIT_KEY) : null;
    if (stored === 'imperial' || stored === 'metric') setUnits(stored);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(UNIT_KEY, units);
    analytics.unitToggle(units);
  }, [units]);

  useEffect(() => {
    setValues({});
    setResult(null);
    setError('');
  }, [slug]);

  function updateField(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onCalculate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const ageNum = Number(age);
      if (!ageNum || ageNum < 10 || ageNum > 100) throw new Error('Enter an age between 10 and 100.');
      for (const input of method.inputs) {
        const v = values[input.key];
        if (input.type === 'sex') continue;
        if (v === undefined || v === '') {
          if (input.key === 'hrMax') continue;
          throw new Error(`Please fill in: ${input.label}`);
        }
      }
      const raw = { ...values, sex, age: ageNum };
      const normalized = method.normalize(raw, units);
      const vo2max = method.compute(normalized);
      if (!isFinite(vo2max) || vo2max < 5 || vo2max > 100) {
        throw new Error('Got an unreasonable VO2 max. Please check your inputs.');
      }
      setResult({ vo2max, method: method.displayName, slug: method.slug });
      const { percentile } = categoryForVo2Max(vo2max, ageNum, sex);
      analytics.calculatorResult(method.slug, vo2max, percentile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setResult(null);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={onCalculate} className="space-y-5">
        {!hideMethodSelector && (
          <Field label="Test method">
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value as MethodSlug)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {METHODS.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.displayName}
                </option>
              ))}
            </select>
          </Field>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Age">
            <input
              type="number"
              min={10}
              max={100}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </Field>
          <Field label="Sex">
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value as Sex)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
        </div>

        <Field label="Units">
          <div className="inline-flex rounded-md border border-slate-300 p-0.5 text-sm">
            <button
              type="button"
              onClick={() => setUnits('imperial')}
              className={`rounded px-3 py-1 ${units === 'imperial' ? 'bg-brand text-white' : 'text-slate-700'}`}
            >
              Imperial
            </button>
            <button
              type="button"
              onClick={() => setUnits('metric')}
              className={`rounded px-3 py-1 ${units === 'metric' ? 'bg-brand text-white' : 'text-slate-700'}`}
            >
              Metric
            </button>
          </div>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          {method.inputs.map((input) => (
            <MethodField
              key={input.key}
              input={input}
              value={values[input.key] ?? ''}
              onChange={(v) => updateField(input.key, v)}
              units={units}
              sex={sex}
              onSexChange={setSex}
            />
          ))}
        </div>

        {error ? (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-fg"
        >
          Calculate VO2 max
        </button>

        <p className="text-xs text-slate-500">
          Based on: {method.citation}
        </p>
      </form>

      {result ? (
        <Result
          vo2max={result.vo2max}
          age={Number(age)}
          sex={sex}
          method={result.method}
          methodSlug={result.slug}
        />
      ) : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function MethodField({
  input,
  value,
  onChange,
  units,
  sex,
  onSexChange,
}: {
  input: MethodInput;
  value: string;
  onChange: (v: string) => void;
  units: UnitSystem;
  sex: Sex;
  onSexChange: (s: Sex) => void;
}) {
  if (input.type === 'sex') {
    return (
      <Field label={input.label}>
        <select
          value={sex}
          onChange={(e) => onSexChange(e.target.value as Sex)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </Field>
    );
  }

  let suffix = '';
  let step: number | 'any' = 1;
  let placeholder = input.placeholder;
  if (input.type === 'weight') {
    suffix = units === 'imperial' ? 'lb' : 'kg';
    placeholder = units === 'imperial' ? '160' : '73';
  } else if (input.type === 'height') {
    suffix = units === 'imperial' ? 'in' : 'cm';
    placeholder = units === 'imperial' ? '70' : '178';
  } else if (input.type === 'distance') {
    suffix = units === 'imperial' ? 'miles' : 'meters';
    step = units === 'imperial' ? 0.01 : 1;
    placeholder = units === 'imperial' ? '1.74' : '2800';
  } else if (input.type === 'pa-rating') {
    step = 1;
  }

  const labelSuffix = suffix ? ` (${suffix})` : '';

  return (
    <Field label={`${input.label}${labelSuffix}`}>
      <input
        type="number"
        inputMode="decimal"
        min={input.min}
        max={input.max}
        step={step}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      />
      {input.help ? <p className="mt-1 text-xs text-slate-500">{input.help}</p> : null}
    </Field>
  );
}
