import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Package, MessageCircle, Home, ShoppingBag } from 'lucide-react';

export function ConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Get order from location state
    if (location.state?.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  if (!order) {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h2>
          <p className="text-slate-600 mb-6">
            Your order <strong>{orderId}</strong> has been received.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-blue-800 mb-1 font-bold">What happens next?</p>
            <p className="text-sm text-blue-700">Check your email for confirmation details. We will contact you shortly.</p>
          </div>
          <Link to="/">
            <button className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-bold">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-600/30">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Confetti animation */}
          <div className="relative">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -10, opacity: 1 }}
                animate={{
                  y: [0, -50, 100],
                  x: [0, Math.random() * 200 - 100],
                  opacity: [1, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute top-0 left-1/2 w-2 h-2 bg-amber-400 rounded-full"
                style={{
                  backgroundColor: ['#f59e0b', '#fbbf24', '#0f172a', '#334155'][i % 4]
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl text-slate-900 dark:text-white mb-4 font-bold">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
            Your order has been successfully placed and is being processed.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 mb-8 border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center mb-6">
            <Package className="w-6 h-6 text-amber-600 mr-3" />
            <h2 className="text-2xl text-slate-900 dark:text-white font-bold">Order Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Info */}
            <div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500 dark:text-slate-400">Order Number</label>
                  <p className="text-lg text-slate-900 dark:text-white font-mono font-bold tracking-wider">{order.id}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-500 dark:text-slate-400">Customer Name</label>
                  <p className="text-lg text-slate-900 dark:text-white">{order.customerInfo.name}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-500 dark:text-slate-400">Phone Number</label>
                  <p className="text-lg text-slate-900 dark:text-white">{order.customerInfo.phone}</p>
                </div>

                <div>
                  <label className="text-sm text-slate-500 dark:text-slate-400">Payment Method</label>
                  <p className="text-lg text-slate-900 dark:text-white font-medium text-amber-600">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg text-slate-900 dark:text-white mb-4 font-bold">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div>
                      <span className="text-slate-900 dark:text-white font-medium">{item.name}</span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="text-amber-600 font-bold">Rs.{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t-2 border-slate-100 dark:border-slate-800 mt-2">
                  <span className="text-lg text-slate-900 dark:text-white font-bold">Total</span>
                  <span className="text-xl text-amber-600 font-bold">Rs.{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Email Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-800/30 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start">
            <MessageCircle className="w-8 h-8 text-amber-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg text-amber-800 dark:text-amber-500 font-bold mb-2">Order Confirmation Sent!</h3>
              <p className="text-amber-700 dark:text-amber-400/90 mb-3">
                We have sent an email with your order details to <strong>{order.customerInfo.email}</strong>.
              </p>
              <p className="text-amber-700 dark:text-amber-400/90 text-sm">
                If you have any questions, you can contact us on WhatsApp:
                <span className="font-semibold text-slate-900 dark:text-white"> +92 324 4060113</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 mb-8 border border-slate-100 dark:border-slate-800"
        >
          <h3 className="text-lg text-slate-900 dark:text-white font-bold mb-4">What's Next?</h3>
          <div className="space-y-3 text-slate-600 dark:text-slate-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
              <span>Our team will contact you via WhatsApp within 30 minutes</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
              <span>We'll confirm your delivery address and timing</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
              <span>Your order will be prepared and delivered within 2-3 business days</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
              <span>Payment will be collected upon delivery (Cash on Delivery)</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-lg font-bold w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Home
            </motion.button>
          </Link>

          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-colors font-bold w-full sm:w-auto"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}