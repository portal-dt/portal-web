import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Footer = () => {  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs="12" md="6" className="align-self-center">
            <span>&copy; <a href="/">Kraft Bank</a>, {(new Date().getFullYear())} </span>
          </Col>
          <Col xs="12" md="6" className="align-self-center text-right">
            <span>Kraft Bank er medlem av Bankenes Sikringsfond</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;