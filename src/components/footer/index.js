import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import './index.css';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Footer = () => {
  return (
    <footer>
      <Container className="footer-container">
          <div className="footer-copyright">
            (C) 2020 Docktricks
          </div>
          <div className="footer-logo">
            <img src={companyUrl} alt="company logo" style={{ height: '20px' }} />
          </div>
      </Container>
    </footer>
  );
};

export default Footer;