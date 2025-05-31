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
    <div className="container mt-5">
      <h2>Checkout</h2>
      <p>Review your order before proceeding to payment:</p>

      <ul className="list-group mb-4">
        {cartItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between">
            <span>Title:{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </li>
      </ul>

      <button className="btn btn-primary" onClick={handleConfirm}>
        Confirm and Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
