// src/components/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';

const AppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
<Navbar/>
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
