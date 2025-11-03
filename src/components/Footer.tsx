// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-3 fixed bottom-0 left-0 right-0 w-full z-10">
      <div className="max-w-7xl mx-auto text-center">
        <small>© {new Date().getFullYear()} MyShop. All rights reserved by Sholeh Khalkhali.</small>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
