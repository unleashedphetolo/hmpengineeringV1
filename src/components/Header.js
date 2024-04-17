import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import water1 from '../assets/batery2.jpg';
import water2 from '../assets/Renewable.webp';
import water3 from '../assets/food.jpg';
//import '../styles/Header.css';

const Header = ({ title, subTitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of image sources
  const images = [water1, water2, water3];

  useEffect(() => {
    // Function to switch to the next image after 3 seconds
    const slideShow = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(slideShow);
  }, [currentImageIndex, images.length]);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.5)),url(${images[currentImageIndex]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'rgb(28, 28, 28)',
        height: '500px',
        width: '100%',
        padding: 20,
      }}
      className='d-flex align-items-center'
    >
<Container>
        <div>
          <h1
            style={{
              color: 'white',
              fontWeight: '900',
              fontSize: '3rem', // Adjust the font size as desired
              fontFamily: 'Brush Script MT', // Custom font type
              textTransform: 'lowercase', // Convert the title to uppercase
            }}
          >
            {title}
          </h1>
          <p
            style={{
              color: 'green',
              fontSize: '1.5rem', // Adjust the font size as desired
              fontFamily: 'Georgia, serif', // Custom font type
            }}
          >
            {subTitle}
          </p>
          
        </div>
      </Container>
    </div>
  );
};

export default Header;
