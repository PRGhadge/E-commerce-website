// ProductDetails.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductDetails({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1); // Initialize quantity state
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    // Prevent negative quantity
    setQuantity(Math.max(1, e.target.value));
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: quantity // Use the local quantity state
    };
    addToCart(productToAdd);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart'); // Navigate to cart page
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="product-details-container">
      <button onClick={handleGoBack} className="go-back-btn">&lt; Back</button>
      <div className="product-details">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="product-details-image"
        />
        <div className="product-details-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className="product-details-price">
            Price: <span className="line-through">${product.price}</span> ${product.discountedPrice}
          </p>
          <p>Category: {product.category}</p>
          <div className="product-quantity-selector">
            <label>Quantity:</label>
            <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-btn">Add To Cart</button>
          <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
