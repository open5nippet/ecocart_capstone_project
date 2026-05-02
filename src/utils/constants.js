// Product categories
export const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'home', label: 'Home & Living' },
  { id: 'beauty', label: 'Beauty & Personal' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'food', label: 'Food & Beverage' },
  { id: 'accessories', label: 'Accessories' },
]

// Materials
export const MATERIALS = ['recycled', 'organic', 'bamboo', 'bioplastic', 'plastic', 'metal', 'glass']

// Packaging types
export const PACKAGING = ['eco-friendly', 'recyclable', 'standard', 'plastic']

// Sustainability labels
export const SUSTAINABILITY_LABELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
}

// Price ranges (INR)
export const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹2,000', min: 500, max: 2000 },
  { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { label: 'Over ₹5,000', min: 5000, max: 1000000 },
]

// Sort options
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'sustainability', label: 'Most Sustainable' },
  { value: 'newest', label: 'Newest' },
]

// Items per page
export const ITEMS_PER_PAGE = 12

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  USERS: '/users',
  AUTH: '/auth',
  CART: '/cart',
  WISHLIST: '/wishlist',
  ORDERS: '/orders',
}

// Local storage keys
export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  DARK_MODE: 'darkMode',
  FILTERS: 'productFilters',
}

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^[0-9]{10}$/,
}

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
  INVALID_PHONE: 'Please enter a valid 10-digit phone number',
  REQUIRED_FIELD: 'This field is required',
  PASSWORD_MISMATCH: 'Passwords do not match',
}
