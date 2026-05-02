import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { toggleDarkMode } from '@/redux/slices/uiSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { darkMode } = useSelector((state) => state.ui)
  const { totalItems } = useSelector((state) => state.cart)
  const { items: wishlistItems } = useSelector((state) => state.wishlist)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleDarkMode = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-bold text-xl text-eco-600">EcoCart</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-eco-600 transition">
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-eco-600 transition"
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-eco-600 transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              ♥
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-danger-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              🛒
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-eco-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-eco-600 hover:bg-eco-700 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-eco-600 hover:text-eco-700 font-semibold transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-eco-600 hover:bg-eco-700 text-white px-3 py-2 rounded-lg text-sm transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
