import { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';
import { SEO } from './SEO';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ... (rest of simple state/handlers can stay but let's just use exact lines to avoid drift)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Supabase (for Admin Panel)
      const { error: dbError } = await supabase
        .from('messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          read: false
        }]);

      if (dbError) throw dbError;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: import.meta.env.VITE_BUSINESS_PHONE || "+92 324 4060113",
      description: "Available 9 AM - 8 PM, Monday to Saturday",
      action: `tel:${import.meta.env.VITE_BUSINESS_PHONE?.replace(/\s/g, '') || '+923244060113'}`
    },
    {
      icon: Mail,
      title: "Email",
      details: import.meta.env.VITE_BUSINESS_EMAIL || "info.lahorisamosa@gmail.com",
      description: "We'll respond within 24 hours",
      action: `mailto:${import.meta.env.VITE_BUSINESS_EMAIL || 'info.lahorisamosa@gmail.com'}`
    },
    {
      icon: MapPin,
      title: "Location",
      details: import.meta.env.VITE_BUSINESS_LOCATION || "Lahore, Pakistan",
      description: "We deliver across Lahore city",
      action: ""
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: import.meta.env.VITE_BUSINESS_PHONE || "+92 324 4060113",
      description: "Quick support and order updates",
      action: `https://wa.me/${import.meta.env.VITE_BUSINESS_PHONE?.replace(/\s/g, '') || '923244060113'}`
    }
  ];

  const faqs = [
    {
      question: "How long do your products stay fresh?",
      answer: "Our frozen products have a shelf life of 6 months when stored properly in a freezer at -18°C or below."
    },
    {
      question: "Do you deliver outside Lahore?",
      answer: "Currently, we only deliver within Lahore city limits. We're planning to expand to other cities soon."
    },
    {
      question: "What are your cooking instructions?",
      answer: "Detailed cooking instructions are provided with each product. Generally, most items can be deep-fried or baked from frozen in 8-10 minutes."
    },
    {
      question: "Do you offer bulk orders for events?",
      answer: "Yes! We offer special pricing for bulk orders. Please contact us directly to discuss your requirements."
    }
  ];

  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <SEO
        title="Contact Us"
        description="Get in touch with Lahori Samosa. Call us, WhatsApp, or visit us in Lahore for bulk orders and frozen food delivery."
        canonical="https://lahorisamosa.com/contact"
      />
      {/* Hero Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl text-white brand-font tracking-tight">
              Get in <span className="text-amber-500 italic">Touch</span>
            </h1>
            <p className="text-xl text-slate-100/80 max-w-3xl mx-auto leading-relaxed font-light">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-200 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  rotateX: 5
                }}
                className="group text-center p-8 bg-white dark:bg-slate-900 rounded-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800 cursor-pointer"
                onClick={() => info.action && window.open(info.action, info.action.startsWith('http') ? '_blank' : '_self')}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300"
                >
                  <info.icon className="w-8 h-8 text-amber-700" />
                </motion.div>
                <h3 className="text-lg text-slate-900 dark:text-white mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                  {info.title}
                </h3>
                <p className="text-amber-700 mb-2 font-medium">{info.details}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Business Hours */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-2xl text-slate-900 dark:text-white mb-6 flex items-center brand-font">
                <Send className="w-6 h-6 mr-3 text-slate-700" />
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="complaint">Complaint</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -8px rgba(245, 158, 11, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 sm:py-4 bg-slate-900 dark:bg-amber-600 text-white dark:text-slate-950 rounded-lg hover:bg-slate-800 dark:hover:bg-amber-500 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg"
                >
                  <p className="text-amber-800 text-sm">
                    ✅ Message sent successfully! We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Business Hours & Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Business Hours */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl text-slate-900 dark:text-white mb-6 flex items-center brand-font">
                  <Clock className="w-6 h-6 mr-3 text-amber-700" />
                  Business Hours
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Monday - Friday</span>
                    <span className="text-amber-700 font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Saturday</span>
                    <span className="text-amber-700 font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Sunday</span>
                    <span className="text-red-600 font-medium">Closed</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> WhatsApp support is available 24/7 for urgent inquiries and order updates.
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl mb-4 brand-font">Need Immediate Help?</h3>
                  <p className="mb-6 text-slate-100 leading-relaxed">
                    For urgent inquiries or immediate assistance, reach out to us directly:
                  </p>

                  <div className="space-y-4">
                    <motion.a
                      href="tel:+923244060113"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Call Now</div>
                        <div className="text-white text-sm">{import.meta.env.VITE_BUSINESS_PHONE || "+92 324 4060113"}</div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://wa.me/923244060113"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-white text-sm">{import.meta.env.VITE_BUSINESS_PHONE || "+92 324 4060113"}</div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-slate-950 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-4xl text-slate-900 dark:text-white brand-font">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 25px -8px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 border border-slate-100 dark:border-slate-800"
              >
                <h3 className="text-lg text-slate-900 dark:text-white mb-3 font-medium">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}