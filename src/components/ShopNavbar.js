// ShopNavbar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import '../styles/ShopNavbar.css';

const ShopNavbar = ({ categories, onCategorySelect, onClearSearch }) => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="Show All">
      {categories.map((category) => (
        <Nav.Item key={category}>
          <Nav.Link
            eventKey={category}
            onClick={() => {
              onCategorySelect(category);
              onClearSearch(); // Clear the search query when a category is selected
            }}
            className="category-link" // Add a class name for custom styling
          >
            {category}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ShopNavbar;
