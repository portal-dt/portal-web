import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Person, Lock } from 'react-bootstrap-icons';

import { login } from '../../utils/auth';

import Button from '../button';

import './index.css';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const initialState = {
  userName: '',
  password: ''
};

const reducer = (state, { field, value }) => ({
  ...state,
  [field]: value
});

const SignInPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const handleInputChange = ({ target }) => dispatch({ field: target.name, value: target.value });

  const handleSignIn = async (event) => {
    event.preventDefault();

     try {
      //  await login(state);
       history.push('/admins');
     } catch (error) {
       console.log('not authorized')
     }
  };

  return (
    <Container className="sign-in-page">
      <Row className="sign-in-page__logo justify-content-center">
        <Col xs="4">
          <img src={companyUrl} alt="company logo" />
        </Col>
      </Row>
      <Form>
        <Form.Group as={Row} className="justify-content-center">
          <Col xs="4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Person/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" name="userName" placeholder="Username" onChange={handleInputChange} />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="justify-content-center">
          <Col xs="4">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Lock/>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleInputChange} />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="justify-content-center">
          <Col xs="2">
            <Button
              text="Sign In"
              classNames="sign-in-page__button"
              onClickHandler={handleSignIn}
              type="submit"
            />
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SignInPage;