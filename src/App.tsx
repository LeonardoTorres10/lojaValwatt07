import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import PageLoading from './components/ui/PageLoading';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const PedidoConfirmadoPage = lazy(() => import('./pages/PedidoConfirmadoPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MinhaContaPage = lazy(() => import('./pages/MinhaContaPage'));

const qc = new QueryClient({ defaultOptions: { queries: { staleTime: 300000, retry: 2 } } });

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={qc}>
        <BrowserRouter>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="produtos" element={<ProductsPage />} />
                <Route path="produtos/:handle" element={<ProductDetailPage />} />
                <Route path="categoria/:slug" element={<CategoryPage />} />
                <Route path="carrinho" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="pedido-confirmado" element={<PedidoConfirmadoPage />} />
                <Route path="busca" element={<SearchPage />} />
                <Route path="sobre" element={<AboutPage />} />
                <Route path="contato" element={<ContactPage />} />
                <Route path="minha-conta" element={<MinhaContaPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="bottom-right" richColors expand closeButton />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
