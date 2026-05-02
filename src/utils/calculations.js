export const calculations = {
  /**
   * Calculate discount price
   */
  calculateDiscountPrice: (price, discount) => {
    return price - (price * discount) / 100
  },

  /**
   * Calculate total cart price
   */
  calculateCartTotal: (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  /**
   * Calculate tax
   */
  calculateTax: (amount, taxRate = 0.1) => {
    return amount * taxRate
  },

  /**
   * Calculate final total with tax
   */
  calculateFinalTotal: (subtotal, taxRate = 0.1, shipping = 0) => {
    const tax = calculations.calculateTax(subtotal, taxRate)
    return subtotal + tax + shipping
  },

  /**
   * Calculate average rating
   */
  calculateAverageRating: (ratings) => {
    if (!ratings || ratings.length === 0) return 0
    return ratings.reduce((sum, r) => sum + r, 0) / ratings.length
  },

  /**
   * Calculate savings percentage
   */
  calculateSavingsPercentage: (originalPrice, discountedPrice) => {
    return ((originalPrice - discountedPrice) / originalPrice) * 100
  },

  /**
   * Calculate pages needed for pagination
   */
  calculateTotalPages: (totalItems, itemsPerPage) => {
    return Math.ceil(totalItems / itemsPerPage)
  },

  /**
   * Calculate offset for pagination
   */
  calculateOffset: (currentPage, itemsPerPage) => {
    return (currentPage - 1) * itemsPerPage
  },
}
