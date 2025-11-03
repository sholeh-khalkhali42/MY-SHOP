import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

// Layout
import AppLayout from '../components/AppLayout';

// Lazy loaded Pages
const Home = lazy(() => import('../pages/Home'));
const ProductsPage = lazy(() => import('../features/products/ProductsPage'));
const ProductDetailPage = lazy(() => import('../features/products/ProductDetailPage'));
const CartPage = lazy(() => import('../features/cart/CartPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const PaymentPage = lazy(() => import('../pages/PaymentPage'));
const PrivateRoute = lazy(() => import('../components/privateRoute'));

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
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
