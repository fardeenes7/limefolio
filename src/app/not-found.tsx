import Footer from './(landing)/footer';
import Header from './(landing)/header';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-between">
      <Header />
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-3xl">Oops!</h2>
        <h3 className="text-2xl font-bold">404 Not Found</h3>
        <p>The resource you&apos;re looking for couldn&apos;t be found.</p>
      </div>
      <Footer />
    </div>
  );
}
