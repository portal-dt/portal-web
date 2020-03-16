import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Footer = () => {
  return (
    <Row>
      <Col xs="6" className="align-self-start">
        (C) 2020 Docktricks
      </Col>
      <Col xs="6" className="align-self-end">
        <img src={companyUrl} alt="company logo" style={{ height: '40px' }} />
      </Col>
    </Row>
  );
};

export default Footer;