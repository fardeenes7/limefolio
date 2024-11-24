import Footer from './footer';
import Header from './header';

export default function LandingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">{children}</div>
      <Footer />
    </div>
  );
}
