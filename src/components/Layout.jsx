import { Outlet } from 'react-router-dom';
import Header from './custom/Header';
import Footer from './custom/Footer';
import { Toaster } from './ui/toaster';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;

