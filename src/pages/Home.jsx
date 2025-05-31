// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(res => res.json())
      .then(setFeaturedProducts);
  }, []);

  return (
    <div className="container mt-5">
      <h1>Welcome to My Shop</h1>
      <div className="row mt-4">
        {featuredProducts.map(product => (
          <div key={product.id} className="col-md-3">
            <div className="card h-100">
              <img src={product.image} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body">
                <h6>{product.title.slice(0, 50)}</h6>
                <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm mt-2">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
