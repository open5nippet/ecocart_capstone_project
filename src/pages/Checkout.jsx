import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '@/redux/slices/cartSlice'
import { formatters } from '@/utils/formatters'
import { calculations } from '@/utils/calculations'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector((state) => state.cart)
  
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  })

  // Redirect if cart is empty and order hasn't been placed
  useEffect(() => {
    if (items.length === 0 && !isOrderPlaced) {
      navigate('/cart')
    }
  }, [items, isOrderPlaced, navigate])

  const subtotal = totalPrice
  const tax = calculations.calculateTax(subtotal)
  const shipping = 10
  const total = calculations.calculateFinalTotal(subtotal, 0.1, shipping)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    setIsOrderPlaced(true)
    dispatch(clearCart())
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Thank you, {formData.firstName}! Your eco-friendly order has been successfully placed. We'll send a confirmation email to {formData.email} shortly.
          </p>
          <Link
            to="/products"
            className="inline-block bg-eco-600 hover:bg-eco-700 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="text-eco-600 hover:text-eco-700 mb-6 inline-block font-medium">
          ← Back to Cart
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Shipping Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                    <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="123 Eco Street" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="Green City" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ZIP / Postal Code</label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="12345" />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">Payment Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
                    <input required type="text" maxLength="19" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
                      <input required type="text" maxLength="5" name="expiry" value={formData.expiry} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">CVV</label>
                      <input required type="text" maxLength="4" name="cvv" value={formData.cvv} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500 transition" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-eco-600 hover:bg-eco-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:-translate-y-1 text-lg">
                Place Order • {formatters.formatPrice(total)}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 border-b pb-4 dark:border-gray-700">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded shadow-sm" />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{item.quantity}</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium truncate w-32" title={item.name}>{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-white">{formatters.formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatters.formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (10%)</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatters.formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-800 dark:text-white">{formatters.formatPrice(shipping)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-800 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-eco-600">{formatters.formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout
