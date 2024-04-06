// Import necessary dependencies and components from React and other libraries
import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import './styles.css'; // Importing CSS styles
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom'; // Importing routing components from React Router
import axios from 'axios'; // Importing Axios for making HTTP requests
import ProductList from './components/ProductList/ProductList'; // Importing ProductList component
import Cart from './components/Cart/Cart'; // Importing Cart component
import SearchBar from './components/SearchBar/SearchBar'; // Importing SearchBar component
import ProductDetails from './components/ProductDetails/ProductDetails'; // Importing ProductDetails component
import Sidebar from './components/SideBar/SideBar'; // Importing Sidebar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importing FontAwesomeIcon component
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importing the shopping cart icon

// Main App component
function App() {
  // State variables for managing products, cart, filtered products, categories, and selected category
  const [products, setProducts] = useState([]); // State for storing products
  const [cart, setCart] = useState([]); // State for storing cart items
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [categories, setCategories] = useState([]); // State for storing categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for storing selected category

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchData(); // Fetch products
    fetchCategories(); // Fetch categories
    setSelectedCategory(''); // Reset selected category
  }, []);

  // Function to fetch products from the API
  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products'); // Fetch products from API
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products); // Set products state
        setFilteredProducts(response.data.products); // Set filtered products state
      } else {
        console.error('Invalid data format:', response.data); // Log error if data format is invalid
      }
    } catch (error) {
      console.error('Error fetching data:', error); // Log error if fetching data fails
    }
  };

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories'); // Fetch categories from API
      console.log("Categories fetched:", response.data); // Log fetched categories
      setCategories(response.data); // Set categories state
    } catch (error) {
      console.error('Error fetching categories:', error); // Log error if fetching categories fails
    }
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set selected category state
    if (category === '') {
      setFilteredProducts(products); // Show all products if "All Categories" is selected
    } else {
      const filtered = products.filter((product) => product.category === category); // Filter products by selected category
      setFilteredProducts(filtered); // Set filtered products state
    }
  };

  // Function to add a product to the cart
  const addToCart = (newProduct) => {
    setCart((currentCart) => {
      const existingProductIndex = currentCart.findIndex(item => item.id === newProduct.id); // Check if the cart already contains the item

      if (existingProductIndex > -1) {
        // If item already exists, update the quantity
        const updatedCart = currentCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + newProduct.quantity };
          }
          return item;
        });
        return updatedCart; // Return updated cart
      } else {
        // If item does not exist, add the new item to the cart
        return [...currentCart, newProduct];
      }
    });
  };

  // Function to render product details page
  const ProductDetailsPage = () => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    return <ProductDetails product={product} addToCart={addToCart} />;
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId)); // Remove product from cart
  };

  // Function to update quantity of a product in the cart
  const updateCartItem = (productId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(updatedCart); // Update cart state
  };

  // Function to handle search
  const handleSearch = async (searchTerm, searchType) => {
    try {
      let apiUrl;
      if (searchType === 'name') {
        apiUrl = `https://dummyjson.com/products/search?q=${searchTerm}`; // Search products by name
      } else if (searchType === 'category') {
        apiUrl = `https://dummyjson.com/products/category/${searchTerm}`; // Search products by category
      } else {
        apiUrl = `https://dummyjson.com/products/search?q=${searchTerm}`; // Default to searching by name
      }

      const response = await axios.get(apiUrl); // Fetch products based on search query
      if (response.data && Array.isArray(response.data.products)) {
        setFilteredProducts(response.data.products); // Set filtered products state
      } else {
        setFilteredProducts([]); // Set filtered products state to empty array if no results
      }
    } catch (error) {
      console.error('Error searching for products:', error); // Log error if searching for products fails
      setFilteredProducts([]); // Set filtered products state to empty array
    }
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); // Sets the cart to an empty array
  };

  // JSX rendering
  return (
    <Router>
      <div className="container-fluid">
        {/* Header */}
        <div className="header">
          <Link to="/" className="brand">
            {/* Logo or title here */}
            <h1>E-commerce App</h1>
          </Link>
          <SearchBar onSearch={handleSearch} /> {/* Search bar component */}
          <Link to="/cart" className="cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} /> {/* Shopping cart icon */}
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>} {/* Display cart count if items exist */}
          </Link>
        </div>

        {/* Content Area */}
        <div className="content-container">
          {/* Sidebar */}
          <div className="sidebar">
            <Sidebar 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onCategorySelect={handleCategorySelect} 
            /> {/* Sidebar component */}
          </div>

          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<ProductList products={filteredProducts} addToCart={addToCart} />} /> {/* Route for displaying product list */}
              <Route path="/products/:id" element={<ProductDetailsPage />} /> {/* Route for displaying product details */}
              <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateCartItem={updateCartItem} clearCart={clearCart} />} /> {/* Route for displaying cart */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
