import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#0B0B0B',
          color: '#F2ECE1',
          display: 'flex',
          fontFamily: 'serif',
          fontSize: 72,
          height: '100%',
          justifyContent: 'center',
          letterSpacing: '-0.08em',
          position: 'relative',
          width: '100%',
        }}
      >
        GF
        <div style={{ background: '#C9A465', bottom: 24, height: 4, position: 'absolute', width: 92 }} />
      </div>
    ),
    size,
  );
}
