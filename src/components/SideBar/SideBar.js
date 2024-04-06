import React, { useState } from 'react';
import './SideBar.css'; // Make sure you have the corresponding CSS file for styling

const Sidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && ( // Render this button only when `isOpen` is false
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          ☰ {/* Replace with an icon if you want */}
        </button>
      )}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 onClick={() => onCategorySelect('')}>All Categories</h2>
          <button className="close-sidebar" onClick={toggleSidebar}>X</button>
        </div>
        <ul className="category-list">
          {categories.map((category, index) => (
            <li 
              key={index} 
              className={`category-item ${selectedCategory === category ? 'active' : ''}`} 
              onClick={() => {
                onCategorySelect(category);
                toggleSidebar(); // Close the sidebar when a category is selected
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
