import './globals.css';
import './prose-mirror.css';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: {
    default: 'LimeFolio',
    template: '%s | LimeFolio'
  },
  description: 'Showcase Your Creative Journey',
  keywords:
    'portfolio, creative, showcase, creative works, project portfolio, limefolio, limefolio.com, wordpress alternative, alternatives for wordpress, creative portfolio, portfolio website, portfolio platform, portfolio builder, portfolio maker, portfolio creator, portfolio hosting, portfolio design, portfolio showcase, portfolio gallery, portfolio templates, portfolio themes, portfolio examples, portfolio inspiration, portfolio ideas, portfolio layout, portfolio website design, portfolio website templates, portfolio website examples, portfolio website inspiration, portfolio website ideas, portfolio website layout, portfolio website design ideas, portfolio website design inspiration, portfolio website design layout, portfolio website design examples, portfolio website design templates, portfolio website design themes, portfolio website design gallery, portfolio website design showcase, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website design inspiration gallery, portfolio website design layout gallery, portfolio website design examples gallery, portfolio website design templates gallery, portfolio website design themes gallery, portfolio website design showcase gallery, portfolio website design ideas gallery, portfolio website',
  openGraph: {
    type: 'website',
    url: 'https://limefolio.com',
    description: 'Showcase Your Creative Journey',
    siteName: 'LimeFolio',
    images: [{ url: '/api/og' }]
  }
};

const space_grotesk = Space_Grotesk({
  display: 'swap',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen w-full flex-col ${space_grotesk.className}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
