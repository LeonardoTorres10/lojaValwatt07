import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import ScrollToTop from './ScrollToTop';
import CartDrawer from '../cart/CartDrawer';
import ScrollToTopOnMount from './ScrollToTopOnMount';

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-azul-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:font-semibold focus:text-sm">
        Pular para o conteúdo principal
      </a>
      <ScrollToTopOnMount />
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <CartDrawer />
    </>
  );
}
