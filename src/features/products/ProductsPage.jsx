// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts) || [];
  const loading = useSelector(state => state.products.loading);
  const [searchTerm, setSearchTerm] = useState(''); 

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [...new Set(products.map(product => product.category))];

  
  const filteredProducts = products.filter(product => {
  const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
  const priceMatch = !maxPrice || product.price <= parseFloat(maxPrice);
  const searchMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase()); // 🆕 جستجو
  return categoryMatch && priceMatch && searchMatch;
});

  const featuredProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="container mt-5">
     <Helmet>
        <title>Products | My Online Store</title>
        <meta
          name="description"
          content="Browse our wide selection of quality products. Filter by category and price to find exactly what you're looking for."
        />
      </Helmet>
      <h2 className="mb-4">Featured Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...sliderSettings}>
          {featuredProducts.map(product => (
            <div key={product.id} className="px-2">
              <div className="card h-100 border-primary shadow-sm" style={{ cursor: 'pointer' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top p-3"
                  style={{ height: '180px', objectFit: 'contain', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="card-body">
                  <h6 className="card-title">{product.title.slice(0, 50)}</h6>
                  <p className="text-primary fw-bold">{product.price} $</p>
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      <hr className="my-5" />

      
{/* Filters */}
<div className="row mb-4">
  {/* Category Filter */}
  <div className="col-md-4">
    <label htmlFor="categorySelect" className="form-label">
      Filter by Category:
    </label>
    <select
      id="categorySelect"
      className="form-select"
      value={selectedCategory}
      onChange={e => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
      }}
    >
      <option value="all">All</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>

  {/* Max Price Filter */}
  <div className="col-md-4">
    <label htmlFor="maxPriceInput" className="form-label">
      Max Price:
    </label>
    <input
      id="maxPriceInput"
      type="number"
      className="form-control"
      value={maxPrice}
      onChange={e => {
        setMaxPrice(e.target.value);
        setCurrentPage(1);
      }}
      placeholder="Enter max price"
      min="0"
    />
  </div>

  {/* Search Bar */}
  <div className="col-md-4">
    <label htmlFor="searchInput" className="form-label">
      Search:
    </label>
    <form
      className="row g-2"
      onSubmit={e => {
        e.preventDefault();
        setCurrentPage(1);
      }}
    >
      <div className="col-12 col-md-10">
        <input
          id="searchInput"
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="col-12 col-md-2">
        <button
          type="submit"
          className="btn btn-dark btn-sm w-100 d-flex align-items-center justify-content-center"
          aria-label="Search"
        >
          <i className="bi bi-search mt-1"></i>
        </button>
      </div>
    </form>
  </div>
</div>

      <h2>All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : currentProducts.length === 0 ? (
        <p className="text-center mt-4">No products match your filters.</p>
      ) : (
        <>
          <div className="row">
            {currentProducts.map(product => (
              <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    style={{ height: '200px', objectFit: 'contain', transition: 'transform 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6>{product.title.slice(0, 50)}</h6>
                    <p className="text-success fw-bold">{product.price} $</p>
                    <div className="mt-auto d-flex flex-column gap-2">
                      <Link to={`/product/${product.id}`} className="btn btn-outline-dark btn-sm">
                        Details
                      </Link>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
