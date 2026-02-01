import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { state } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show on scroll up or at top, hide on scroll down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <motion.header
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          x: "-50%",
          opacity: 1,
          width: isScrolled ? 'auto' : '100%',
          top: isScrolled ? '1rem' : '0', // Slightly reduced top offset
          borderRadius: isScrolled ? '50px' : '0',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1], // out-expo
        }}
        className={`fixed left-1/2 z-50 ${isScrolled
          ? 'glass-panel shadow-lg min-w-[280px] sm:min-w-[320px]' // Smaller min-width for mobile
          : 'bg-transparent border-none'
          }`}
      >
        <div className={`mx-auto px-4 sm:px-8 ${isScrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-6'}`}>
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <span className={`text-base sm:text-2xl brand-font tracking-tight font-bold transition-colors duration-300 ${isScrolled || location.pathname !== '/'
                  ? 'text-slate-900 dark:text-white'
                  : 'text-white'
                  }`}>
                  Lahori<span className="text-amber-500 italic"> Samosa</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                    ? 'text-amber-600 dark:text-amber-500'
                    : isScrolled || location.pathname !== '/'
                      ? 'text-slate-600 hover:text-amber-600 dark:text-slate-100 dark:hover:text-amber-400'
                      : 'text-slate-100 hover:text-white'
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>



            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="block">
                <ThemeToggle />
              </div>

              {/* CTA Button */}
              <Link to="/products" className="hidden lg:block">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 20px -8px rgba(245, 158, 11, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md flex items-center gap-2 ${isScrolled
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:from-amber-500 hover:to-amber-400'
                    : location.pathname !== '/'
                      ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                      : 'bg-white text-slate-900 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                  Order Now
                </motion.button>
              </Link>

              {/* Cart Button */}
              <Link to="/cart">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative p-1.5 sm:p-2 rounded-full transition-colors ${isScrolled || location.pathname !== '/'
                    ? 'text-slate-600 hover:text-amber-600 bg-slate-50/50 dark:text-slate-100 dark:hover:text-amber-400 dark:bg-white/5'
                    : 'text-white hover:text-amber-400 bg-white/10 backdrop-blur-sm'
                    }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold shadow-sm"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-1.5 sm:p-2 rounded-full transition-colors ${isScrolled
                  ? 'text-slate-600 hover:text-amber-600 bg-slate-50/50 dark:text-white dark:bg-white/10'
                  : 'text-white hover:text-amber-400 bg-white/10 backdrop-blur-sm'
                  }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2 border-t border-slate-200/60 mt-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors rounded-xl ${location.pathname === link.path
                        ? 'text-slate-900 bg-amber-50/80 border border-amber-100'
                        : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50/50'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 mt-3 bg-amber-500 text-slate-950 rounded-xl text-sm font-medium shadow-md"
                  >
                    Order Now
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}