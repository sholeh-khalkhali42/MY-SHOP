import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'
 import authReducer from '../features/auth/authSlice';
 import productsReducer from '../features/products/productsSlice'
import ordersReducer from '../features/order/orderSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
     orders: ordersReducer
  },
  
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
