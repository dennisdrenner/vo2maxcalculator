'use client';

import { useState } from 'react';
import { Calculator } from '@/components/Calculator';
import { TestPicker } from '@/components/TestPicker';
import type { MethodSlug } from '@/lib/methods';

export function HomeCalculatorSection() {
  const [method, setMethod] = useState<MethodSlug>('cooper-12-minute-run');

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-10">
        <TestPicker onSelect={setMethod} />
      </section>

      <section id="calculator" className="mx-auto max-w-4xl px-4 py-10">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Calculate Your VO2 Max</h2>
        <Calculator defaultMethod={method} key={method} />
      </section>
    </>
  );
}
