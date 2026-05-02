import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setError, setLoading, clearError } from '@/redux/slices/authSlice'
import { validators } from '@/utils/validators'
import { localRegister } from '@/utils/localAuthService'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error on typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    setErrors({})

    // Client-side validation
    const validationErrors = validators.validateRegisterForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    dispatch(setLoading(true))
    try {
      // Register user using localStorage (no backend server required)
      const safeUser = localRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      dispatch(setUser(safeUser))
      navigate('/dashboard')
    } catch (err) {
      dispatch(setError(err.message || 'Registration failed. Please try again.'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">🌱</span>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-3">
            Join EcoCart
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Start your sustainable shopping journey today
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="register-name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-eco-500 transition ${
                errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300'
              }`}
              placeholder="John Doe"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">⚠ {errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="register-email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-eco-500 transition ${
                errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">⚠ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="register-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 pr-12 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-eco-500 transition ${
                  errors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password ? (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">⚠ {errors.password}</p>
            ) : (
              <p className="text-gray-400 text-xs mt-1">
                Min 8 chars, include uppercase, lowercase &amp; a number
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="register-confirm-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 pr-12 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-eco-500 transition ${
                  errors.confirmPassword
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                    : 'border-gray-300'
                }`}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                ⚠ {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-eco-600 hover:bg-eco-700 disabled:bg-eco-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-eco-600 hover:text-eco-700 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
