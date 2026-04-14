import { ImageResponse } from 'next/og';
import { METHODS, getMethod } from '@/lib/methods';

export const runtime = 'nodejs';
export const alt = 'VO2 max calculator for this test method';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata() {
  return METHODS.map((m) => ({ id: m.slug, alt: `${m.displayName} VO2 max calculator` }));
}

export default function MethodOgImage({ params }: { params: { slug: string } }) {
  const method = (() => {
    try {
      return getMethod(params.slug);
    } catch {
      return null;
    }
  })();

  const title = method?.displayName ?? 'VO2 Max Test';
  const subtitle = method?.description ?? 'Field test for estimating aerobic capacity.';
  const accuracy = method?.accuracy ?? '';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, opacity: 0.85 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: '#5eead4' }} />
          VO2 Max Calculator
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {title}
          </div>
          <div style={{ fontSize: 32, fontWeight: 400, opacity: 0.92, lineHeight: 1.3 }}>
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          <div>
            {accuracy ? (
              <span>
                Accuracy: <span style={{ fontWeight: 700 }}>{accuracy}</span>
              </span>
            ) : null}
          </div>
          <div style={{ fontWeight: 600 }}>vo2maxcalculators.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
