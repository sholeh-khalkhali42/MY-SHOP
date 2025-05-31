import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser} from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">MyShop</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>خانه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/store" className="nav-link">فروشگاه</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">سبد خرید</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">سلام، {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>خروج</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/auth" className="nav-link">ورود / ثبت‌نام</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
