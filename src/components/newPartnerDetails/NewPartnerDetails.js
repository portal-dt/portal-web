import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Button from '../button/Button';

const userName = 'USERNAME NAMEUSER';

const NewPartnerDetails = () => {
  return (
    <>
      <Header userName={userName} />
      <Row>
        <Col xs="8" >
          <Form>
            <Form.Row>
              <Col xs="6">
                <Form.Control placeholder="Username" />
              </Col>
              <Col xs="6">
                <Form.Control placeholder="Email" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs="6">
                <Form.Control placeholder="Company name" />
              </Col>
              <Col xs="6">
                <Form.Control placeholder="Background" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs="6">
                <Form.Control placeholder="Partner URL" />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Button text="Add User" />
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default NewPartnerDetails;