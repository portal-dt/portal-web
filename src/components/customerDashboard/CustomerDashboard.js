import React from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Card from '../card/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CustomerDashboard = () => {
  return (
    <>
      <Header />
      <Container className="page-content" >
        <Row>
          <Col xs="12" sm="6">
            <Card cardHeaderText="Documents" cardText="Here you can see your documents" />
          </Col>
          <Col xs="12" sm="6">
            <Card cardHeaderText="Messages" cardText="Start sending messages" />
          </Col>
          <Col xs="12" sm="6">
            <Card cardHeaderText="Last documents" cardText="Here you can see your documents" />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CustomerDashboard;