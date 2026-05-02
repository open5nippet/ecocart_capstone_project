import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setError, setLoading, clearError } from '@/redux/slices/authSlice'
import { validators } from '@/utils/validators'
import { localLogin } from '@/utils/localAuthService'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
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
    const validationErrors = validators.validateLoginForm(formData.email, formData.password)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    dispatch(setLoading(true))
    try {
      // Login using localStorage (no backend server required)
      const safeUser = localLogin({
        email: formData.email,
        password: formData.password,
      })

      dispatch(setUser(safeUser))
      navigate('/dashboard')
    } catch (err) {
      dispatch(setError(err.message || 'Login failed. Please try again.'))
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
            Login to EcoCart
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Welcome back to sustainable shopping
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="login-email"
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
                id="login-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 pr-12 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-eco-500 transition ${
                  errors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300'
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
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
            {errors.password && (
              <p className="text-red-600 dark:text-red-400 text-xs mt-1">⚠ {errors.password}</p>
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
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-eco-600 hover:text-eco-700 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
