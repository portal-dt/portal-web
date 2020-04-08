import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux';
import { changeLang } from '../../actions/actions';
import { selectedLangSelector } from '../../selectors/selectors';

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
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

function mapStateToProps(state) {
  return {
    language: selectedLangSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => dispatch(changeLang(event.target.value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);