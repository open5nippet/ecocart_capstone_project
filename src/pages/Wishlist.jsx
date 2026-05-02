import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist, toggleWishlist } from '@/redux/slices/wishlistSlice'
import { addToCart } from '@/redux/slices/cartSlice'
import SustainabilityBadge from '@/components/product/SustainabilityBadge'
import { formatters } from '@/utils/formatters'

const Wishlist = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.wishlist)

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id))
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
    alert('Product added to cart!')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          ♥ My Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              Your wishlist is empty
            </p>
            <Link
              to="/products"
              className="bg-eco-600 hover:bg-eco-700 text-white px-6 py-3 rounded-lg inline-block transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <div className="mb-3">
                    <SustainabilityBadge product={product} size="sm" />
                  </div>
                  <p className="text-eco-600 font-bold mb-4">
                    {formatters.formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-eco-600 hover:bg-eco-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="px-3 py-2 text-danger-600 hover:text-danger-700 border border-danger-300 rounded-lg font-semibold transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
