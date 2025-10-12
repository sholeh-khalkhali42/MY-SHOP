// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading featured products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold animate-fade-in">Welcome to My Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 animate-fade-in">
        {featuredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md h-full hover:scale-105 transition-transform duration-300">
            <img src={product.image} className="w-full h-48 object-contain p-4" />
            <div className="p-4">
              <h6 className="text-lg font-semibold">{product.title.slice(0, 50)}</h6>
              <Link to={`/product/${product.id}`} className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white text-sm mt-2 inline-block">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home);
