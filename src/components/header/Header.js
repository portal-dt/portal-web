import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { BoxArrowRight } from 'react-bootstrap-icons';

import './Header.less';
import Container from 'react-bootstrap/Container';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Header = ({userName}) => {
  return (
    <header className="header">
      <Container>
        <Navbar>
          <Navbar.Brand href="#home" className="header__logo">
            <img 
                src={companyUrl}
                alt="company logo"
                height="25"
                className="d-inline-block align-top"
            />
          </Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="#" className="header__link">Hi, {userName}</Nav.Link>
          </Nav>
          <Button variant="link" className="header__link"><BoxArrowRight size={45}/>Log out</Button>
        </Navbar>
      </Container>  
    </header>
  );

};

export default Header;