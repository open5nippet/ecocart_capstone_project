import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/redux/slices/cartSlice'
import { toggleWishlist } from '@/redux/slices/wishlistSlice'
import SustainabilityBadge from '@/components/product/SustainabilityBadge'
import { formatters } from '@/utils/formatters'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('M') // Default size for clothing
  const wishlist = useSelector((state) => state.wishlist.items)
  const isInWishlist = wishlist.some((item) => item.id === parseInt(id))

  // Mock fetch product
  useEffect(() => {
    setTimeout(() => {
      // Complete mock database matching the products page
      const mockProducts = [
        {
          id: 1,
          name: 'Organic Cotton T-Shirt',
          description: 'Comfortable 100% organic cotton t-shirt with eco-friendly dyes',
          price: 1299,
          category: 'clothing',
          image: 'https://tse1.mm.bing.net/th/id/OIP.AJ9flq9XSLJxH-URUzptYgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
          material: 'organic',
          packaging: 'eco-friendly',
          brandEcoRating: 4.8,
          rating: 4.5,
          reviews: 128,
          inStock: true,
          discount: 0,
        },
        {
          id: 2,
          name: 'Bamboo Cutting Board',
          description: 'Durable bamboo cutting board, sustainably harvested',
          price: 899,
          category: 'home',
          image: 'https://i5.walmartimages.com/asr/a0d59f67-5757-421f-8bdd-4db82cbc0c43.63a5195124af1dc62b855862e39e545f.jpeg',
          material: 'bamboo',
          packaging: 'recyclable',
          brandEcoRating: 4.6,
          rating: 4.7,
          reviews: 85,
          inStock: true,
          discount: 10,
        },
        {
          id: 3,
          name: 'Recycled Plastic Bottle',
          description: 'Durable water bottle made from 100% recycled plastic',
          price: 649,
          category: 'accessories',
          image: 'https://th.bing.com/th/id/OIP.PxEcEoSOwjQZnkaIeWoFawHaLT?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
          material: 'recycled',
          packaging: 'eco-friendly',
          brandEcoRating: 4.4,
          rating: 4.6,
          reviews: 256,
          inStock: true,
          discount: 0,
        },
        {
          id: 4,
          name: 'Hemp Yoga Mat',
          description: 'Natural hemp yoga mat with non-slip base, biodegradable',
          price: 2499,
          category: 'accessories',
          image: 'https://tse4.mm.bing.net/th/id/OIP.A9syl-d51c2YZbdAHg2ToQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
          material: 'organic',
          packaging: 'eco-friendly',
          brandEcoRating: 4.9,
          rating: 4.8,
          reviews: 64,
          inStock: true,
          discount: 5,
        },
        {
          id: 5,
          name: 'Solar Lantern',
          description: 'Portable solar-powered LED lantern, perfect for outdoor use',
          price: 1799,
          category: 'electronics',
          image: 'https://m.media-amazon.com/images/I/71xQ4QoNTmL._AC_.jpg',
          material: 'recycled',
          packaging: 'recyclable',
          brandEcoRating: 4.3,
          rating: 4.4,
          reviews: 112,
          inStock: true,
          discount: 0,
        },
        {
          id: 6,
          name: 'Beeswax Food Wraps',
          description: 'Reusable beeswax wraps as an eco alternative to plastic wrap',
          price: 499,
          category: 'home',
          image: 'https://www.kempii.co.uk/cdn/shop/products/Beeswax-Food-Wrap-Pack-Of-3-Honeycomb_700x.jpg?v=1619008300',
          material: 'organic',
          packaging: 'eco-friendly',
          brandEcoRating: 4.7,
          rating: 4.6,
          reviews: 198,
          inStock: true,
          discount: 0,
        },
      ]

      const foundProduct = mockProducts.find((p) => p.id === parseInt(id))

      if (foundProduct) {
        // Combine base product with detail-specific fields
        setProduct({
          ...foundProduct,
          longDescription: `Our premium ${foundProduct.name.toLowerCase()} is crafted with sustainability in mind. It is made using eco-friendly materials and processes that are safe for both you and the environment. The product is designed for durability and performance, making it a perfect choice for an eco-conscious lifestyle. By choosing this product, you support ethical practices and help reduce your environmental footprint.`,
          specs: {
            'Material': foundProduct.material,
            'Packaging': foundProduct.packaging,
            'Category': foundProduct.category,
            'Eco Rating': `${foundProduct.brandEcoRating}/5`,
            'Availability': foundProduct.inStock ? 'In Stock' : 'Out of Stock',
          },
        })
      }
    }, 300)
  }, [id])

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      ...product, 
      quantity, 
      // Only attach size if the product is clothing
      ...(product.category === 'clothing' && { size })
    }))
    alert('Product added to cart!')
  }

  const handleWishlist = () => {
    dispatch(toggleWishlist(product))
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="text-eco-600 hover:text-eco-700 mb-6 inline-block"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden" style={{ height: '24rem' }}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
              }}
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-eco-600">
                {formatters.formatPrice(product.price)}
              </span>
              {product.discount > 0 && (
                <span className="bg-danger-500 text-white px-3 py-1 rounded-lg text-sm">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">⭐ {product.rating}</span>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Sustainability Badge */}
            <div className="mb-6">
              <SustainabilityBadge product={product} size="lg" />
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {product.longDescription}
            </p>

            {/* Size, Quantity & Actions */}
            <div className="space-y-4">
              
              {/* Size Selection (Only for clothing like T-Shirt) */}
              {product.category === 'clothing' && (
                <div className="flex items-center gap-4 mb-2">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 w-20">
                    Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border font-medium transition ${
                          size === s
                            ? 'bg-eco-600 border-eco-600 text-white'
                            : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-700 dark:text-gray-300 w-20">
                  Quantity:
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-eco-600 hover:bg-eco-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className={`px-6 py-3 rounded-lg border font-semibold transition ${
                    isInWishlist
                      ? 'bg-red-100 border-red-300 text-red-600'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isInWishlist ? '❤️ Saved' : '♡ Save'}
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.inStock ? (
                  <span className="text-eco-600">✓ In Stock</span>
                ) : (
                  <span className="text-danger-600">Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Product Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <p className="font-semibold text-gray-700 dark:text-gray-300">{key}</p>
                <p className="text-gray-600 dark:text-gray-400">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
