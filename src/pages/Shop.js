import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ShopContext from '../context/shop/shopContext';
import Loading from '../components/Loading';
import ShopNavbar from '../components/ShopNavbar';
import Header from '../components/Header';
import water from '../assets/water.jpg';
import '../styles/Shop.css'; // Import the CSS file

const Shop = () => {
  const { getProducts, products, loading, addToCart } = useContext(ShopContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showProductCategories, setShowProductCategories] = useState(false); // Step 1: State for visibility of categories

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search query and selected category
    if (products) {
      const filtered = products.filter(
        (product) =>
          (selectedCategory === '' || product.category === selectedCategory) &&
          (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.type && product.type.toLowerCase().includes(searchQuery.toLowerCase())))
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, selectedCategory, products]);

  const categoryDetails = {
    'Solar Dryer': { render: true, variations: ['type', 'size'] },
    'Biodigester': { render: true, variations: ['type', 'size'] },
    'Gas Membrane': { render: true, variations: ['type', 'size'] },
    'Biogas filter': { render: true, variations: ['type'] },
    'Biogas booster pump': { render: true, variations: ['type', 'size'] },
    'Vertical farm': { render: true, variations: ['type', 'size'] },
    'Inflatable water tank': { render: true, variations: ['type', 'size'] },
    'Batteries': { render: true, variations: ['type'] },
    'Inverters': { render: true, variations: ['type'] },
    'Power banks': { render: true, variations: ['type'] },
    'Portable power banks': { render: true, variations: ['type'] },
    'Dual Generators': { render: true, variations: ['type'] },
  };

  const renderProductVariations = (product) => {

    const categoryDetail = categoryDetails[product.category];
    if (categoryDetail && categoryDetail.render) {
      return categoryDetail.variations.map((variation) => (
        <p key={variation}>
          <strong>{variation.charAt(0).toUpperCase() + variation.slice(1)}:</strong> {product[variation]}
        </p>
      ));
    }
    return null;
  };

  // Update the onCategorySelect function to handle the "Show All" option
  const handleCategorySelect = (category) => {
    
    // If "Show All" is selected, set selectedCategory to an empty string to show all products
    setSelectedCategory(category === 'Show All' ? '' : category);
    
  };

  // State to keep track of the opened product
  const [openedProductId, setOpenedProductId] = useState(null);

  // Function to toggle the open/close state of the product description
  const toggleProductDescription = (productId) => {
    setOpenedProductId(openedProductId === productId ? null : productId);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header
        image={water}
        title='RESHAPING OUR WORLD THROUGH ENGINEERING DESIGN'
        subTitle='Explore our wide range of products and find what you need.'
      />
      
      <Container fluid>
        <div className='d-flex justify-content-center'>
        <Button onClick={()=> setShowProductCategories(!showProductCategories)}
        
        style={{
          marginTop: '12px',
          my: '2px',
          mx: '1px',
          display: 'block',
          fontWeight: 'bold',
          backgroundColor: showProductCategories ? 'grey' : '#76ae36',
          color: 'white', // Set the text color to black
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          height: '40px', // Add height to the button
          width: '300px', // Add width to the button
        }}
        >
          
      Products Categories
    </Button>
        </div>
      
        {showProductCategories?
         <ShopNavbar
         categories={[
           'Show All', // Include the "Show All" option
           'Solar Dryer',
           'Biodigester',
           'Gas Membrane',
           'Biogas filter',
           'Biogas booster pump',
           'Vertical farm',
           'Inflatable water tank',
           'Batteries',
           'Inverters',
           'Power banks',
           'Portable power banks',
           'Dual Generators',
           // Add other categories here
         ]}
         onCategorySelect={handleCategorySelect} // Pass the handleCategorySelect function
         onClearSearch={() => setSearchQuery('')}
       /> 
      :
      null
      }
       
        {/* Search input and button */}
        <Row className='my-4' style={{ alignItems: 'flex-start' }}>
          <Col md={12} className='d-flex justify-content-center'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type='text'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant='primary'
                onClick={() => setSearchQuery('')} // Clear search query
                className='ClearButton'
              >
                Clear
              </Button>
            </div>
          </Col>
        </Row>
        <Row className='mt-2' style={{ alignItems: 'flex-start' }}>
          {loading ? (
            <div className='d-flex align-items-center justify-content-center' style={{ height: 200 }}>
              <Loading />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className='d-flex align-items-center justify-content-center' style={{ height: 200 }}>
              <p>No products found.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Col md={4} sm={6} xs={12} className='d-flex justify-content-center' key={product.id}>
                <Card style={{ width: '100%', marginTop: 20 }}>
                
              <a href="#" onClick={(e) => { e.preventDefault(); toggleProductDescription(product.id); }}>
              <Card.Img variant='top' src={product.image} height={280} />
              <Card.Title style={{ color: 'black', textDecoration: 'none' }}>{product.title}</Card.Title>
               </a>
                  <Card.Body>
                    <div>
                      {/* Button to toggle the product description */}
                    

                      {/* Scrollable container for the product details */}
                      {openedProductId === product.id && (
                    <div
                    style={{
                      maxHeight: '150px', // Set the maximum height for scrolling
                      overflowY: 'auto', // Enable vertical scrolling
                      marginBottom: '10px', // Add some margin at the bottom
                    }}
                  >
                    <p><strong>Category:</strong> {product.category}</p>
                    {renderProductVariations(product)}
                    <p>{product.description}</p>
                  </div>
                )}

                <p>
                  <strong style={{ fontSize: 20, fontWeight: '900' }}>
                    R {product.price}
                  </strong>
                </p>
                <Button
                  variant='dark'
                  onClick={() => {
                    product.quantity = 1;
                    addToCart(product);
                  }}
                >
                  Add to cart
                </Button>
                </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
