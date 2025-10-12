// src/pages/CheckoutPage.jsx
import React from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  console.log(cartItems ,"cartItems.title ")
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

 
  

   const handleConfirm = () => {
    const newOrder = {
      id: Date.now(), // یا هر شناسه منحصر به فرد دیگه
      date: new Date().toLocaleString(),
      items: cartItems,
      total: totalPrice,
       
    };
     navigate('/payment');
    dispatch(addOrder(newOrder));
    dispatch(clearCart()); // پاک کردن سبد خرید بعد از ثبت سفارش

  };


  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <p>Review your order before proceeding to payment:</p>

      <ul className="space-y-2 mb-4">
        {cartItems.map(item => (
          <li key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>Title:{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
        <li className="bg-white p-4 rounded shadow flex justify-between items-center font-bold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </li>
      </ul>

      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleConfirm}>
        Confirm and Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
