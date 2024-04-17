import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div style={{ minHeight: '75vh' }}>
      <Header
        image="https://images.unsplash.com/photo-1594818379496-da1e345b0ded?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
        title="Get in Touch"
        subTitle="Need to get in touch? We'd love to hear from you."
      />
      <Container>
        <Row className="align-items-center">
          <div className="contact-heading">
            <h1>Contact Us</h1>
          </div>
          <Col md={6}>
            <div className="d-flex justify-content-center">
              {/* Replace the contact-image with the embedded map */}
              <iframe
                title="Location Map"
                width="100%"
                height="400"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d27.9092409!3d-26.1718827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a1a165492447%3A0x2fdf7985c5aaf874!2sHMP%20Engineering%20Solutions!5e0!3m2!1sen!2sus!4v1642458059937!5m2!1sen!2sus"
              ></iframe>
            </div>
          </Col>
          <Col md={6}>
            <div className="contact-info">
              <h1>HMP ENGINEERING SOLUTIONS</h1>
              <p>Call: 010 012 6592/ 073 505 1204</p>
              <h4>Physical address</h4>
              <p>14 Goldman Street, Florida, Roodepoort, South Africa</p>
              <h4>General queries</h4>
              <p>info@hmpengineering.co.za</p>
              <h1>QUESTIONS & ESTIMATES</h1>
              <p>
                We would love to hear from you! Please reach out at your
                convenience so we can discuss your project.
              </p>
              <a
                className="contact-btn"
                href="https://wa.me/27735051204"
                role="button"
              >
                WhatsApp
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
