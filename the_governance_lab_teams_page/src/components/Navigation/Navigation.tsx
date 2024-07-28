import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './Navigation.css';
import logo from '../../assets/the-govlab-logo-white.png';

const Navigation: React.FC = () => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container fluid className="navbar-container">
        <div className='icons-container'>
          <i className='material-icons'>menu</i>
          <i className='material-icons'>search</i>
        </div>
        <Navbar.Brand href="#home" className="mx-auto logo-container">
          <a href='https://thegovlab.org/'>
            <img src={logo} alt="The GovLab Logo" className="govlab-logo" />
          </a>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;