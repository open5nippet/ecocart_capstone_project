export const formatters = {
  /**
   * Format price to INR
   */
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0, // usually rupees don't need decimals unless requested
    }).format(price)
  },

  /**
   * Format date to readable format
   */
  formatDate: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  },

  /**
   * Truncate text
   */
  truncateText: (text, length = 50) => {
    if (!text) return ''
    return text.length > length ? text.substring(0, length) + '...' : text
  },

  /**
   * Format sustainability score
   */
  formatScore: (score) => {
    return Math.round(score) + '/100'
  },

  /**
   * Format percentage
   */
  formatPercentage: (value) => {
    return Math.round(value * 100) + '%'
  },

  /**
   * Format number with commas
   */
  formatNumber: (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  },
}
