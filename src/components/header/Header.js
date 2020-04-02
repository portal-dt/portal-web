import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { BoxArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import './Header.less';
import Container from 'react-bootstrap/Container';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Header = ({userName}) => {
  return (
    <header className="header">
      <Container>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="#home" className="header__logo">
          <NavLink to="/">
            <img 
                src={companyUrl}
                alt="company logo"
                height="25"
                className="d-inline-block align-top"
            />
          </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/admins" className="nav-link header__link">Documenter</NavLink>
              <NavLink to="/" className="nav-link header__link">Users</NavLink>
            </Nav>
            <Button variant="link" className="header__link"><BoxArrowRight size={45}/>Log out</Button>
          </Navbar.Collapse>
        </Navbar>
      </Container>  
    </header>
  );

};

export default Header;