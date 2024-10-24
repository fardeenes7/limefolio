import './globals.css';
import { Space_Grotesk } from 'next/font/google';

export const metadata = {
  title: {
    default: 'LimeFolio',
    template: '%s | LimeFolio'
  },
  description:
    'A portfolio platform for developers and designers to showcase their work.'
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
      </body>
    </html>
  );
}
