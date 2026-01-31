import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingFallback } from './components/LoadingFallback';
import { CartProvider } from './components/CartContext';
import { ScrollToTop } from './components/ScrollToTop';
import { SideCart } from './components/SideCart';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages for performance
const HomePage = React.lazy(() => import('./components/HomePage').then(module => ({ default: module.HomePage })));
const ProductsPage = React.lazy(() => import('./components/ProductsPage').then(module => ({ default: module.ProductsPage })));
const ProductDetailPage = React.lazy(() => import('./components/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const CartPage = React.lazy(() => import('./components/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = React.lazy(() => import('./components/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const PaymentMethodPage = React.lazy(() => import('./components/PaymentMethodPage').then(module => ({ default: module.PaymentMethodPage })));
const ConfirmationPage = React.lazy(() => import('./components/ConfirmationPage').then(module => ({ default: module.ConfirmationPage })));
const PaymentConfirmation = React.lazy(() => import('./components/PaymentConfirmation').then(module => ({ default: module.PaymentConfirmation })));
const AboutPage = React.lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = React.lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));
const PrivacyPolicyPage = React.lazy(() => import('./components/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = React.lazy(() => import('./components/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
// ShippingInfoPage is likely small, but lazy loading for consistency
const ShippingInfoPage = React.lazy(() => import('./components/ShippingInfoPage').then(module => ({ default: module.ShippingInfoPage })));


import { ThemeProvider } from './components/ThemeContext';

export default function App() {
  const [footerHeight, setFooterHeight] = React.useState(0);
  const footerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!footerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFooterHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(footerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 transition-colors duration-500 flex flex-col relative">
              <Header />

              <main
                className="flex-1 relative z-10 bg-white dark:bg-emerald-900 rounded-b-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-colors duration-500"
                style={{ marginBottom: `${footerHeight}px` }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/payment-method" element={<PaymentMethodPage />} />
                    <Route path="/confirmation/:orderId" element={<ConfirmationPage />} />
                    <Route path="/confirmation" element={<PaymentConfirmation />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                    <Route path="/shipping-info" element={<ShippingInfoPage />} />
                    {/* Handle preview page and any other unmatched routes */}
                    <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>

              <div
                ref={footerRef}
                className="fixed bottom-0 left-0 right-0 z-0 bg-emerald-950 dark:bg-black transition-colors duration-500"
              >
                <Footer />
              </div>
            </div>
            <SideCart />
          </Router>
        </CartProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}