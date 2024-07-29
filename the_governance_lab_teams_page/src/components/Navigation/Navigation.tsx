import React from 'react';
import { Navbar, Container, Form, Button } from 'react-bootstrap';
import './Navigation.css';
import logo from '../../assets/the-govlab-logo-white.png';

const Navigation: React.FC = () => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container fluid className="navbar-container">
        <div className='icons-search-bar-container'>
          <div className="icons-container">
            <i className='material-icons'>menu</i>
            <i className='material-icons'>search</i>
          </div>
          <Form className="d-flex search-form">
            <Form.Control
              type="search"
              placeholder=""
              className="me-0 search-input"
              aria-label="Search"
            />
            <Button variant="outline-light" className="search-button">SEARCH</Button>
          </Form>
        </div>
        <Navbar.Brand href="#home" className="mx-auto logo-container">
          <a href='https://thegovlab.org/'>
            <img src={logo} alt="The GovLab Logo" className="govlab-logo" />
          </a>
        </Navbar.Brand>
        <div className="links-container">
          <Button variant="outline-light" className="our-sites-button">OUR SITES</Button>
          <a href="https://twitter.com/TheGovLab" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.youtube.com/user/TheGovLab" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;