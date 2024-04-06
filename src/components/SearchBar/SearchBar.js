import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; // Import CSS for SearchBar styling

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [isValidCategory, setIsValidCategory] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setIsValidCategory(true); // Reset validation when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Remove the second argument searchType
  };
  

  const handleClear = () => {
    setSearchTerm('');
    setIsValidCategory(true); // Reset category validation when clearing
    onSearch('');
  };
  

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
        
        <button className="search-button" type="submit">Search</button>
        <button className="clear-button" type="button" onClick={handleClear}>Clear</button>
        
        {!isValidCategory && <p className="error-message">Invalid category selected!</p>}
      </form>
    </div>
  );
}

export default SearchBar;
