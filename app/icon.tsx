import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation - Aumentar Capital logo (soft arches + diamond)
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 68 52"
          fill="white"
        >
          <path d="M6 46 Q14 30 22 46 Z" />
          <path d="M20 46 Q30 24 40 46 Z" />
          <path d="M38 46 Q50 16 62 46 Z" />
          <polygon points="50,10 54,16 50,22 46,16" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
