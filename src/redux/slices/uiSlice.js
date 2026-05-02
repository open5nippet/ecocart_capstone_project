import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true' || false,
  isLoading: false,
  notification: null,
  sidebarOpen: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      localStorage.setItem('darkMode', action.payload)
      if (action.payload) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

export const { toggleDarkMode, setDarkMode, setLoading, setNotification, toggleSidebar } =
  uiSlice.actions

export default uiSlice.reducer
