import { ImageResponse } from 'next/og';

export const alt = 'Gérard Fauré — Writer and witness';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'flex-start',
          background: '#0B0B0B',
          color: '#F2ECE1',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '78px 88px',
          position: 'relative',
          width: '100%',
        }}
      >
        <div style={{ color: '#C9A465', fontFamily: 'sans-serif', fontSize: 23, letterSpacing: 7 }}>
          WRITER · WITNESS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'serif', fontSize: 104, letterSpacing: 3, lineHeight: 1.02, marginTop: 26 }}>
          GÉRARD<br />FAURÉ
        </div>
        <div style={{ background: '#C9A465', bottom: 82, height: 4, position: 'absolute', width: 96 }} />
      </div>
    ),
    size,
  );
}
