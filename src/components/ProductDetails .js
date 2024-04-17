// ProductDetails.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();
  const selectedProduct = products.find((product) => product.id === id);

  if (!selectedProduct) {
    return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: 200 }}>
        <p>Product not found.</p>
      </div>
    );
  }

  // Get other products of the same category
  const relatedProducts = products.filter((product) => product.category === selectedProduct.category && product.id !== id);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%' }} />
        </Col>
        <Col md={8}>
          <h2>{selectedProduct.title}</h2>
          {/* Render other product details here */}
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          {renderProductVariations(selectedProduct)} {/* Make sure to define renderProductVariations */}
          <p>{selectedProduct.description}</p>
          <p>
            <strong style={{ fontSize: 20, fontWeight: '900' }}>
              R {selectedProduct.price}
            </strong>
          </p>
          <Button
            variant='dark'
            onClick={() => {
              selectedProduct.quantity = 1;
              addToCart(selectedProduct);
            }}
          >
            Add to cart
          </Button>
        </Col>
      </Row>
      <hr />
      <h3>Other Products in the Same Category</h3>
      <Row>
        {relatedProducts.map((product) => (
          <Col md={4} sm={6} xs={12} className='d-flex justify-content-center' key={product.id}>
            <Card style={{ width: '100%', marginTop: 20 }}>
              {/* ... (other product details) */}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDetails;
