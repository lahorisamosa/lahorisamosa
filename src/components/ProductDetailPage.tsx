import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Star, ArrowLeft, Plus, Minus, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { useCart, Product } from './CartContext';
import { ResponsiveImage } from './ResponsiveImage';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  // In a real app, this would come from an API or database
  const products: Product[] = [
    {
      id: '1',
      name: 'Pizza Samosa (12p)',
      price: 650,
      image: '/images/products/pizza.webp',
      description: 'Delicious pizza-flavored samosas with melted cheese and savory toppings. Made with premium ingredients and traditional recipes, each bite delivers the perfect combination of crispy exterior and cheesy, flavorful filling that will transport you to pizza heaven.'
    },
    {
      id: '2',
      name: 'Bar.B.Q Samosa (12p)',
      price: 600,
      image: '/images/products/bbq.webp',
      description: 'Smoky barbecue flavored samosas with tender meat and aromatic spices. These samosas are carefully crafted with authentic BBQ flavors, offering a unique twist on the traditional samosa that will satisfy your cravings for smoky, grilled goodness.'
    },
    {
      id: '3',
      name: 'Malai Boti Samosa (12p)',
      price: 480,
      image: '/images/products/boti.webp',
      description: 'Creamy malai boti samosas with rich, flavorful filling. Made with tender boti pieces in a creamy malai sauce, these samosas offer a luxurious taste experience that combines the best of traditional Pakistani cuisine with modern convenience.'
    },
    {
      id: '4',
      name: 'Macaroni Samosa (12p)',
      price: 350,
      image: '/images/products/mac.webp',
      description: 'Unique macaroni-filled samosas with cheesy goodness. This innovative creation combines the comfort of macaroni and cheese with the crispy texture of samosas, creating a delightful fusion that appeals to both kids and adults.'
    },
    {
      id: '5',
      name: 'Potato Samosa (12p)',
      price: 300,
      image: '/images/products/potato.webp',
      description: 'Classic potato samosas with perfectly spiced filling. Made with fresh potatoes and aromatic spices, these traditional samosas are a timeless favorite that never goes out of style. Perfect for any occasion.'
    },
    {
      id: '6',
      name: 'Chicken Qeema Samosa',
      price: 450,
      image: '/images/products/chickenqeema.webp',
      description: 'Tender chicken qeema samosas with authentic Pakistani flavors. Made with finely minced chicken and traditional spices, these samosas offer a rich and satisfying taste that represents the true essence of Pakistani cuisine.'
    },
    {
      id: '7',
      name: 'Chicken Vegetable Roll',
      price: 560,
      image: '/images/products/vegchicroll.webp',
      description: 'Chicken and vegetable rolls perfect for any occasion. These rolls combine tender chicken with fresh vegetables, wrapped in a crispy pastry shell. Ideal for parties, gatherings, or as a delicious snack any time of the day.'
    }
  ];

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="text-center">
          <h2 className="text-2xl text-slate-900 dark:text-white mb-4 font-serif">Product not found</h2>
          <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-500 flex flex-col justify-center">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mr-2 group-hover:border-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:text-amber-700 dark:group-hover:text-amber-500" />
            </div>
            <span className="font-medium">Back to Products</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative lg:mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 p-4 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <ResponsiveImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  aspectRatio="4/5"
                  priority={true}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-bold text-amber-700 dark:text-amber-400 text-sm">4.8</span>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">124 verified reviews</span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl lg:text-5xl text-slate-900 dark:text-white brand-font leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-amber-700 dark:text-amber-500">Rs.{product.price}</span>
                <span className="text-slate-400 dark:text-slate-500 text-lg">/ pack</span>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, text: "Premium Ingredients" },
                { icon: Clock, text: "Ready in 10 mins" },
                { icon: CheckCircle, text: "Authentic Taste" },
                { icon: Star, text: "No Preservatives" },
              ].map((feature, i) => (
                <li key={i} className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg text-amber-600 dark:text-amber-500">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* Controls */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-slate-900 dark:text-white">Quantity</span>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
                  <motion.button
                    whileHover={{ backgroundColor: '#fff', scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-500 hover:shadow-sm transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-12 text-center font-bold text-slate-900 dark:text-white text-lg">{quantity}</span>
                  <motion.button
                    whileHover={{ backgroundColor: '#fff', scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-500 hover:shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Price</span>
                <span className="text-2xl font-bold text-amber-800 dark:text-amber-400">Rs.{product.price * quantity}</span>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-lg rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 justify-center">
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Fast Delivery</span>
              <span className="w-px h-4 bg-slate-300 dark:bg-slate-700"></span>
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1" /> Quality Guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}