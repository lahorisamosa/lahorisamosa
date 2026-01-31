import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf, Clock, Award, ArrowRight, Star, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

import { useEffect, useState, useRef } from 'react';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  // States for payment confirmation (added to fix build)
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ isSuccess: boolean, message: string, orderId?: string } | null>(null);

  // Force rebuild test
  useEffect(() => {
    console.log('🚀 BUILD TEST - Hash fix deployed at:', new Date().toISOString());
  }, []);



  const heroImage = "/images/hero/heroimage.webp";
  const samosaImage = "/images/products/chickenqeema.webp";

  const features = [
    {
      icon: Leaf,
      title: "Premium Quality",
      description: "Handcrafted with the finest ingredients, sourced directly from trusted suppliers across Pakistan."
    },
    {
      icon: Clock,
      title: "Instant Convenience",
      description: "Restaurant-quality frozen foods ready in minutes, perfect for today's busy lifestyle."
    },
    {
      icon: Award,
      title: "Authentic Taste",
      description: "Traditional recipes passed down through generations, now preserved in modern convenience."
    }
  ];

  // Show payment confirmation if payment parameter is present
  if (searchParams.get('payment') === 'confirmation') {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 max-w-md w-full text-center border border-slate-200 shadow-xl"
        >
          <div className="mb-6 flex justify-center">
            {isLoading ? (
              <Loader2 className="w-20 h-20 text-amber-600 animate-spin" />
            ) : paymentStatus?.isSuccess ? (
              <CheckCircle className="w-20 h-20 text-amber-600" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3 brand-font">
            {isLoading ? 'Processing Payment...' : paymentStatus?.isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h1>

          <p className="text-slate-600 mb-6">
            {isLoading ? 'Please wait while we verify your payment...' : paymentStatus?.message}
          </p>

          {paymentStatus?.orderId && (
            <div className="bg-amber-50 rounded-lg p-3 mb-6 border border-amber-100">
              <p className="text-amber-800 text-sm font-medium">Order Reference</p>
              <p className="font-mono text-lg font-bold text-slate-900">{paymentStatus.orderId}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-lg font-medium"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0 z-0">
          <ResponsiveImage
            src={heroImage}
            alt="Hero Background"
            className="w-full h-full"
            objectFit="cover"
            priority={true}
          />
          {/* Dark Overlay for Readability - Lightened */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-slate-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-52">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <motion.div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-100 text-sm font-medium backdrop-blur-sm"
              >
                Since 2024 • Taste of Lahore
              </motion.span>
              <h1 className="text-6xl sm:text-7xl lg:text-9xl text-white brand-font tracking-tight leading-none drop-shadow-2xl">
                Lahori
                <span className="text-amber-400 italic block mt-2">Samosa</span>
              </h1>
            </motion.div>

            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
              Authentic Pakistani cuisine, expertly crafted and perfectly preserved.
              Experience the royal flavors of tradition.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-5 bg-amber-500 text-slate-950 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2"
                >
                  Explore Menu <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-10 py-5 border border-white/40 text-white rounded-full text-lg hover:border-white transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="flex gap-12 justify-center pt-12 border-t border-white/10 mt-12 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl text-amber-400 brand-font font-bold">7+</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-1">Premium Items</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl text-amber-400 brand-font font-bold">100%</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-1">Halal Certified</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-center">
                <div className="text-3xl text-amber-400 brand-font font-bold">4.9</div>
                <div className="text-xs text-white/70 uppercase tracking-widest mt-1">Customer Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Features Section - Royal Dark Theme (Adaptive) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative transition-colors duration-500">
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--pattern-color) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        {/* Ambient Glows (Dark Mode Only) */}
        <div className="hidden dark:block absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-amber-600 dark:text-amber-400 font-medium tracking-wider text-sm uppercase">Our Promise</span>
            <h2 className="text-4xl text-slate-900 dark:text-white brand-font">
              Why Choose Lahori Samosa?
            </h2>
            <div className="w-24 h-1 bg-amber-400 dark:bg-amber-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm dark:shadow-xl hover:shadow-2xl dark:hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:hidden"></div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-16 h-16 bg-amber-100 dark:bg-gradient-to-br dark:from-amber-400 dark:to-amber-600 rounded-2xl flex items-center justify-center mb-6 text-amber-700 dark:text-slate-950 shadow-inner dark:shadow-lg transition-colors duration-500"
                  >
                    <feature.icon className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-100/80 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Section - Dark Theme Twist */}
      <section className="py-24 bg-slate-950 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* 3D Product Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: 30 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ type: "spring", duration: 1.5 }}
              viewport={{ once: true }}
              className="perspective-1000"
            >
              <motion.div
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                className="relative group bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-3xl border border-white/10 shadow-2xl"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <ResponsiveImage
                    src={samosaImage}
                    alt="Premium Samosas"
                    className="w-full h-[500px]"
                    aspectRatio="4/5"
                    objectFit="cover"
                  />
                  {/* Glass Overlay on Image */}
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                    <div className="text-white">
                      <p className="text-amber-400 font-bold tracking-wider text-sm mb-1 uppercase">Best Seller</p>
                      <h4 className="text-2xl font-serif">Chicken Qeema Samosa</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <span className="text-slate-200 ml-2 text-sm">(2,400+ reviews)</span>
                </div>

                <h3 className="text-4xl lg:text-5xl text-white brand-font leading-tight">
                  The <span className="text-amber-400">Signature</span> Taste
                </h3>

                <p className="text-xl text-slate-100/80 leading-relaxed font-light">
                  Our most popular item - crispy, golden samosas filled with perfectly
                  spiced ingredients. Each bite delivers authentic Pakistani flavors
                  that transport you to the streets of Lahore.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Hand-crafted with traditional recipes",
                  "Premium ingredients, no preservative",
                  "Ready to cook in minutes"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-slate-50 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white text-slate-950 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
                  >
                    Order Now - Rs.450
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action - Royal Dark Theme (Adaptive) */}
      <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-500">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-amber-500/50 to-transparent"></div>
        <div className="hidden dark:block absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-5xl sm:text-6xl text-slate-900 dark:text-white brand-font drop-shadow-none dark:drop-shadow-lg transition-colors duration-500">
              Ready to <span className="text-amber-500 italic">Feast?</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-100/80 max-w-2xl mx-auto leading-relaxed transition-colors duration-500">
              Join thousands of satisfied customers who trust Lahori Samosa
              for their authentic Pakistani cuisine needs.
            </p>
          </motion.div>

          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Shopping Now
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
