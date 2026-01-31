import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, User } from 'lucide-react';
import { useCart } from './CartContext';

export function CheckoutPage() {
  const { state } = useCart();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  // Redirect to cart if no items - use useEffect to avoid render-time navigation
  useEffect(() => {
    if (state.items.length === 0) {
      navigate('/cart');
    }
  }, [state.items.length, navigate]);

  // Handle proceed to payment method page
  const handleProceedToCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.email) {
      alert('Please fill in all required fields.');
      return;
    }

    // Store customer info in localStorage for PaymentMethodPage
    localStorage.setItem('checkoutData', JSON.stringify({
      customerInfo,
      items: state.items,
      total: state.total + 100
    }));

    // Navigate to payment method selection page
    navigate('/payment-method');
  };

  // Don't render the page if there are no items (will redirect via useEffect)
  if (state.items.length === 0) {
    return null;
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl text-slate-900 dark:text-white mb-2">Checkout</h1>
          <p className="text-slate-600 dark:text-slate-400">Complete your order details</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Customer Information */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl text-slate-900 dark:text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-amber-600" />
                Customer Information
              </h2>

              <form onSubmit={handleProceedToCheckout} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
                    Email Address *
                    <span className="text-xs text-slate-500 ml-1">(for order confirmation)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 dark:text-slate-300 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

              </form>
            </div>


          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Order Items */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl text-slate-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <h3 className="text-slate-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-amber-600">Rs.{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="text-slate-900 dark:text-white">Rs.{state.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Delivery Fee</span>
                  <span className="text-slate-900 dark:text-white">Rs.100</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-900 dark:text-white">Total</span>
                  <span className="text-amber-600">Rs.{state.total + 100}</span>
                </div>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProceedToCheckout}
              className="w-full px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-lg text-lg font-bold"
            >
              Proceed to Checkout
            </motion.button>

            {/* Delivery Info */}
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
              <h3 className="text-sm text-amber-800 dark:text-amber-400 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Delivery Information
              </h3>
              <ul className="text-xs text-amber-700 dark:text-amber-500/80 space-y-1">
                <li>• Standard delivery: 2-3 business days</li>
                <li>• Free delivery on orders over Rs.1000</li>
                <li>• We deliver within Lahore city limits</li>
                <li>• Email confirmation will be sent</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}