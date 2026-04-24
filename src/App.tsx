import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 2 } }
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="produtos" element={<ProductsPage />} />
              <Route path="produtos/:handle" element={<ProductDetailPage />} />
              <Route path="categoria/:slug" element={<CategoryPage />} />
              <Route path="carrinho" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="busca" element={<SearchPage />} />
              <Route path="sobre" element={<AboutPage />} />
              <Route path="contato" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" richColors />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
