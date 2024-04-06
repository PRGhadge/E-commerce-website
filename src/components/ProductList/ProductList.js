import React from 'react';
import { Link } from 'react-router-dom';
// ... other imports
import './ProductList.css'; // make sure to create a corresponding CSS file for styling

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2>Product List</h2>
      <div className="product-grid">
        {products.map((product) => {
          const discountedPrice = (
            product.price - 
            (product.price * (product.discountPercentage / 100))
          ).toFixed(2);

          return (
            <div className="product-item" key={product.id}>
               <div className="category-overlay">{product.category}</div>
              <img src={product.thumbnail} alt={product.title} className="product-image"/>
              <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div className="product-category">{product.category}</div>
                <div className="product-title">{product.title}</div>
                <div className="product-description">{product.description}</div>
                <div className="product-pricing">
                  {product.discountPercentage > 0 ? (
                    <>
                      <span className="original-price">${product.price}</span>
                      <span className="discounted-price">${discountedPrice}</span>
                      <span className="discount-percentage">
                        ({product.discountPercentage.toFixed(2)}% Off)
                      </span>
                    </>
                  ) : (
                    <span className="price">${product.price}</span>
                  )}
                </div>
                <Link to={`/products/${product.id}`} className="view-details-link">
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;
