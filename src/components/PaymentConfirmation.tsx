import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Loader2 } from 'lucide-react';

export function PaymentConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Just simulate loading for UX since we don't have a backend to fetch from
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [orderId]);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl text-gray-900 mb-2">Loading Order Details</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order. Your order ID is <span className="font-mono font-bold text-slate-900">{orderId}</span>.
          </p>



          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinueShopping}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Continue Shopping
            </motion.button>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              You will receive a confirmation email shortly.
              Our team will contact you for delivery details.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
