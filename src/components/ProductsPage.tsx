import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Plus, ArrowRight } from 'lucide-react';
import { useCart, Product } from './CartContext';
import { ResponsiveImage } from './ResponsiveImage';

export function ProductsPage() {
  const { dispatch } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: '1',
      name: 'Pizza Samosa (12p)',
      price: 650,
      image: '/images/products/pizza.jpg',
      description: 'Delicious pizza-flavored samosas with melted cheese and savory toppings.'
    },
    {
      id: '2',
      name: 'Bar.B.Q Samosa (12p)',
      price: 600,
      image: '/images/products/bbq.jpg',
      description: 'Smoky barbecue flavored samosas with tender meat and aromatic spices.'
    },
    {
      id: '3',
      name: 'Malai Boti Samosa (12p)',
      price: 480,
      image: '/images/products/boti.jpg',
      description: 'Creamy malai boti samosas with rich, flavorful filling.'
    },
    {
      id: '4',
      name: 'Macaroni Samosa (12p)',
      price: 350,
      image: '/images/products/mac.png',
      description: 'Unique macaroni-filled samosas with cheesy goodness.'
    },
    {
      id: '5',
      name: 'Potato Samosa (12p)',
      price: 300,
      image: '/images/products/potato.jpg',
      description: 'Classic potato samosas with perfectly spiced filling.'
    },
    {
      id: '6',
      name: 'Chicken Qeema Samosa',
      price: 450,
      image: '/images/products/chickenqeema.jpeg',
      description: 'Tender chicken qeema samosas with authentic Pakistani flavors.'
    },
    {
      id: '7',
      name: 'Chicken Vegetable Roll',
      price: 560,
      image: '/images/products/vegchicroll.jpg',
      description: 'Chicken and vegetable rolls perfect for any occasion.'
    }
  ];

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', product });
  };

  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      {/* Page Header */}
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
            <h1 className="text-5xl lg:text-6xl brand-font tracking-tight">
              Premium <span className="text-amber-400 italic">Collection</span>
            </h1>
            <p className="text-xl text-slate-100/80 max-w-2xl mx-auto leading-relaxed font-light">
              Discover our complete range of authentic frozen foods, handcrafted with care and bursting with traditional flavors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                className="group cursor-pointer relative z-10"
              >
                <Link to={`/product/${product.id}`}>
                  <div
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden transition-all duration-500 border border-slate-100 dark:border-slate-800"
                    style={{
                      boxShadow: hoveredProduct === product.id
                        ? "0 20px 40px -12px rgba(245, 158, 11, 0.2)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
                      <ResponsiveImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                        aspectRatio="4/3"
                      />

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}></div>

                      {/* Add to Cart Button - appears on hover */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          scale: hoveredProduct === product.id ? 1 : 0.8,
                          y: hoveredProduct === product.id ? 0 : 10
                        }}
                        onClick={(e) => handleAddToCart(product, e)}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-slate-700 dark:text-slate-200 z-20"
                      >
                        <Plus className="w-6 h-6" />
                      </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-3 relative">
                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-slate-400 font-medium">4.8 (120+)</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="text-lg text-slate-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors font-bold leading-tight">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 h-10">
                        {product.description}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                          Rs.{product.price}
                        </span>

                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-full group-hover:bg-amber-100 transition-colors">
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl text-slate-900 dark:text-white brand-font">
              Need Help Choosing?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our team is here to help you find the perfect products for your taste and occasion.
            </p>
          </motion.div>

          <Link to="/contact">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(245, 158, 11, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full transition-all duration-300 shadow-lg font-bold flex items-center gap-2 mx-auto hover:shadow-amber-500/20"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}