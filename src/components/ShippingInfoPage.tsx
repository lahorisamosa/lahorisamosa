import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, MapPin, Clock, DollarSign, Package, Truck, AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ShippingInfoPage() {
  const sections = [
    {
      icon: MapPin,
      title: "Delivery Areas",
      content: [
        "We currently deliver within Lahore city and selected nearby areas.",
        "If your address is outside our coverage, we will inform you before confirming your order."
      ]
    },
    {
      icon: Clock,
      title: "Delivery Time",
      content: [
        "Standard delivery time: Same day or next day for orders placed within Lahore.",
        "During weekends, public holidays, or high order volume, deliveries may take longer."
      ]
    },
    {
      icon: DollarSign,
      title: "Delivery Charges",
      content: [
        "Delivery charges vary based on your location and order size.",
        "Charges will be shown at checkout before confirming your order."
      ]
    },
    {
      icon: Package,
      title: "Storage & Handling",
      content: [
        "Our samosas are delivered frozen. Please store them in your freezer immediately after receiving them.",
        "We are not responsible for spoilage if products are not stored properly after delivery."
      ]
    },
    {
      icon: Truck,
      title: "Packaging",
      content: [
        "All frozen items are packed with care to maintain temperature and hygiene during transit.",
        "In rare cases, minor thawing may occur due to weather or transit conditions."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Failed Deliveries",
      content: [
        "Customers must provide a correct delivery address and active contact number.",
        "If the rider cannot deliver due to incorrect details or unavailability of the customer, the order will be marked as delivered and may not be refunded."
      ]
    },
    {
      icon: Info,
      title: "Delays",
      content: [
        "Delays may occur due to traffic, weather, or other unavoidable circumstances.",
        "We will keep you informed in case of any unexpected delays."
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
              Shipping & <span className="text-amber-400 italic">Delivery</span>
            </h1>
            <p className="text-xl text-slate-100/80 max-w-2xl mx-auto leading-relaxed font-light">
              At Lahori Samosa, we make sure your frozen samosas reach you safely.
            </p>
            <p className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shipping Info Content */}
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
              Delivery Questions?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              For any delivery-related queries, please contact us:
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
