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
