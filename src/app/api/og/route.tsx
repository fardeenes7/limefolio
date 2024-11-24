import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '@/lib/font';
import Icon from '@/../public/icon.svg';
import { NextRequest } from 'next/server';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'limefolio.com';
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export async function GET(req: NextRequest) {
  const title = 'limefolio';
  const description = 'Showcase Your Creative Journey';
  const iconUrl = new URL('/icon.svg', req.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontFamily: 'Space Grotesk',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={iconUrl} width="120" height="120" />
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            color: 'black',
            marginTop: 30,
            whiteSpace: 'pre-wrap',
            fontWeight: '900'
          }}
        >
          limefolio.com
        </div>
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
