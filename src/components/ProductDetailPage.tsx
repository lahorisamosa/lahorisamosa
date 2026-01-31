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
      image: '/images/products/PIZZA.jpg',
      description: 'Delicious pizza-flavored samosas with melted cheese and savory toppings. Made with premium ingredients and traditional recipes, each bite delivers the perfect combination of crispy exterior and cheesy, flavorful filling that will transport you to pizza heaven.'
    },
    {
      id: '2',
      name: 'Bar.B.Q Samosa (12p)',
      price: 600,
      image: '/images/products/BBQ.jpg',
      description: 'Smoky barbecue flavored samosas with tender meat and aromatic spices. These samosas are carefully crafted with authentic BBQ flavors, offering a unique twist on the traditional samosa that will satisfy your cravings for smoky, grilled goodness.'
    },
    {
      id: '3',
      name: 'Malai Boti Samosa (12p)',
      price: 480,
      image: '/images/products/BOTI.jpg',
      description: 'Creamy malai boti samosas with rich, flavorful filling. Made with tender boti pieces in a creamy malai sauce, these samosas offer a luxurious taste experience that combines the best of traditional Pakistani cuisine with modern convenience.'
    },
    {
      id: '4',
      name: 'Macaroni Samosa (12p)',
      price: 350,
      image: '/images/products/MAC.png',
      description: 'Unique macaroni-filled samosas with cheesy goodness. This innovative creation combines the comfort of macaroni and cheese with the crispy texture of samosas, creating a delightful fusion that appeals to both kids and adults.'
    },
    {
      id: '5',
      name: 'Potato Samosa (12p)',
      price: 300,
      image: '/images/products/POTATO.jpg',
      description: 'Classic potato samosas with perfectly spiced filling. Made with fresh potatoes and aromatic spices, these traditional samosas are a timeless favorite that never goes out of style. Perfect for any occasion.'
    },
    {
      id: '6',
      name: 'Chicken Qeema Samosa',
      price: 450,
      image: '/images/hero/CHICKKE~2.jpg',
      description: 'Tender chicken qeema samosas with authentic Pakistani flavors. Made with finely minced chicken and traditional spices, these samosas offer a rich and satisfying taste that represents the true essence of Pakistani cuisine.'
    },
    {
      id: '7',
      name: 'Chicken Vegetable Roll',
      price: 560,
      image: '/images/products/VEGCHICROLL.jpg',
      description: 'Chicken and vegetable rolls perfect for any occasion. These rolls combine tender chicken with fresh vegetables, wrapped in a crispy pastry shell. Ideal for parties, gatherings, or as a delicious snack any time of the day.'
    }
  ];

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl text-slate-900 mb-4 font-serif">Product not found</h2>
          <Link to="/products" className="text-emerald-600 hover:text-emerald-700 font-medium">
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
    <div className="pt-24 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center text-slate-600 hover:text-emerald-700 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mr-2 group-hover:border-emerald-500 group-hover:bg-emerald-50 transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:text-emerald-700" />
            </div>
            <span className="font-medium">Back to Products</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative z-10"
            >
              <ResponsiveImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                aspectRatio="1/1"
                priority={true}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-amber-400/30 rounded-3xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-emerald-400/20 rounded-3xl -z-10"></div>
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
                <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-bold text-amber-700 text-sm">4.8</span>
                </div>
                <span className="text-slate-500 text-sm font-medium">124 verified reviews</span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl lg:text-5xl text-slate-900 brand-font leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-emerald-700">Rs.{product.price}</span>
                <span className="text-slate-400 text-lg">/ pack</span>
              </div>
            </div>

            <div className="h-px bg-slate-200"></div>

            {/* Description */}
            <p className="text-slate-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, text: "Premium Ingredients" },
                { icon: Clock, text: "Ready in 10 mins" },
                { icon: CheckCircle, text: "Authentic Taste" },
                { icon: Star, text: "No Preservatives" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 space-y-6">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-slate-900">Quantity</span>
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                  <motion.button
                    whileHover={{ backgroundColor: '#fff', scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 rounded-lg text-slate-600 hover:text-emerald-700 hover:shadow-sm transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-12 text-center font-bold text-slate-900 text-lg">{quantity}</span>
                  <motion.button
                    whileHover={{ backgroundColor: '#fff', scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 rounded-lg text-slate-600 hover:text-emerald-700 hover:shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 pt-2 border-t border-slate-100">
                <span>Total Price</span>
                <span className="text-2xl font-bold text-emerald-800">Rs.{product.price * quantity}</span>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white text-lg rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="flex gap-6 text-sm text-slate-500 justify-center">
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Fast Delivery</span>
              <span className="w-px h-4 bg-slate-300"></span>
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1" /> Quality Guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}