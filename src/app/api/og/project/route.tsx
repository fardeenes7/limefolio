import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { SiteConfig } from '@/lib/site-config';
import { loadGoogleFont } from '@/lib/font';

export const runtime = 'edge';

export const contentType = 'image/png';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || SiteConfig.title;
  const description = searchParams.get('description') || SiteConfig.description;
  const iconUrl = new URL('/icon.svg', req.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          fontFamily: 'Space Grotesk',
          padding: '40px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              color: '#000',
              display: 'block',
              fontSize: '84px',
              fontWeight: 'bold',
              marginBottom: '16px',
              lineClamp: 2
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <img src={iconUrl} width="70" height="70" />
          <span
            style={{
              marginLeft: '16px',
              color: '#000',
              fontSize: '48px',
              fontWeight: 'bold'
            }}
          >
            {SiteConfig.title}
          </span>
        </div>
        <div
          style={{
            height: '5%',
            width: '120%',
            backgroundColor: '#ABE84E',
            position: 'absolute',
            bottom: '0',
            left: '0'
          }}
        ></div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('Space Grotesk', title),
          style: 'normal'
        }
      ]
    }
  );
}
