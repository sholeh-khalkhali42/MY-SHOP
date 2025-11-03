import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout} from '../features/auth/authSlice';

import type { RootState, AppDispatch } from '../app/store';

const Header = () => {
  const dispatch = useDispatch();
 const { token, user } = useSelector((state: RootState) => state.auth);
const isLoggedIn = Boolean(token);


  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <Link className="text-xl font-bold" to="/">MyShop</Link>
        <div className="flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/" className="text-gray-700 hover:text-blue-500" end>خانه</NavLink>
            </li>
            <li>
              <NavLink to="/store" className="text-gray-700 hover:text-blue-500">فروشگاه</NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-gray-700 hover:text-blue-500">سبد خرید</NavLink>
            </li>
          </ul>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <li>
                  <span className="text-gray-700">سلام، {user.name}</span>
                </li>
                <li>
                  <button className="bg-transparent text-gray-700 hover:text-blue-500" onClick={handleLogout}>خروج</button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/auth" className="text-gray-700 hover:text-blue-500">ورود / ثبت‌نام</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
