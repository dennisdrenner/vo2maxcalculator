'use client';

import { useState } from 'react';
import type { Sex } from '@/lib/norms';
import { analytics } from '@/lib/analytics';

interface EmailGateProps {
  vo2max: number;
  age: number;
  sex: Sex;
  method: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function EmailGate({ vo2max, age, sex, method }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, vo2max, age, sex, method }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus('sent');
      setMessage('Sent! Check your inbox.');
      analytics.emailSubscribe('calculator_result');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <label className="block text-sm font-semibold">
        Want a copy of your results?
      </label>
      <p className="mt-1 text-sm text-slate-600">
        We&apos;ll email them plus a reminder to retest in 4 weeks. No spam. Unsubscribe anytime.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-fg disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send me my results'}
        </button>
      </div>
      {status === 'error' ? (
        <div className="mt-2 text-sm text-rose-700">{message}</div>
      ) : null}
    </form>
  );
}
