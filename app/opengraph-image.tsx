import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VO2 Max Calculator — Free tool, 17 validated tests';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #0f766e 0%, #115e59 60%, #042f2e 100%)',
          color: 'white',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, opacity: 0.85 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: '#5eead4' }} />
          VO2 Max Calculator
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Free VO2 max calculator.
          </div>
          <div style={{ fontSize: 40, fontWeight: 500, opacity: 0.92 }}>
            17 validated field tests. Cooper Institute percentile norms.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 26,
            opacity: 0.8,
          }}
        >
          <div>Cooper 12-min · 1.5-mile · Rockport · Åstrand · Bruce · and more</div>
          <div style={{ fontWeight: 600 }}>vo2max-calculator.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
