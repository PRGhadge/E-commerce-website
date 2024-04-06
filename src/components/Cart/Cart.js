// Cart.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'; // Ensure your CSS is set up to reflect the new structure

function Cart({ cart, removeFromCart, updateCartItem, clearCart }) {
  const calculateTotalPrice = (price, discountPercentage, quantity) => {
    const discount = price * (discountPercentage / 100);
    const discountedPrice = price - discount;
    return (discountedPrice * quantity).toFixed(2);
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity * (1 - item.discountPercentage / 100);
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      {/* Table for Cart Items */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateCartItem(item.id, e.target.value)} 
                />
              </td>
              <td>${calculateTotalPrice(item.price, item.discountPercentage, item.quantity)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Cart Summary */}
      <div className="cart-summary">
        <button className="clear-cart-btn" onClick={clearCart}>CLEAR CART</button>
        <div className="cart-checkout">
          <div className="total-cost">
            Total ({cart.length} items): ${getTotalCost()}
          </div>
          <button className="checkout-btn">Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
