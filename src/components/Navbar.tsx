import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount } from '../features/cart/cartSlice';
import { logout } from '../features/auth/authSlice';

import { AiFillHome } from 'react-icons/ai';
import { BsCartFill } from 'react-icons/bs';
import { FiLogIn, FiUserPlus, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemsCount);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <nav className="bg-gray-800 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
        <Link className="flex items-center gap-2 text-white text-xl font-bold" to="/">
          <AiFillHome size={24} />
          MyShop
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className={`md:flex items-center gap-3 ${isOpen ? 'block' : 'hidden'} absolute md:relative top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:top-auto md:left-auto`}>
          <Link className="flex items-center gap-1 text-white hover:text-gray-300 px-3 py-2 md:px-0 md:py-0" to="/" onClick={() => setIsOpen(false)}>
            <AiFillHome size={20} />
            Home
          </Link>

          <div className="relative">
            <Link className="flex items-center gap-1 text-white hover:text-gray-300 px-3 py-2 md:px-0 md:py-0" to="/cart" onClick={() => setIsOpen(false)}>
              <BsCartFill size={20} />
              Cart
            </Link>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {itemCount}
              </span>
            )}
          </div>

          {!token ? (
            <>
              <Link className="flex items-center gap-1 text-white hover:text-gray-300 px-3 py-2 md:px-0 md:py-0" to="/login" onClick={() => setIsOpen(false)}>
                <FiLogIn size={20} />
                Login
              </Link>

              <Link className="flex items-center gap-1 text-white hover:text-gray-300 px-3 py-2 md:px-0 md:py-0" to="/register" onClick={() => setIsOpen(false)}>
                <FiUserPlus size={20} />
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="text-white hover:text-gray-300 px-3 py-2 md:px-0 md:py-0" to="/profile" onClick={() => setIsOpen(false)}>
                {user?.email || 'Profile'}
              </Link>
              <button
                className="flex items-center gap-1 text-white hover:text-gray-300 px-3 py-2 md:px-0 md:py-0"
                onClick={() => { handleLogout(); setIsOpen(false); }}
              >
                <FiLogOut size={20} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
