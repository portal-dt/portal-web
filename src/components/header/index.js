import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { GearFill, PersonFill } from 'react-bootstrap-icons';

import './index.css';


const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props
const userName = 'ACCOUNT DETAILS';

const Header = ({userName}) => {
  return (
    <Navbar bg="white" expand="false" className="header">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="#home"><img src={companyUrl} alt="company logo" style={{ height: '30px' }} /></Navbar.Brand>
      <div className="ml-auto account">
        <div className="account__settings">
          <div className="account__name">{userName}</div>
          <Nav.Link href="#settings">Account Settings <GearFill/></Nav.Link>
        </div>
        <div className="account__image">
          <PersonFill size={45} color="rgb(114, 187, 83)"/>
        </div>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

};

export default Header;