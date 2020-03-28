import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs="3" className="align-self-center">
            <img src={companyUrl} alt="company logo" style={{ height: '40px' }} />
          </Col>
          <Col xs="9" className="align-self-center">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;