import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';
import { ResponsiveImage } from './ResponsiveImage';

export function SideCart() {
  const { state, dispatch } = useCart();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SIDE_CART' });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  return (
    <AnimatePresence>
      {state.isSideCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleOverlayClick}
          />

          {/* Side Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col sm:max-w-lg md:w-96 transition-colors duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Your Cart</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {state.items.length} {state.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Add some delicious samosas to get started!</p>
                    <Link to="/products" onClick={handleClose}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        Browse Products
                      </motion.button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <ResponsiveImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full"
                          aspectRatio="1/1"
                          objectFit="cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-500 font-medium">
                          Rs.{item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-800 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-slate-900 dark:text-white">Subtotal</span>
                  <span className="text-2xl font-bold text-amber-800 dark:text-amber-500 brand-font">
                    Rs.{state.total}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout" onClick={handleClose}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={handleClose}
                  className="w-full py-2 sm:py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
