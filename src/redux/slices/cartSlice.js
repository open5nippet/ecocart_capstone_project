import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += product.quantity || 1
      } else {
        state.items.push({ ...product, quantity: product.quantity || 1 })
      }

      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
      state.totalItems = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
