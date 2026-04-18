import directoryData from './directory-data.json';

export interface Facility {
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  website: string;
  source: string;
  source_url?: string;
  rating: number | null;
  reviews_count: number | null;
  latitude: number | null;
  longitude: number | null;
  // Enrichment fields
  photo_url?: string;
  photo?: string;
  place_id?: string;
  subtypes?: string;
  reviews_per_score?: Record<string, number>;
  reviews_link?: string;
  working_hours?: Record<string, string[]>;
  booking_link?: string;
  maps_link?: string;
  verified?: boolean;
}

interface DirectoryData {
  generated: string;
  total_facilities: number;
  total_states: number;
  states: Record<string, Facility[]>;
}

const data = directoryData as DirectoryData;

export const DIRECTORY = data;

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DC: 'District of Columbia', DE: 'Delaware',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

export function stateToSlug(abbr: string): string {
  return (STATE_NAMES[abbr] || abbr).toLowerCase().replace(/\s+/g, '-');
}

export const STATE_SLUGS: Record<string, string> = Object.fromEntries(
  Object.keys(STATE_NAMES).map((abbr) => [abbr, stateToSlug(abbr)]),
);

export const SLUG_TO_ABBR: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_SLUGS).map(([abbr, slug]) => [slug, abbr]),
);

export function getStateBySlug(slug: string): string | undefined {
  return SLUG_TO_ABBR[slug];
}

export function getStateSlug(abbr: string): string {
  return STATE_SLUGS[abbr] || abbr.toLowerCase();
}

export function formatPhone(digits: string): string {
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

export function getStates(): string[] {
  return Object.keys(data.states).sort();
}

export function getFacilitiesByState(state: string): Facility[] {
  return data.states[state] || [];
}

export function getAllFacilities(): Facility[] {
  return Object.values(data.states).flat();
}

export function searchFacilities(query: string): Facility[] {
  const q = query.toLowerCase();
  return getAllFacilities().filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.city.toLowerCase().includes(q) ||
      (STATE_NAMES[f.state] || '').toLowerCase().includes(q) ||
      f.state.toLowerCase() === q,
  );
}
