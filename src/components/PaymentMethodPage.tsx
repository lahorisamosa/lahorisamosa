import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Banknote, ArrowLeft, CheckCircle, Phone, Send } from 'lucide-react';

import { EMAIL_API_URL } from '../utils/emailConfig';

interface CheckoutData {
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

export function PaymentMethodPage() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Payment methods configuration
  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Banknote className="w-8 h-8 text-amber-600" />,
      description: 'Pay when your order is delivered',
      available: true,
      hasDiscount: false
    },
    {
      id: 'manual_jazzcash',
      name: 'JazzCash Transfer',
      icon: <Phone className="w-8 h-8 text-red-600" />,
      description: 'Pay via JazzCash and get a discount',
      available: true,
      hasDiscount: true,
      details: {
        title: 'JazzCash Account Details',
        number: '+92 324 4060113',
        accountName: 'Lahori Samosa' // Placeholder
      }
    },
    {
      id: 'manual_raast',
      name: 'Raast ID Transfer',
      icon: <Send className="w-8 h-8 text-green-600" />,
      description: 'Pay via Raast ID and get a discount',
      available: true,
      hasDiscount: true,
      details: {
        title: 'Raast ID Details',
        number: '+92 324 4060113',
        accountName: 'Lahori Samosa' // Placeholder
      }
    }
  ];

  const DISCOUNT_PERCENTAGE = 0.10; // 10% discount for example, user asked for "this much discount"

  useEffect(() => {
    // Get checkout data from localStorage
    const storedData = localStorage.getItem('checkoutData');
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    } else {
      // Redirect back to checkout if no data
      navigate('/checkout');
    }
  }, [navigate]);

  const handlePaymentSelection = (paymentId: string) => {
    const method = paymentMethods.find(m => m.id === paymentId);
    if (method?.available) {
      setSelectedPayment(paymentId);
      setPaymentError('');
    }
  };

  const getDiscountedTotal = () => {
    if (!checkoutData) return 0;
    const method = paymentMethods.find(m => m.id === selectedPayment);
    if (method?.hasDiscount) {
      return Math.round(checkoutData.total * (1 - DISCOUNT_PERCENTAGE));
    }
    return checkoutData.total;
  };

  const handlePlaceOrder = async () => {
    if (!checkoutData || !selectedPayment) return;

    setLoading(true);
    setPaymentError('');

    try {
      // Generate order ID
      const orderId = `LAHORI${Date.now().toString(36).toUpperCase().substring(0, 10)}`;

      const finalTotal = getDiscountedTotal();
      const selectedMethodObj = paymentMethods.find(m => m.id === selectedPayment);



      // Send email notification
      await sendOrderEmail(orderId, {
        items: checkoutData.items,
        total: finalTotal,
        customerInfo: checkoutData.customerInfo,
        paymentMethod: selectedMethodObj?.name || selectedPayment
      });

      // Clear checkout data
      localStorage.removeItem('checkoutData');

      // Navigate to confirmation page with state
      navigate(`/confirmation/${orderId}`, {
        state: {
          order: {
            id: orderId,
            items: checkoutData.items,
            total: finalTotal,
            customerInfo: checkoutData.customerInfo,
            paymentMethod: selectedMethodObj?.name || selectedPayment
          }
        }
      });

    } catch (error: any) {
      console.error('Order submission error:', error);
      setPaymentError(`Failed to place order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Send order emails using Brevo (via local server)
  const sendOrderEmail = async (orderId: string, orderData: any) => {
    const itemsList = orderData.items.map((item: any) =>
      `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #edf2f7; width: 60px;">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">` : `<div style="width: 50px; height: 50px; background: #f8fafc; border-radius: 8px; text-align: center; line-height: 50px; font-size: 20px; border: 1px solid #e2e8f0;">🛒</div>`}
          </td>
          <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7;">
            <div style="font-weight: 600; color: #1a202c; font-size: 15px;">${item.name}</div>
            <div style="font-size: 13px; color: #718096; margin-top: 2px;">Rs.${item.price} per unit</div>
          </td>
          <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7; color: #4a5568; text-align: center; font-weight: 600;">x${item.quantity}</td>
          <td style="padding: 12px 10px; border-bottom: 1px solid #edf2f7; color: #d97706; font-weight: 700; text-align: right; font-size: 15px;">Rs.${item.price * item.quantity}</td>
        </tr>`
    ).join('');

    // Shared CSS styles for premium look
    const bodyStyle = `background-color: #f7fafc; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;`;
    const cardStyle = `background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;`;
    const headerStyle = `background: linear-gradient(135deg, #d97706 0%, #b45309 100%); padding: 35px 20px; text-align: center; color: #ffffff;`;
    const sectionHeader = `font-size: 18px; font-weight: 700; color: #2d3748; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f6ad55; display: inline-block;`;
    const footerStyle = `text-align: center; padding: 30px 20px; color: #718096; font-size: 13px; line-height: 1.5;`;
    const buttonStyle = `display: inline-block; padding: 14px 30px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; margin-top: 20px; box-shadow: 0 4px 14px 0 rgba(37, 211, 102, 0.39);`;

    // REDESIGNED CUSTOMER EMAIL
    if (orderData.customerInfo.email) {
      const customerHtml = `
          <div style="${bodyStyle}">
            <div style="${cardStyle}">
              <div style="${headerStyle}">
                <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.9; margin-bottom: 8px;">Order Confirmed</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Enjoy Your Samosas! 🥟</h1>
              </div>
              
              <div style="padding: 30px;">
                <p style="font-size: 17px; color: #2d3748; margin-top: 0;">Hi <strong>${orderData.customerInfo.name}</strong>,</p>
                <p style="color: #4a5568; font-size: 15px; line-height: 1.6;">Your order has been received and is now being prepared with love. We'll have it delivered to your doorstep soon!</p>
                
                <div style="background-color: #fffaf0; border: 1px solid #fbd38d; border-radius: 12px; padding: 20px; margin: 25px 0;">
                  <table style="width: 100%;">
                    <tr>
                      <td style="padding-bottom: 10px; color: #7b341e; font-size: 13px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Order ID</td>
                      <td style="padding-bottom: 10px; color: #7b341e; font-size: 13px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; text-align: right;">Payment</td>
                    </tr>
                    <tr>
                      <td style="font-size: 17px; font-weight: 800; color: #1a202c; font-family: monospace;">#${orderId}</td>
                      <td style="font-size: 16px; font-weight: 700; color: #1a202c; text-align: right;">${orderData.paymentMethod}</td>
                    </tr>
                  </table>
                </div>

                <div style="${sectionHeader}">Your Delicious Items</div>
                <table style="width: 100%; border-collapse: collapse;">
                  <tbody>
                    ${itemsList}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" style="padding-top: 20px; text-align: right; font-size: 16px; color: #4a5568;">Delivery Fee</td>
                      <td style="padding-top: 20px; text-align: right; font-size: 16px; color: #2d3748; font-weight: 600;">Rs.100</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="padding-top: 10px; text-align: right; font-size: 20px; font-weight: 800; color: #1a202c;">Total Amount</td>
                      <td style="padding-top: 10px; text-align: right; font-size: 24px; font-weight: 900; color: #d97706;">Rs.${orderData.total}</td>
                    </tr>
                  </tfoot>
                </table>

                <div style="margin-top: 40px; border-top: 2px dashed #e2e8f0; padding-top: 30px; text-align: center;">
                  <div style="font-weight: 700; color: #2d3748; font-size: 16px; margin-bottom: 10px;">Need to update your order?</div>
                  <p style="color: #718096; font-size: 14px; margin-bottom: 20px;">Contact us instantly on WhatsApp and we'll help you out!</p>
                  <a href="https://wa.me/923244060113?text=Hi,%20I'm%20tracking%20my%20order%20%23${orderId}" style="${buttonStyle}">
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
            
            <div style="${footerStyle}">
              <p style="margin-bottom: 5px; font-weight: 700; color: #4a5568;">Lahori Samosa</p>
              <p style="margin: 0;">Deliciously Authentic. Delicously Fresh.</p>
              <p style="margin: 15px 0 0 0; opacity: 0.7;">&copy; ${new Date().getFullYear()} Lahori Samosa. All rights reserved.</p>
            </div>
          </div>
        `;

      const response = await fetch(EMAIL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: orderData.customerInfo.email,
          subject: `✅ Order Confirmed: #${orderId}`,
          htmlContent: customerHtml
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
    }
  };

  if (!checkoutData) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout data...</p>
        </div>
      </div>
    );
  }

  const selectedMethodData = paymentMethods.find(m => m.id === selectedPayment);
  const finalTotal = getDiscountedTotal();
  const discountAmount = checkoutData.total - finalTotal;

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/checkout')}
              className="mr-4 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
            <h1 className="text-3xl lg:text-4xl text-slate-900 dark:text-white">Select Payment Method</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Choose your preferred payment method to complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-800"
            >
              <h2 className="text-xl text-slate-900 dark:text-white mb-6">Available Payment Methods</h2>

              <div className="grid grid-cols-1 gap-4">
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ scale: method.available ? 1.01 : 1 }}
                    whileTap={{ scale: method.available ? 0.99 : 1 }}
                    onClick={() => handlePaymentSelection(method.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedPayment === method.id
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/20'
                      : method.available
                        ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-60'
                      }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-slate-900 dark:text-white mr-2">{method.name}</h3>
                          {method.hasDiscount && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                              SAVE 10%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{method.description}</p>
                      </div>
                      {selectedPayment === method.id && (
                        <CheckCircle className="w-6 h-6 text-amber-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Manual Payment Instructions */}
              {selectedPayment && (selectedPayment === 'manual_jazzcash' || selectedPayment === 'manual_raast') && selectedMethodData?.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="tex-lg font-bold text-slate-900 dark:text-white mb-4">Payment Instructions</h3>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{selectedMethodData.details.title}</p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">{selectedMethodData.details.number}</p>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">Title: {selectedMethodData.details.accountName}</p>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(selectedMethodData.details?.number || '')}
                          className="text-xs text-amber-600 hover:text-amber-700 font-medium underline"
                        >
                          Copy Number
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3 mt-0.5">
                        <Phone className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-1">Send Evidence via WhatsApp</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          After transferring <span className="font-bold">Rs.{finalTotal}</span>, please send a screenshot or transaction ID to our WhatsApp number for verification.
                        </p>
                        <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mt-2">
                          WhatsApp: +92 324 4060113
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}


              {/* Payment Error */}
              {paymentError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 text-red-600">⚠️</div>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
                      <p className="text-sm text-red-700 mt-1">{paymentError}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

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
                {checkoutData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <h3 className="text-slate-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-amber-600">Rs.{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="text-slate-900 dark:text-white">Rs.{checkoutData.total - 100}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Delivery Fee</span>
                  <span className="text-slate-900 dark:text-white">Rs.100</span>
                </div>

                {selectedMethodData?.hasDiscount && (
                  <div className="flex justify-between text-green-600 dark:text-green-500 font-medium">
                    <span>Discount (10%)</span>
                    <span>-Rs.{discountAmount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-slate-900 dark:text-white">Total</span>
                  <div className="text-right">
                    {selectedMethodData?.hasDiscount ? (
                      <>
                        <span className="text-slate-400 line-through text-sm block">Rs.{checkoutData.total}</span>
                        <span className="text-amber-600 font-bold">Rs.{finalTotal}</span>
                      </>
                    ) : (
                      <span className="text-amber-600 font-bold">Rs.{checkoutData.total}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-800">
              <h3 className="text-lg text-slate-900 dark:text-white mb-4">Delivery Details</h3>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p><span className="font-medium text-slate-900 dark:text-slate-200">Name:</span> {checkoutData.customerInfo.name}</p>
                <p><span className="font-medium text-slate-900 dark:text-slate-200">Phone:</span> {checkoutData.customerInfo.phone}</p>
                <p><span className="font-medium text-slate-900 dark:text-slate-200">Email:</span> {checkoutData.customerInfo.email}</p>
                <p><span className="font-medium text-slate-900 dark:text-slate-200">Address:</span> {checkoutData.customerInfo.address}</p>
              </div>
            </div>

            {/* Place Order Button */}
            {selectedPayment && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full px-6 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                {loading ? 'Placing Order...' : `Place Order (Rs.${finalTotal})`}
              </motion.button>
            )}

            {!selectedPayment && (
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center text-slate-500 dark:text-slate-400 text-sm">
                Please select a payment method to proceed
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
