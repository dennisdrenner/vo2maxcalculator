import { type Facility, STATE_NAMES, formatPhone } from '@/lib/directory';

function StarRating({ rating, count, reviewsLink }: { rating: number; count: number | null; reviewsLink?: string }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars = (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={`f${i}`} className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <defs><clipPath id="half"><rect x="0" y="0" width="10" height="20" /></clipPath></defs>
          <path clipPath="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-200" />
        </svg>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg key={`e${i}`} className="h-4 w-4 text-slate-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );

  const label = (
    <span className="ml-1.5 text-sm text-slate-600">
      {rating.toFixed(1)}
      {count ? ` (${count} ${count === 1 ? 'review' : 'reviews'})` : ''}
    </span>
  );

  if (reviewsLink) {
    return (
      <a href={reviewsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80">
        {stars}{label}
      </a>
    );
  }

  return <span className="inline-flex items-center">{stars}{label}</span>;
}

function CompactHours({ hours }: { hours: Record<string, string[]> }) {
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayAbbrev: Record<string, string> = {
    Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu',
    Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun',
  };

  // Group consecutive days with same hours
  const groups: { days: string[]; time: string }[] = [];
  for (const day of dayOrder) {
    const time = hours[day]?.[0] || 'Closed';
    if (groups.length > 0 && groups[groups.length - 1].time === time) {
      groups[groups.length - 1].days.push(day);
    } else {
      groups.push({ days: [day], time });
    }
  }

  return (
    <div className="text-xs text-slate-500">
      {groups.slice(0, 3).map((g, i) => {
        const first = dayAbbrev[g.days[0]];
        const last = dayAbbrev[g.days[g.days.length - 1]];
        const range = g.days.length > 1 ? `${first}–${last}` : first;
        return (
          <span key={i}>
            {i > 0 && ' · '}
            {range}: {g.time}
          </span>
        );
      })}
    </div>
  );
}

export function FacilityCard({ facility }: { facility: Facility }) {
  const f = facility;
  const photoSrc = f.photo_url || '';
  const websiteUrl = f.website ? (f.website.startsWith('http') ? f.website : `https://${f.website}`) : '';

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex">
        {/* Photo */}
        {photoSrc && (
          <div className="hidden shrink-0 sm:block">
            <img
              src={photoSrc}
              alt={f.name}
              width={200}
              height={150}
              loading="lazy"
              className="h-full w-[200px] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900">{f.name}</h3>
                {f.verified && (
                  <svg className="h-4 w-4 shrink-0 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-label="Google verified">
                    <title>Google verified</title>
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {f.subtypes && (
                <p className="mt-0.5 text-xs text-slate-400">{f.subtypes}</p>
              )}
            </div>

            {/* Booking button or website link */}
            {f.booking_link ? (
              <a
                href={f.booking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-fg"
              >
                Book ↗
              </a>
            ) : websiteUrl ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-semibold text-teal-700 hover:underline"
              >
                Website ↗
              </a>
            ) : null}
          </div>

          {/* Rating */}
          {f.rating != null && (
            <div className="mt-1.5">
              <StarRating rating={f.rating} count={f.reviews_count} reviewsLink={f.reviews_link} />
            </div>
          )}

          {/* Address + directions */}
          <div className="mt-2 text-sm text-slate-700">
            {f.city}, {STATE_NAMES[f.state] || f.state}
            {f.address ? ` — ${f.address}` : ''}
            {f.maps_link && (
              <>
                {' '}
                <a
                  href={f.maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 hover:underline"
                >
                  Directions
                </a>
              </>
            )}
          </div>

          {/* Phone */}
          {f.phone && (
            <p className="mt-1 text-sm text-slate-600">
              <a href={`tel:${f.phone}`} className="text-teal-700 hover:underline">
                {formatPhone(f.phone)}
              </a>
            </p>
          )}

          {/* Working hours */}
          {f.working_hours && Object.keys(f.working_hours).length > 0 && (
            <div className="mt-1.5">
              <CompactHours hours={f.working_hours} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
