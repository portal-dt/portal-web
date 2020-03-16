import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Person, GearFill } from 'react-bootstrap-icons';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props
const userName = 'ACCOUNT DETAILS';

const Header = ({userName}) => {
  return (
    <Row>
      <Col xs="6">
        <Row>
          <Col xs>
            <Navbar expand="false">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse>
                <Nav.Link href="#">
                  Home
                </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
            <img src={companyUrl} alt="company logo" style={{ height: '40px' }} />
          </Col>
        </Row>
      </Col>
      <Col xs="6">
        <Row className="justify-content-end">
          <Col xs="10">
            <div>{userName}</div>
            <div>Account Settings <GearFill/></div>
          </Col>
          <Col xs="2">
            <Person/>
          </Col>
        </Row>
      </Col>
    </Row>
  );

};

export default Header;