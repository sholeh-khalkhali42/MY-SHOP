import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container mt-5">
      <Button variant="outline-secondary" className="mb-4" onClick={handleGoBack}>
        ← Back
      </Button>
      <div className="row align-items-start">
        {/* Product Image */}
        <div className="col-md-6">
          <div className="bg-light p-4 rounded shadow-sm">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: '450px', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <p className="text-muted mb-4">{product.category.toUpperCase()}</p>
          <h3 className="text-danger">${product.price}</h3>
          <p className="mt-4">{product.description}</p>

          {/* Sample Color Select */}
          <div className="mb-3">
            <strong>Color:</strong>
            <div className="d-flex gap-2 mt-2">
              <div className="rounded-circle bg-primary" style={{ width: 25, height: 25 }}></div>
              <div className="rounded-circle bg-secondary" style={{ width: 25, height: 25 }}></div>
              <div className="rounded-circle bg-dark" style={{ width: 25, height: 25 }}></div>
            </div>
          </div>

        
          <Button className="mt-3 px-4 py-2"
                                 onClick={handleAddToCart }
                               >
                               Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
