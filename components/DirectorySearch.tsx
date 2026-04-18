'use client';

import { useState } from 'react';
import { searchFacilities, STATE_NAMES, getStateSlug, type Facility } from '@/lib/directory';
import { FacilityCard } from '@/components/FacilityCard';

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

  // Find unique states in results for "View all" links
  const resultStates = searched && results.length > 0
    ? [...new Set(results.map((f) => f.state))]
    : [];

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
              No facilities found for &quot;{query}&quot;. Try a different city or state, or{' '}
              <a href="mailto:dennis@smartravenai.com" className="text-teal-700 underline">
                let us know
              </a>{' '}
              if we&apos;re missing one.
            </p>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-700">
                {results.length} {results.length === 1 ? 'facility' : 'facilities'} found
              </p>
              <div className="mt-3 space-y-3">
                {results.slice(0, 20).map((f, i) => (
                  <FacilityCard key={`${f.city}-${f.state}-${i}`} facility={f} />
                ))}
              </div>
              {results.length > 20 && (
                <p className="mt-3 text-sm text-slate-500">
                  Showing 20 of {results.length} results. Try a more specific search.
                </p>
              )}
              {resultStates.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {resultStates.map((st) => (
                    <a
                      key={st}
                      href={`/find-a-lab/${getStateSlug(st)}/`}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-teal-700 hover:bg-slate-100"
                    >
                      View all labs in {STATE_NAMES[st] || st} →
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
