import React from 'react'
import { useSustainability } from '@/hooks/useSustainability'
import { formatters } from '@/utils/formatters'

const SustainabilityBadge = ({ product, size = 'md' }) => {
  const { score, label, percentage } = useSustainability(product)

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  }

  const getColorClass = () => {
    if (score >= 70) return 'bg-eco-100 text-eco-800 border border-eco-300'
    if (score >= 40) return 'bg-warn-100 text-warn-800 border border-warn-300'
    return 'bg-danger-100 text-danger-800 border border-danger-300'
  }

  const getProgressColor = () => {
    if (score >= 70) return 'bg-eco-500'
    if (score >= 40) return 'bg-warn-500'
    return 'bg-danger-500'
  }

  return (
    <div className={`rounded-lg ${getColorClass()} ${sizeClasses[size]}`}>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="font-semibold text-xs mb-1">
            Eco Score: {formatters.formatScore(score)}
          </div>
          <div className="text-xs mb-1">{label}</div>
          <div className="w-full bg-gray-300 rounded-full h-1.5">
            <div
              className={`${getProgressColor()} h-1.5 rounded-full transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="text-lg font-bold hidden sm:block">{Math.round(score)}</div>
      </div>
    </div>
  )
}

export default SustainabilityBadge
