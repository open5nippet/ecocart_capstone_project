import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/slices/authSlice'
import productReducer from '@/redux/slices/productSlice'
import cartReducer from '@/redux/slices/cartSlice'
import wishlistReducer from '@/redux/slices/wishlistSlice'
import uiReducer from '@/redux/slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user'],
      },
    }),
})

export default store
