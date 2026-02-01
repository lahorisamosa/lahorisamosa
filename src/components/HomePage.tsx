import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf, Clock, Award, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

import { useEffect, useRef } from 'react';

import { SEO } from './SEO';

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);


  // Force rebuild test
  useEffect(() => {
    console.log('🚀 BUILD TEST - Hash fix deployed at:', new Date().toISOString());
  }, []);



  const heroImage = "/images/hero/heroimage.webp";
  const mobileHeroImage = "/images/hero/hero-mobile.webp";
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


  return (
    <div className="bg-white overflow-hidden" ref={containerRef}>
      <SEO
        title="Home"
        description="Welcome to Lahori Samosa. Authentic hand-crafted samosas and Pakistani street food delivered frozen to your doorstep in Lahore."
        canonical="https://lahorisamosa.com"
      />
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative w-full aspect-[9/16] md:aspect-auto md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Static Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Image (Landscape) */}
          <div className="hidden md:block w-full h-full">
            <ResponsiveImage
              src={heroImage}
              alt="Hero Background Desktop"
              className="w-full h-full object-center"
              objectFit="cover"
              priority={true}
            />
          </div>

          {/* Mobile Image (Portrait) */}
          <div className="block md:hidden w-full h-full">
            <ResponsiveImage
              src={mobileHeroImage}
              alt="Hero Background Mobile"
              className="w-full h-full object-center"
              objectFit="cover"
              priority={true}
            />
          </div>

          {/* Lightened Overlay for maximum image visibility */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center h-full pt-16 sm:pt-0 pb-8 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-3 sm:space-y-8 max-w-4xl w-full text-left sm:text-center mx-auto"
          >
            <motion.div className="space-y-2 sm:space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-100 text-[10px] sm:text-sm font-medium backdrop-blur-md"
              >
                Since 2024 • Taste of Lahore
              </motion.span>
              <h1 className="text-4xl sm:text-7xl lg:text-9xl text-white brand-font tracking-tight leading-none drop-shadow-2xl">
                Lahori
                <span className="text-amber-400 italic block mt-0 sm:mt-2">Samosa</span>
              </h1>
            </motion.div>

            <p className="text-base sm:text-2xl text-white/90 max-w-xl sm:mx-auto leading-relaxed font-light drop-shadow-lg pr-4 sm:pr-0">
              Authentic Pakistani cuisine, expertly crafted and perfectly preserved.
              Experience the royal flavors of tradition.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-3 sm:pt-8 w-full max-w-md sm:max-w-none sm:justify-center"
            >
              <Link to="/products" className="w-auto inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-auto min-w-[120px] sm:min-w-[140px] px-5 py-2.5 sm:px-6 sm:py-3 bg-amber-500 text-slate-950 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2"
                >
                  Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                </motion.button>
              </Link>

              <Link to="/contact" className="w-auto inline-block">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-auto min-w-[120px] sm:min-w-[140px] px-5 py-2.5 sm:px-6 sm:py-3 border border-white/40 text-white rounded-full text-xs sm:text-sm hover:border-white transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats - Left aligned on mobile, center on desktop */}
            <div className="flex gap-6 sm:gap-12 pt-4 sm:pt-12 border-t border-white/10 mt-4 sm:mt-12 w-full max-w-md sm:max-w-lg sm:mx-auto sm:justify-center">
              <div className="text-left sm:text-center">
                <div className="text-xl sm:text-3xl text-amber-400 brand-font font-bold">7+</div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest mt-1">Items</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-left sm:text-center">
                <div className="text-xl sm:text-3xl text-amber-400 brand-font font-bold">100%</div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest mt-1">Halal</div>
              </div>
              <div className="w-px bg-white/10"></div>
              <div className="text-left sm:text-center">
                <div className="text-xl sm:text-3xl text-amber-400 brand-font font-bold">4.9</div>
                <div className="text-[10px] sm:text-xs text-white/70 uppercase tracking-widest mt-1">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-3 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[8px] sm:text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-4 sm:h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
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
                    className="px-6 py-3 sm:px-10 sm:py-4 bg-white text-slate-950 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 text-sm sm:text-base"
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
              className="px-8 py-3.5 sm:px-12 sm:py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl text-base sm:text-xl font-bold hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Shopping Now
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
