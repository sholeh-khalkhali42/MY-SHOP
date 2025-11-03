// src/features/cart/CartPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from './cartSlice';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}


const CartPage:React.FC = () => {
  
  const dispatch = useDispatch();
  const items:CartItem[] = useSelector(state => state.cart.items);

  const totalPrice = items.reduce((total: number, item) => total + item.price * item.quantity, 0).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-20 px-4">
        <h3 className="text-xl font-semibold">Your cart is empty</h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      <div className="overflow-x-auto mt-3">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Image</th>
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Quantity</th>
              <th className="px-4 py-2 border border-gray-300">Total</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">{item.title.slice(0, 40)}</td>
                <td className="px-4 py-2 border border-gray-300">${item.price.toFixed(2)}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-transparent border border-gray-500 text-gray-500 px-2 py-1 rounded hover:bg-gray-500 hover:text-white text-sm"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-transparent border border-gray-500 text-gray-500 px-2 py-1 rounded hover:bg-gray-500 hover:text-white text-sm"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 border border-gray-300">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-lg font-semibold mt-3">Total: ${totalPrice}</h4>
      <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-3 inline-block">
  Proceed to Checkout
</Link>
    </div>
  );
};

export default CartPage;
