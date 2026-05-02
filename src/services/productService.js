import api from '@/services/api'

export const productService = {
  // Fetch all products
  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get('/products', {
        params: { category },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw error
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get('/products', {
        params: {
          q: query,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  },

  // Get product suggestions (eco alternatives)
  getAlternatives: async (category, exclude_id) => {
    try {
      const response = await api.get('/products', {
        params: {
          category,
          _limit: 5,
          id_ne: exclude_id,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching alternatives:', error)
      throw error
    }
  },
}
