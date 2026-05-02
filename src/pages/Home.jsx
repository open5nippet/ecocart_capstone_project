import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-eco-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          🌱 Welcome to <span className="text-eco-600">EcoCart</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Shop sustainable products with confidence. Every purchase reduces your environmental
          footprint. Discover eco-friendly alternatives that make a real difference.
        </p>
        <Link
          to="/products"
          className="bg-eco-600 hover:bg-eco-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition inline-block"
        >
          Explore Products →
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
          Why Choose EcoCart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <p className="text-4xl mb-4">📊</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Sustainability Score
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every product is rated on its environmental impact. Make informed choices based on
              real eco-data.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <p className="text-4xl mb-4">📈</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Track Your Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your carbon footprint reduction and environmental contributions in your
              personal dashboard.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <p className="text-4xl mb-4">🎯</p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Smart Recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized suggestions for more sustainable alternatives to your favorite
              products.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-eco-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">50K+</p>
              <p className="text-eco-100">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p className="text-eco-100">Eco Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">500K</p>
              <p className="text-eco-100">Carbon Saved (kg)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Ready to make a difference?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-eco-600 hover:bg-eco-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Shopping
          </Link>
          <Link
            to="/register"
            className="border-2 border-eco-600 text-eco-600 hover:bg-eco-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
