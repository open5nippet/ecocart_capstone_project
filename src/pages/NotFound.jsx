import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-eco-600 hover:bg-eco-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
