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
}

export const AFFILIATES: Record<string, Affiliate> = {
  garminFr265: {
    url: '',
    label: 'Garmin Forerunner 265',
    blurb: 'VO2 max, training status, and running dynamics on the wrist.',
    network: 'amazon',
  },
  garminFr965: {
    url: '',
    label: 'Garmin Forerunner 965',
    blurb: 'Top-tier running watch with extended VO2 max and recovery metrics.',
    network: 'amazon',
  },
  appleWatchUltra: {
    url: '',
    label: 'Apple Watch Ultra 2',
    blurb: 'Pairs VO2 max with cardio recovery and workout intensity metrics.',
    network: 'amazon',
  },
  polarH10: {
    url: '',
    label: 'Polar H10 Chest Strap',
    blurb: 'Lab-grade HR accuracy. The gold-standard chest strap for most field tests.',
    network: 'amazon',
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
    url: '',
    label: 'Adjustable Step Bench',
    blurb: 'Use at 12", 16.25", or 20" for the YMCA, Queen\'s, or Harvard step tests.',
    network: 'amazon',
  },
};

export type AffiliateKey = keyof typeof AFFILIATES;
