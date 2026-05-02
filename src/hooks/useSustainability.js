import { useMemo } from 'react'

/**
 * Calculate sustainability score based on product attributes
 * Score = 0-100
 *  +30 if recyclable
 *  +20 if low plastic
 *  +25 if organic material
 *  +25 if eco-certified brand
 */
export const useSustainability = (product) => {
  return useMemo(() => {
    if (!product) return { score: 0, label: 'Low', percentage: 0 }

    let score = 0

    // Material scoring
    if (product.material === 'recycled') score += 30
    if (product.material === 'organic') score += 25
    if (product.material === 'bamboo') score += 28

    // Packaging scoring
    if (product.packaging === 'eco-friendly') score += 20
    if (product.packaging === 'plastic') score -= 5

    // Brand rating
    if (product.brandEcoRating >= 4.5) score += 25
    else if (product.brandEcoRating >= 3.5) score += 18
    else if (product.brandEcoRating >= 2.5) score += 10

    // Cap the score at 100
    score = Math.min(Math.max(score, 0), 100)

    // Determine label
    let label = 'Low'
    if (score >= 70) label = 'High'
    else if (score >= 40) label = 'Medium'

    return {
      score,
      label,
      percentage: (score / 100) * 100,
    }
  }, [product])
}
