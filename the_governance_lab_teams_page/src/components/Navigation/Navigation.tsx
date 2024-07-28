import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './Navigation.css';
import logo from '../../assets/the-govlab-logo-white.png';

const Navigation: React.FC = () => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container className="justify-content-center">
        <Navbar.Brand href="#home" className="mx-auto">
          <img src={logo} alt="The GovLab Logo" className="govlab-logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
