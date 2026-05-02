import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    category: 'all',
    priceRange: [0, 50000],
    sustainabilityMin: 0,
    sortBy: 'relevance', // relevance, price-low, price-high, sustainability
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
  },
  selectedProduct: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
      state.filteredItems = action.payload
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setSearchQuery: (state, action) => {
      state.filters.search = action.payload
      state.pagination.currentPage = 1
    },
    setCategory: (state, action) => {
      state.filters.category = action.payload
      state.pagination.currentPage = 1
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload
      state.pagination.currentPage = 1
    },
    setSustainabilityMin: (state, action) => {
      state.filters.sustainabilityMin = action.payload
      state.pagination.currentPage = 1
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    applyFilters: (state, action) => {
      // This will be used in a thunk or component to filter items
      state.filteredItems = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.filteredItems = state.items
      state.pagination.currentPage = 1
    },
  },
})

export const {
  setProducts,
  setLoading,
  setError,
  setSearchQuery,
  setCategory,
  setPriceRange,
  setSustainabilityMin,
  setSortBy,
  setCurrentPage,
  setSelectedProduct,
  applyFilters,
  clearFilters,
} = productSlice.actions

export default productSlice.reducer
