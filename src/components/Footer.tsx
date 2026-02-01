import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          setStatus('success'); // Treat as success to not annoy user
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://wa.me/923244060113', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-10 md:pt-20 pb-8 md:pb-10 relative overflow-hidden font-sans border-t border-white/5">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-slate-900/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Glass Texture Overlay */}
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">

          {/* BrandSection */}
          <div className="space-y-4 md:space-y-6 lg:col-span-1">
            <Link to="/" onClick={handleLinkClick} className="block group">
              <div className="text-2xl md:text-3xl brand-font tracking-tight text-white group-hover:opacity-90 transition-opacity">
                Lahori<span className="text-amber-400 italic"> Samosa</span>
              </div>
            </Link>
            <p className="text-slate-100/70 text-sm leading-relaxed max-w-xs">
              Experience the authentic taste of Lahore. Premium handcrafted frozen foods delivered to your doorstep.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-400 rounded-lg flex items-center justify-center text-white transition-all duration-300 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-base md:text-lg font-bold text-amber-400 mb-4 md:mb-6 font-serif tracking-wide">Quick Links</h3>
            <ul className="space-y-3 md:space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className="group flex items-center text-sm text-slate-100/70 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-0 opacity-0 group-hover:opacity-100 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-bold text-amber-400 mb-3 md:mb-6 font-serif tracking-wide">Contact Us</h3>
            <ul className="space-y-3 md:space-y-5">
              <li className="flex items-start gap-4 text-sm text-slate-100/80 group">
                <div className="p-1.5 md:p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-amber-500/50 transition-colors">
                  <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  <span className="block text-xs text-slate-100/50 uppercase tracking-wider font-semibold">Phone</span>
                  <span className="block font-medium text-white text-xs md:text-sm">{import.meta.env.VITE_BUSINESS_PHONE || "+92 324 4060113"}</span>
                </div>
              </li>

              <li className="flex items-start gap-4 text-sm text-slate-100/80 group">
                <div className="p-1.5 md:p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-amber-500/50 transition-colors">
                  <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  <span className="block text-xs text-slate-100/50 uppercase tracking-wider font-semibold">Email</span>
                  <span className="block font-medium text-white text-xs md:text-sm">{import.meta.env.VITE_BUSINESS_EMAIL || "info.lahorisamosa@gmail.com"}</span>
                </div>
              </li>

              <li className="flex items-start gap-4 text-sm text-slate-100/80 group">
                <div className="p-1.5 md:p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-amber-500/50 transition-colors">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  <span className="block text-xs text-slate-100/50 uppercase tracking-wider font-semibold">Location</span>
                  <span className="block font-medium text-white text-xs md:text-sm">{import.meta.env.VITE_BUSINESS_LOCATION || "Lahore, Pakistan"}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-base md:text-lg font-bold text-amber-400 mb-4 md:mb-6 font-serif tracking-wide">Stay Updated</h3>
            <p className="text-sm text-slate-100/70 mb-4 leading-relaxed">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500_50 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-50"
                  disabled={status === 'loading' || status === 'success'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-1 top-1 p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md transition-colors disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-xs text-green-400">Thanks for subscribing!</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-400">Something went wrong. Try again.</p>
              )}
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="my-8 md:my-12 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-xs md:text-sm text-slate-100/50">
            © {new Date().getFullYear()} Lahori Samosa. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-slate-100/60 font-medium">
            <Link to="/privacy-policy" onClick={handleLinkClick} className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" onClick={handleLinkClick} className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link to="/shipping-info" onClick={handleLinkClick} className="hover:text-amber-400 transition-colors">Shipping Info</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}