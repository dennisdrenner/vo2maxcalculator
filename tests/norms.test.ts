import { describe, it, expect } from 'vitest';
import {
  ACSM_NORMS,
  ageToBracket,
  categoryForVo2Max,
  getCategory,
  getNorms,
  getPercentile,
} from '@/lib/norms';

describe('norms data shape', () => {
  it('has 12 entries (2 sexes × 6 age brackets)', () => {
    expect(ACSM_NORMS).toHaveLength(12);
  });

  it('every entry has 7 percentile values', () => {
    for (const entry of ACSM_NORMS) {
      expect(Object.keys(entry.percentiles)).toHaveLength(7);
    }
  });

  it('percentile values are monotonically increasing', () => {
    for (const entry of ACSM_NORMS) {
      const p = entry.percentiles;
      expect(p[5]).toBeLessThan(p[10]);
      expect(p[10]).toBeLessThan(p[25]);
      expect(p[25]).toBeLessThan(p[50]);
      expect(p[50]).toBeLessThan(p[75]);
      expect(p[75]).toBeLessThan(p[90]);
      expect(p[90]).toBeLessThan(p[95]);
    }
  });
});

describe('ageToBracket', () => {
  it('maps ages to brackets correctly', () => {
    expect(ageToBracket(25)).toBe('20-29');
    expect(ageToBracket(30)).toBe('30-39');
    expect(ageToBracket(39)).toBe('30-39');
    expect(ageToBracket(40)).toBe('40-49');
    expect(ageToBracket(75)).toBe('70-79');
  });

  it('clamps young ages into 20-29 and older into 70-79', () => {
    expect(ageToBracket(18)).toBe('20-29');
    expect(ageToBracket(90)).toBe('70-79');
  });
});

describe('getNorms', () => {
  it('returns the p50 that matches the table for male 30-39', () => {
    expect(getNorms(35, 'male')[50]).toBe(42.4);
  });

  it('returns the p50 that matches the table for female 50-59', () => {
    expect(getNorms(55, 'female')[50]).toBe(23.4);
  });
});

describe('getPercentile', () => {
  it('returns the correct percentile at a known boundary', () => {
    expect(getPercentile(48.0, 25, 'male')).toBe(50);
    expect(getPercentile(37.6, 25, 'female')).toBe(50);
    expect(getPercentile(42.4, 35, 'male')).toBe(50);
  });

  it('interpolates between breakpoints', () => {
    const p = getPercentile(45.0, 25, 'male');
    expect(p).toBeGreaterThan(25);
    expect(p).toBeLessThan(75);
  });

  it('returns very high percentile for extreme values', () => {
    expect(getPercentile(80, 35, 'male')).toBeGreaterThanOrEqual(95);
  });

  it('returns very low percentile for very low values', () => {
    expect(getPercentile(10, 25, 'male')).toBeLessThan(5);
  });
});

describe('getCategory / categoryForVo2Max', () => {
  it('maps percentile bands to ACSM categories', () => {
    expect(getCategory(5)).toBe('Poor');
    expect(getCategory(30)).toBe('Fair');
    expect(getCategory(50)).toBe('Average');
    expect(getCategory(70)).toBe('Good');
    expect(getCategory(85)).toBe('Excellent');
    expect(getCategory(97)).toBe('Superior');
  });

  it('combines percentile + category for a VO2 max', () => {
    const { percentile, category } = categoryForVo2Max(48.0, 25, 'male');
    expect(percentile).toBe(50);
    expect(category).toBe('Average');
  });
});
