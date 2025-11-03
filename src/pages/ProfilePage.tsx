// src/pages/ProfilePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector(state => state.auth.user);
  const orders = useSelector(state => state.orders?.history || []);

  return (
    <div className="container mt-5">
      <h2>Profile Page</h2>

      {user ? (
        <>
          <p><strong>Email:</strong> {user.email}</p>

          <h3>Order History</h3>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul>
              {orders.map((order, idx) => (

                <li key={idx}>
               {order.image}   Order #{order.id} - {order.date} - Total: ${order.total}
                  {/* می‌تونی جزئیات بیشتر سفارش رو اینجا نمایش بدی */}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Please log in to see your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
