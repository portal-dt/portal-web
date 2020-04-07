import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';

import { connect } from 'react-redux';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Footer = (props) => {  
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xs="12" md="6" className="align-self-center">
            <span>&copy; <a href="/">Kraft Bank</a>, {(new Date().getFullYear())} </span>
          </Col>
          <Col xs="12" md="6" className="align-self-center text-right">
            <span>Kraft Bank er medlem av Bankenes Sikringsfond</span>
            <select onChange={props.onChange}>
              <option value="en">English</option>
              <option value="sv">Svenska</option>
              <option value="no">Norsk</option>
            </select>
            {/* <DropdownButton id="language-dropdown" title="Select Language" variant="secondary" size="sm">
              <DropdownItem as="button">English</DropdownItem>
              <DropdownItem as="button">Norsk</DropdownItem>
              <DropdownItem as="button">Svenska</DropdownItem>
            </DropdownButton> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

function mapStateToProps(state) {
  return {
    language: state.configs.language
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => dispatch({type: 'CHANGE_LANG', payload: event.target.value})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);