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
import { LuxuryLoader } from './components/LuxuryLoader';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [footerHeight, setFooterHeight] = React.useState(0);

  // Robust height measurement that works even after the loader finishes
  const footerMeasureRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setFooterHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(node);
    }
  }, []);

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <CartProvider>
          <AnimatePresence mode="wait">
            {loading ? (
              <LuxuryLoader key="loader" onComplete={() => setLoading(false)} />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col min-h-screen"
              >
                <Router>
                  <ScrollToTop />
                  <div className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
                    <Header />

                    <main
                      className="flex-1 relative z-20 bg-white dark:bg-slate-900 rounded-b-[3.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500"
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
                          <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Suspense>
                    </main>

                    <div
                      ref={footerMeasureRef}
                      className="fixed bottom-0 left-0 right-0 z-0 bg-slate-900 dark:bg-black"
                    >
                      <Footer />
                    </div>
                  </div>
                  <SideCart />
                </Router>
              </motion.div>
            )}
          </AnimatePresence>
        </CartProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}