import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './Navigation.css';

const Navigation: React.FC = () => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
