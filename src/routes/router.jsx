import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

// Layout
import AppLayout from '../components/AppLayout';

// Pages
import Home from '../pages/Home';
import ProductsPage from '../features/products/ProductsPage';
import ProductDetailPage from '../features/products/ProductDetailPage';
import CartPage from '../features/cart/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from '../components/privateRoute';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<ProductsPage />} />
       <Route path="/products" element={<ProductsPage />}></Route>

      <Route path="product/:productId" element={<ProductDetailPage />} />
      <Route path="cart" element={<CartPage />} /> 
  <Route path="login" element={<LoginPage />} />
 <Route path="register" element={<RegisterPage />} />
      <Route path="profile" element={
          <PrivateRoute>
        <ProfilePage />
        </PrivateRoute>
        }
      />
      <Route path="checkout" element={
          <PrivateRoute>
    <CheckoutPage/>
        </PrivateRoute>
        }
      />
       <Route path="payment" element={
          <PrivateRoute>
    <PaymentPage/>
        </PrivateRoute>
        }
      />
    
   </Route>
     )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
