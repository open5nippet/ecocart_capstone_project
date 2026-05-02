import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setProducts,
  setLoading,
  setError,
  setSearchQuery,
  setCategory,
  setPriceRange,
  setSustainabilityMin,
  setSortBy,
  setCurrentPage,
  applyFilters,
  clearFilters,
} from '@/redux/slices/productSlice'
import ProductCard from '@/components/product/ProductCard'
import { useDebounce } from '@/hooks/useDebounce'
import { CATEGORIES, PRICE_RANGES, SORT_OPTIONS } from '@/utils/constants'

const ProductList = () => {
  const dispatch = useDispatch()
  const {
    items,
    filteredItems,
    filters,
    pagination,
    loading,
  } = useSelector((state) => state.products)

  // Debounced search
  const debouncedSearch = useDebounce(filters.search, 300)

  // Mock fetch products on mount
  useEffect(() => {
    dispatch(setLoading(true))
    setTimeout(() => {
      // Mock data - in real app, fetch from API
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
      dispatch(setProducts(mockProducts))
      dispatch(setLoading(false))
    }, 500)
  }, [dispatch])

  // Apply filters and dispatch result
  useEffect(() => {
    let filtered = [...items]

    // Search
    if (debouncedSearch) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Category
    if (filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    // Price range
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Sustainability (mock calculation)
    filtered = filtered.filter((p) => p.brandEcoRating >= filters.sustainabilityMin)

    // Sort
    if (filters.sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price)
    else if (filters.sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price)
    else if (filters.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)
    else if (filters.sortBy === 'sustainability') filtered.sort((a, b) => b.brandEcoRating - a.brandEcoRating)

    dispatch(applyFilters(filtered))
    dispatch(setCurrentPage(1))
  }, [debouncedSearch, filters, items, dispatch])

  // Pagination
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + pagination.itemsPerPage
  )
  const totalPages = Math.ceil(filteredItems.length / pagination.itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Sustainable Products
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => dispatch(setCategory(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    dispatch(setPriceRange([0, parseInt(e.target.value)]))
                  }
                  className="w-full"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  ₹{filters.priceRange[0].toLocaleString('en-IN')} - ₹{filters.priceRange[1].toLocaleString('en-IN')}
                </p>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-eco-500"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => dispatch(clearFilters())}
                className="w-full bg-eco-600 hover:bg-eco-700 text-white py-2 px-4 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
              </div>
            ) : paginatedItems.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => dispatch(setCurrentPage(page))}
                          className={`px-4 py-2 rounded-lg transition ${
                            pagination.currentPage === page
                              ? 'bg-eco-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
