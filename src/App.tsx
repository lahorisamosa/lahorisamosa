import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
const AdminLogin = React.lazy(() => import('./components/admin/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
import { RequireAdmin } from './components/admin/RequireAdmin';


import { ThemeProvider } from './components/ThemeContext';
import { LuxuryLoader } from './components/LuxuryLoader';

import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [footerHeight, setFooterHeight] = React.useState(0);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Hide Brevo Chat during loading
  React.useEffect(() => {
    // The ID for the Brevo widget container often varies or is dynamically injected. 
    // Usually it's #brevo-conversations or similar. 
    // A safer bet is to use a global style that hides the specific widget class or ID.
    // Brevo usually injects a div with ID 'brevo-conversations-root' or similar.

    if (loading) {
      const style = document.createElement('style');
      style.id = 'hide-brevo-style';
      style.innerHTML = `
        #brevo-conversations-root, 
        .brevo-conversations-widget,
        iframe[id^="brevo-"] { 
          display: none !important; 
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(style);
      return () => {
        const existingStyle = document.getElementById('hide-brevo-style');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, [loading]);

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

  // For Admin: Render simpler layout (No Luxury Loader, No Header/Footer)
  if (isAdmin) {
    return (
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-950 text-white">Loading Admin...</div>}>
            <Routes>
              <Route path="/admin" element={<Navigate to="/admin/login" />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  // For Main Site: Render Full Layout
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
                <ScrollToTop />
                <div className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
                  <div className="relative z-[10000]">
                    <Header />
                  </div>

                  <main
                    className="flex-1 relative z-20 bg-white dark:bg-slate-900 rounded-b-[2rem] md:rounded-b-[4rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500 mb-[var(--footer-height)]"
                    style={{ '--footer-height': `${footerHeight}px` } as React.CSSProperties}
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
                        {/* Admin routes included here just in case of weird routing, but caught above currently */}
                      </Routes>
                    </Suspense>
                  </main>

                  <div
                    ref={footerMeasureRef}
                    className="fixed bottom-0 left-0 right-0 z-0 bg-slate-950"
                  >
                    <Footer />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!loading && (
            <>
              <SideCart />
            </>
          )}
        </CartProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}