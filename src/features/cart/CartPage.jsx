// src/features/cart/CartPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from './cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="container mt-5">
        <h3>Your cart is empty 😔</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="table-responsive mt-3">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                  />
                </td>
                <td>{item.title.slice(0, 40)}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
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
      <h4 className="mt-3">Total: ${totalPrice}</h4>
      <Link to="/checkout" className="btn btn-success mt-3">
  Proceed to Checkout
</Link>
    </div>
  );
};

export default CartPage;
