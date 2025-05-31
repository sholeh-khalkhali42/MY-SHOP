// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container text-center">
        <small>© {new Date().getFullYear()} MyShop. All rights reserved by Sholeh Khalkhali.</small>
      </div>
    </footer>
  );
};

export default Footer;
