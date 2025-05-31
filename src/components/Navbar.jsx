import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount } from '../features/cart/cartSlice';
import { logout } from '../features/auth/authSlice';

import { AiFillHome } from 'react-icons/ai';
import { BsCartFill } from 'react-icons/bs';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemsCount);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">

      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <AiFillHome size={24} />
          MyShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">

            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/">
                <AiFillHome size={20} />
                Home
              </Link>
            </li>

            <li className="nav-item position-relative">
              <Link className="nav-link d-flex align-items-center gap-1" to="/cart">
                <BsCartFill size={20} />
                Cart
                {itemCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {itemCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/login">
                    <FiLogIn size={20} />
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/register">
                    <FiUserPlus size={20} />
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    {user?.email || 'Profile'}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link d-flex align-items-center gap-1"
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                  >
                    <FiLogOut size={20} />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
