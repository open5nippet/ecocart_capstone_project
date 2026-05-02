import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/redux/slices/cartSlice'
import { toggleWishlist } from '@/redux/slices/wishlistSlice'
import SustainabilityBadge from '@/components/product/SustainabilityBadge'
import { formatters } from '@/utils/formatters'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  const isInWishlist = wishlist.some((item) => item.id === product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart({ ...product, quantity: 1 }))
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    dispatch(toggleWishlist(product))
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
            }}
          />
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-danger-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Sustainability Badge */}
          <div className="mb-3">
            <SustainabilityBadge product={product} size="sm" />
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-eco-600">
                {formatters.formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  {formatters.formatPrice(product.price / (1 - product.discount / 100))}
                </span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            ⭐ {product.rating} ({product.reviews} reviews)
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto" onClick={(e) => e.preventDefault()}>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-eco-600 hover:bg-eco-700 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlist}
              className={`px-3 py-2 rounded-lg border transition-colors ${
                isInWishlist
                  ? 'bg-red-100 border-red-300 text-red-600'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
