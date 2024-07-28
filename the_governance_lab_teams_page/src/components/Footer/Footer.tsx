import React from 'react';
import './Footer.css'; // Ensure this line is added to import the CSS file
import footerImage from '../../assets/Footer_Image.png'; // Import the footer image

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img src={footerImage} alt="Footer Logo" className="footer-image" />
      <p>© 2024 Governance Lab</p>
    </footer>
  );
};

export default Footer;
