import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          y: 0,
          x: "-50%",
          opacity: 1,
          width: isScrolled ? 'auto' : '100%',
          top: isScrolled ? '1.5rem' : '0',
          borderRadius: isScrolled ? '50px' : '0',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={`fixed left-1/2 z-50 ${isScrolled
          ? 'glass-panel shadow-lg min-w-[320px]'
          : 'bg-transparent border-none'
          }`}
      >
        <div className={`mx-auto px-6 sm:px-8 ${isScrolled ? 'py-3' : 'py-6'}`}>
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <span className={`text-2xl brand-font tracking-tight font-bold ${isScrolled ? 'text-emerald-900 dark:text-white' : 'text-white'}`}>
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
                    ? 'text-amber-500'
                    : isScrolled ? 'text-slate-600 hover:text-emerald-700 dark:text-emerald-100 dark:hover:text-amber-400' : 'text-emerald-100 hover:text-white'
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
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* CTA Button */}
              <Link to="/products" className="hidden lg:block">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 20px -8px rgba(16, 185, 129, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md flex items-center gap-2 ${isScrolled
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white dark:from-amber-500 dark:to-amber-600 dark:text-emerald-950'
                    : 'bg-white text-emerald-900 hover:bg-emerald-50 dark:bg-emerald-900/80 dark:text-emerald-50 dark:hover:bg-emerald-800'
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
                  className={`relative p-2 rounded-full transition-colors ${isScrolled
                    ? 'text-slate-600 hover:text-emerald-800 bg-slate-50/50 dark:text-emerald-100 dark:hover:text-amber-400 dark:bg-white/5'
                    : 'text-white hover:text-amber-400 bg-white/10 backdrop-blur-sm'
                    }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-full transition-colors ${isScrolled
                  ? 'text-slate-600 hover:text-emerald-800 bg-slate-50/50 dark:text-white dark:bg-white/10'
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
                        ? 'text-emerald-900 bg-emerald-50/80 border border-emerald-100'
                        : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/50'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 mt-4 bg-emerald-700 text-white rounded-xl text-sm font-medium shadow-md"
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