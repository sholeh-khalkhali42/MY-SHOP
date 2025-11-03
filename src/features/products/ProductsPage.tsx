// src/features/products/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import type { ProductItem } from '../../types/Products';
import type { RootState, AppDispatch } from '../../app/store';


const ProductsPage:React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const products = useSelector((state: RootState) => selectAllProducts(state));
  const loading = useSelector((state :RootState)=> state.products.loading);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [...new Set(products.map(product => product.category))];

  
  const filteredProducts: ProductItem[]  = products.filter(product => {
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


  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <nav className="mt-4">
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-2 rounded ${
              currentPage === i + 1
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
     <Helmet>
        <title>Products | My Online Store</title>
        <meta
          name="description"
          content="Browse our wide selection of quality products. Filter by category and price to find exactly what you're looking for."
        />
      </Helmet>
      <h2 className="mb-4 text-2xl font-bold">Featured Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...sliderSettings}>
          {featuredProducts.map(product => (
            <div key={product.id} className="px-2">
              <div className="bg-white rounded-lg shadow-md border border-blue-500 h-full flex flex-col cursor-pointer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain p-4"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="p-4 flex flex-col flex-1">
                  <h6 className="text-lg font-semibold min-h-[3rem]">{product.title.slice(0, 50)}</h6>
                  <p className="text-blue-600 font-bold">{product.price} $</p>
                  <div className="mt-auto">
                    <button
                      className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white text-sm w-full"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}

      <div className="border-t border-gray-300 my-20" />

{/* Filters */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
  {/* Category Filter */}
  <div>
    <label htmlFor="categorySelect" className="text-sm font-medium text-gray-700">
      Filter by Category:
    </label>
    <select
      id="categorySelect"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  <div>
    <label htmlFor="maxPriceInput" className="text-sm font-medium text-gray-700">
      Max Price:
    </label>
    <input
      id="maxPriceInput"
      type="number"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  <div>
    <label htmlFor="searchInput" className="text-sm font-medium text-gray-700">
      Search:
    </label>
    <form
      className="flex gap-2"
      onSubmit={e => {
        e.preventDefault();
        setCurrentPage(1);
      }}
    >
      <input
        id="searchInput"
        type="text"
        className="w-full md:w-5/6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 text-sm w-full md:w-1/6 flex items-center justify-center"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  </div>
</div>

      <h2 className="text-2xl font-bold">All Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : currentProducts.length === 0 ? (
        <p className="text-center mt-4">No products match your filters.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md h-full">
                <img
                  src={product.image}
                  className="w-full h-48 object-contain p-4"
                  style={{ transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div className="p-4 flex flex-col">
                  <h6 className="text-lg font-semibold min-h-[3rem]">{product.title.slice(0, 50)}</h6>
                  <p className="text-green-600 font-bold">{product.price} $</p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link to={`/product/${product.id}`} className="bg-transparent border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-800 hover:text-white text-sm text-center">
                      Details
                    </Link>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to Cart
                    </button>
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
