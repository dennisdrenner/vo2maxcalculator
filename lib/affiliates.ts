/**
 * Affiliate links registry. Edit URLs here as affiliate programs get approved.
 * A blank `url` makes the <AffiliateCard /> render nothing, so pages can ship
 * before approvals come through.
 */

export type AffiliateNetwork = 'amazon' | 'whoop' | 'garmin' | 'direct';

export interface Affiliate {
  url: string;
  label: string;
  blurb: string;
  network: AffiliateNetwork;
  price?: string;
  /** Optional square product image hosted on the CDN. */
  image?: string;
}

const AMAZON_TAG = 'vo2maxcalculator-20';
const amazon = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
const img = (filename: string) => `https://calculatorsites.b-cdn.net/vo2max/products/${filename}`;

export const AFFILIATES: Record<string, Affiliate> = {
  garminFr265: {
    url: amazon('B0BS1T9J4Y'),
    label: 'Garmin Forerunner 265',
    blurb: 'VO2 max, training status, and running dynamics on the wrist.',
    network: 'amazon',
    image: img('garmin-fr265.jpg'),
  },
  garminFr965: {
    url: amazon('B0BS1XZY7T'),
    label: 'Garmin Forerunner 965',
    blurb: 'Top-tier running watch with extended VO2 max and recovery metrics.',
    network: 'amazon',
    image: img('garmin-fr965.jpg'),
  },
  appleWatchUltra: {
    url: amazon('B0DGHRFYMM'),
    label: 'Apple Watch Ultra 2',
    blurb: 'Pairs VO2 max with cardio recovery and workout intensity metrics.',
    network: 'amazon',
    image: img('apple-watch-ultra.jpg'),
  },
  polarH10: {
    url: amazon('B0F69ZP1D8'),
    label: 'Polar H10 Chest Strap',
    blurb: 'Lab-grade HR accuracy. The gold-standard chest strap for most field tests.',
    network: 'amazon',
    image: img('polar-h10.jpg'),
  },
  whoop: {
    url: '',
    label: 'Whoop 5.0',
    blurb: 'Continuous HR and strain tracking, subscription-based.',
    network: 'whoop',
  },
  beepTestAudio: {
    url: '',
    label: 'Beep Test Audio Track',
    blurb: 'Official 20m multi-stage fitness test audio.',
    network: 'amazon',
  },
  stepBench: {
    url: amazon('B07P36V54R'),
    label: 'Reebok Adjustable Step',
    blurb: 'Adjustable-height step for the YMCA 3-minute step test. Queens College (16.25") and Harvard (20") require a taller plyo box.',
    network: 'amazon',
    image: img('reebok-step.jpg'),
  },
};

export type AffiliateKey = keyof typeof AFFILIATES;
