import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, FileText, CreditCard, Truck, RotateCcw, User, Shield, AlertTriangle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsOfServicePage() {
  const sections = [
    {
      icon: FileText,
      title: "Use of Website",
      content: [
        "You agree to use this website only for lawful purposes.",
        "You must not misuse the site, attempt to hack it, or disrupt its operation."
      ]
    },
    {
      icon: CreditCard,
      title: "Orders and Payments",
      content: [
        "All orders placed through our website are subject to availability.",
        "Prices are listed in Pakistani Rupees (PKR) and may change without prior notice.",
        "Payments must be made using the methods available on our website."
      ]
    },
    {
      icon: Truck,
      title: "Delivery and Pickup",
      content: [
        "We aim to deliver your orders on time; however, delivery times may vary due to traffic, weather, or other conditions.",
        "Delivery charges may apply depending on your location.",
        "Customers are responsible for providing correct delivery details."
      ]
    },
    {
      icon: RotateCcw,
      title: "Refunds and Cancellations",
      content: [
        "Orders once confirmed cannot always be canceled.",
        "Refunds may be offered only in cases of wrong, incomplete, or damaged orders.",
        "For refund or complaint requests, please contact us within 24 hours of receiving your order."
      ]
    },
    {
      icon: User,
      title: "User Accounts (if applicable)",
      content: [
        "If you create an account, you are responsible for maintaining confidentiality of your login details.",
        "You agree to provide accurate and updated information."
      ]
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      content: [
        "All content on this website (logo, text, images) is owned by Lahori Samosa and cannot be copied, used, or reproduced without permission."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "We are not responsible for delays, damages, or losses beyond our reasonable control.",
        "Consumption of our products is at your own risk if you have allergies or dietary restrictions."
      ]
    }
  ];

  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      {/* Page Header - Matches ProductsPage.tsx */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Link
              to="/"
              className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <h1 className="text-5xl lg:text-6xl brand-font tracking-tight">
              Terms of <span className="text-amber-400 italic">Service</span>
            </h1>
            <p className="text-xl text-slate-100/80 max-w-2xl mx-auto leading-relaxed font-light">
              Welcome to Lahori Samosa. By accessing our services, you agree to these terms.
            </p>
            <p className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                // Card styling matching Product Grid items
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(245,158,11,0.1)] transition-all duration-500"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-100 dark:border-slate-700">
                    <section.icon className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div className="space-y-4 flex-1">
                    <h2 className="text-2xl text-slate-900 dark:text-white font-bold">
                      {section.title}
                    </h2>
                    <div className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Changes to Terms */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] mt-12"
            >
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-amber-50 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-100 dark:border-slate-700">
                  <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="space-y-4 flex-1">
                  <h2 className="text-2xl text-slate-900 dark:text-white font-bold">
                    Changes to Terms
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We may update these Terms of Service at any time. Updates will be posted on this page with the new effective date.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-500 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 brand-font">
              Questions About These Terms?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              If you have any questions, please reach us at:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <motion.a
                href="mailto:samosastash@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-slate-100 dark:bg-slate-800 rounded-lg px-6 py-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <span className="text-slate-900 dark:text-white">samosastash@gmail.com</span>
              </motion.a>

              <motion.a
                href="tel:+923244060113"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-3 bg-slate-100 dark:bg-slate-800 rounded-lg px-6 py-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <span className="text-slate-900 dark:text-white">+92 324 4060113</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
