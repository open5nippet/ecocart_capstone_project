import { createSlice } from '@reduxjs/toolkit'

// Load persisted user from localStorage so login survives page refresh
const loadUserFromStorage = () => {
  try {
    const serialized = localStorage.getItem('ecocart_user')
    if (!serialized) return { user: null, isAuthenticated: false }
    const user = JSON.parse(serialized)
    return { user, isAuthenticated: true }
  } catch {
    return { user: null, isAuthenticated: false }
  }
}

const initialState = {
  ...loadUserFromStorage(),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
      state.loading = false
      // Persist to localStorage
      localStorage.setItem('ecocart_user', JSON.stringify(action.payload))
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      // Clear from localStorage
      localStorage.removeItem('ecocart_user')
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setUser, setLoading, setError, logout, clearError } = authSlice.actions
export default authSlice.reducer
