/**
 * Sustainability calculation service
 * Handles eco-score calculations and sustainability metrics
 */

export const sustainabilityService = {
  /**
   * Calculate sustainability score for a product
   * @param {Object} product - Product object with material, packaging, brandEcoRating
   * @returns {Object} - { score, label, percentage }
   */
  calculateScore: (product) => {
    if (!product) return { score: 0, label: 'Low', percentage: 0 }

    let score = 0

    // Material scoring
    const materialScores = {
      recycled: 30,
      organic: 25,
      bamboo: 28,
      bioplastic: 22,
      plastic: -5,
      metal: 15,
      glass: 18,
    }
    score += materialScores[product.material] || 0

    // Packaging scoring
    const packagingScores = {
      'eco-friendly': 20,
      recyclable: 15,
      standard: 0,
      plastic: -5,
    }
    score += packagingScores[product.packaging] || 0

    // Brand rating
    if (product.brandEcoRating >= 4.5) score += 25
    else if (product.brandEcoRating >= 3.5) score += 18
    else if (product.brandEcoRating >= 2.5) score += 10

    // Cap the score
    score = Math.min(Math.max(score, 0), 100)

    return {
      score,
      label: this.getScoreLabel(score),
      percentage: (score / 100) * 100,
    }
  },

  /**
   * Get sustainability label based on score
   */
  getScoreLabel: (score) => {
    if (score >= 70) return 'High'
    if (score >= 40) return 'Medium'
    return 'Low'
  },

  /**
   * Get color for sustainability badge
   */
  getScoreColor: (score) => {
    if (score >= 70) return 'eco'
    if (score >= 40) return 'warn'
    return 'danger'
  },

  /**
   * Calculate eco impact for user dashboard
   */
  calculateEcoImpact: (purchases) => {
    if (!purchases.length) return 0
    const totalScore = purchases.reduce(
      (sum, product) => sum + this.calculateScore(product).score,
      0
    )
    return Math.round(totalScore / purchases.length)
  },

  /**
   * Get eco alternatives for a product
   */
  getEcoAlternatives: (products, targetCategory, excludeId) => {
    return products
      .filter((p) => p.category === targetCategory && p.id !== excludeId)
      .sort((a, b) => {
        const scoreA = this.calculateScore(a).score
        const scoreB = this.calculateScore(b).score
        return scoreB - scoreA
      })
      .slice(0, 3)
  },
}
