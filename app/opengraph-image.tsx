import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'VO2 Max Calculator — 17 validated tests, Cooper Institute norms';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const HERO = 'https://calculatorsites.b-cdn.net/vo2max/hero-og.jpg';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        <img
          src={HERO}
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(2,6,23,0.88) 0%, rgba(15,23,42,0.72) 55%, rgba(15,23,42,0.25) 100%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 30,
            padding: '72px 80px 0',
            opacity: 0.88,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#5eead4' }} />
          VO2 Max Calculator
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: '0 80px',
            maxWidth: 920,
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.02em' }}>
            Free VO2 max calculator.
          </div>
          <div style={{ fontSize: 36, fontWeight: 500, opacity: 0.92 }}>
            17 validated field tests. Cooper Institute percentile norms.
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            opacity: 0.85,
            padding: '0 80px 64px',
          }}
        >
          <div>Cooper · 1.5-mile · Rockport · Åstrand · Bruce · Beep test</div>
          <div style={{ fontWeight: 600 }}>vo2maxcalculators.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
