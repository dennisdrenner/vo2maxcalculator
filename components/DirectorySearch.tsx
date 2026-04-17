'use client';

import { useState } from 'react';
import { searchFacilities, STATE_NAMES, type Facility } from '@/lib/directory';

export function DirectorySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Facility[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setResults(searchFacilities(q.trim()));
    setSearched(true);
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by city or state (e.g., Austin, TX)"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {searched && (
        <div className="mt-4">
          {results.length === 0 ? (
            <p className="text-sm text-slate-500">
              No facilities found for "{query}". Try a different city or state, or{' '}
              <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
                let us know
              </a>{' '}
              if we're missing one.
            </p>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-700">
                {results.length} {results.length === 1 ? 'facility' : 'facilities'} found
              </p>
              <div className="mt-3 space-y-3">
                {results.slice(0, 20).map((f, i) => {
                  const isReferral = f.source === 'fitnescity' && !f.name;

                  if (isReferral) {
                    return (
                      <div
                        key={`${f.city}-${f.state}-${i}`}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            VO2 max testing available in {f.city}, {STATE_NAMES[f.state] || f.state}
                          </p>
                          <p className="text-xs text-slate-500">via Fitnescity (Quest Diagnostics partner)</p>
                        </div>
                        {f.source_url ? (
                          <a
                            href={f.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-fg"
                          >
                            Book ↗
                          </a>
                        ) : null}
                      </div>
                    );
                  }

                  return (
                  <div
                    key={`${f.city}-${f.state}-${i}`}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        {f.name ? (
                          <h3 className="font-bold text-slate-900">{f.name}</h3>
                        ) : null}
                        <p className="text-sm text-slate-700">
                          {f.city}, {STATE_NAMES[f.state] || f.state}
                          {f.address ? ` — ${f.address}` : ''}
                        </p>
                      </div>
                      {f.website ? (
                        <a
                          href={f.website.startsWith('http') ? f.website : `https://${f.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-sm font-semibold text-teal-700 hover:underline"
                        >
                          Website ↗
                        </a>
                      ) : null}
                    </div>
                    {f.phone ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Phone: <a href={`tel:${f.phone}`} className="text-teal-700 hover:underline">{f.phone}</a>
                      </p>
                    ) : null}
                  </div>
                  );
                })}
                {results.length > 20 && (
                  <p className="text-sm text-slate-500">
                    Showing 20 of {results.length} results. Try a more specific search.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
