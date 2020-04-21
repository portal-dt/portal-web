import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import { login } from '../../utils/auth';
import { loginAction } from '../../actions/actions';

import Button from '../button/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Person, Lock } from 'react-bootstrap-icons';

import './SignInPage.less';

const initialState = {
  email: '',
  password: ''
};

const handleInputChangesReducer = (state, { field, value }) => ({
  ...state,
  [field]: value
});

const SignInPage = () => {
  const { formatMessage } = useIntl();
  const [signInFields, changeField] = useReducer(handleInputChangesReducer, initialState);
  const [isSignInAsEmail, setIsSignInAsEmail] = useState(false);
  const [bankIdUrl, setBankIdUrl] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getBankIdUrl = async () => {
     try {
       const { data: { accessUrl } } = await axios.post('https://testbed-eid.scrive.com/api/v1/transaction/new', {
           redirectUrl: "http://localhost:8080/dashboard",
           provider: "noBankID",
           method: "auth"
         },
         { headers: {
             'Authorization': 'Bearer aa1c2854-6627-48b5-8efb-74ff0bfc5d3d.0440cdff-9602-43b6-9706-a9cb54b9614c'
           } });

       setBankIdUrl(accessUrl);
     } catch (e) {
       console.log(e);
     }
    };
    getBankIdUrl();
  }, []);

  const handleInputChange = ({ target }) => changeField({ field: target.name, value: target.value });

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const user = await login(signInFields);
      dispatch(loginAction(user));
      history.push('/dashboard');
    } catch (error) {
      console.log('not authorized')
    }
  };

  const handleEmailForm = () => setIsSignInAsEmail(true);

  const renderLoginForm = () => (
    <>
      <Row className="sign-in-page__logo justify-content-center">
        <Col xs="4">
          <p>Log In</p>
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
              <Form.Control
                type="email"
                name="email"
                placeholder={formatMessage(messages.email)}
                onChange={handleInputChange}
              />
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
              <Form.Control
                type="password"
                name="password"
                placeholder={formatMessage(messages.password)}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="justify-content-center">
          <Col xs="2">
            <Button
              text={formatMessage(messages.submitButton)}
              classNames="sign-in-page__button"
              onClickHandler={handleSignIn}
              type="submit"
            />
          </Col>
        </Form.Group>
      </Form>
    </>
  );

  const renderWelcomePage = () => (
    <div>
      <Row className="justify-content-center welcome-page__title">
        <Col xs="5">
          Please, choose Sign In Options:
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="2">
          <Button text="Username" onClickHandler={handleEmailForm} />
        </Col>
        <Col xs="2">
          <a className="btn btn-success" href={bankIdUrl}>bankID</a>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="sign-in-page">
      {isSignInAsEmail ? renderLoginForm() : renderWelcomePage()}
    </div>
  );
};

export default SignInPage;