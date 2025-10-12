import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';


const ProductDetailPage = () => {
    const dispatch = useDispatch();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const location = useLocation()
  const navigate = useNavigate();
const previousPage = location.state?.from || '/products';
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(setProduct);
  }, [productId]);
   const handleGoBack = () => {
    navigate(previousPage);
  };

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      <button className="bg-transparent border border-gray-500 text-gray-500 px-4 py-2 rounded hover:bg-gray-500 hover:text-white mb-4" onClick={handleGoBack}>
        ← Back
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto"
              style={{ maxHeight: '450px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h2 className="font-bold mb-3">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.category.toUpperCase()}</p>
          <h3 className="text-red-600">${product.price}</h3>
          <p className="mt-4">{product.description}</p>

          {/* Sample Color Select */}
          <div className="mb-3">
            <strong>Color:</strong>
            <div className="flex gap-2 mt-2">
              <div className="rounded-full bg-blue-500 w-6 h-6"></div>
              <div className="rounded-full bg-gray-500 w-6 h-6"></div>
              <div className="rounded-full bg-black w-6 h-6"></div>
            </div>
          </div>


          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3"
                                 onClick={handleAddToCart }
                               >
                               Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
