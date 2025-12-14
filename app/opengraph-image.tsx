import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Aumentar Capital - Finanças Pessoais, Investimentos e Empreendedorismo';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F9FAFB 0%, #EFF6FF 50%, #DBEAFE 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo Container */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Logo Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 50%, #1E3A8A 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '24px',
              boxShadow: '0 10px 40px rgba(30, 58, 138, 0.3)',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5-5 5 5" />
              <path d="M7 18l5-5 5 5" />
            </svg>
          </div>

          {/* Logo Text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '56px',
                fontWeight: 700,
                color: '#1E3A8A',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              aumentar
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 800,
                }}
              >
                capital
              </span>
            </span>
            <span
              style={{
                fontSize: '24px',
                color: '#1E3A8A',
                opacity: 0.7,
                marginTop: '4px',
              }}
            >
              .com
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            color: '#64748B',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Finanças Pessoais, Investimentos e Empreendedorismo
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '28px' }}>💰</span>
          <span style={{ fontSize: '28px' }}>📈</span>
          <span style={{ fontSize: '28px' }}>🚀</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
