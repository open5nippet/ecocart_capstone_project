import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '@/redux/slices/cartSlice'
import { formatters } from '@/utils/formatters'
import { calculations } from '@/utils/calculations'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalPrice } = useSelector((state) => state.cart)

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const subtotal = totalPrice
  const tax = calculations.calculateTax(subtotal)
  const shipping = 10
  const total = calculations.calculateFinalTotal(subtotal, 0.1, shipping)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="bg-eco-600 hover:bg-eco-700 text-white px-6 py-3 rounded-lg inline-block transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-eco-600 font-semibold">
                        {formatters.formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, parseInt(e.target.value))
                            }
                            className="w-12 text-center border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">
                          {formatters.formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="ml-auto text-danger-600 hover:text-danger-700 font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatters.formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Tax (10%)</span>
                    <span>{formatters.formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Shipping</span>
                    <span>{formatters.formatPrice(shipping)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                    <span>Total</span>
                    <span className="text-eco-600">{formatters.formatPrice(total)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-eco-600 hover:bg-eco-700 text-white font-semibold py-3 px-4 rounded-lg transition mb-3"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full border border-danger-600 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900 font-semibold py-3 px-4 rounded-lg transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
