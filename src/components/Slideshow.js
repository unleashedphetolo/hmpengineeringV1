import React, { useState, useEffect } from 'react';
import team1 from '../assets/Engineering team.jpg';
import team2 from '../assets/engineer.jpg';
import team3 from '../assets/EngineeringTeam2.jpg';
import team4 from '../assets/EngineeringTeam3.jpg';
import '../styles/Home.css';



const NavbarSlideshow = () => {
  const images = [team1, team2, team3, team4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Changes every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentImage = images[currentImageIndex];

  return (
    <div
      className="navbar-collapse"
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: 'auto',
        margin: '0 -12px -8px -12px',
        position: 'relative',
      }}
    >
      {/* Add your navbar content here */}
    </div>
  );
};

export default NavbarSlideshow;
