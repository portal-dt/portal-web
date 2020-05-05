import React, { useReducer, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import { login } from '../../utils/auth';
import { getBankIdUrl } from '../../utils/api';
import { loginAction } from '../../actions/actions';

import Button from '../button/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
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

const SignInPage = ({ isAuthenticated }) => {
  const { formatMessage } = useIntl();
  const [signInFields, changeField] = useReducer(handleInputChangesReducer, initialState);
  const [isSignInAsEmail, setIsSignInAsEmail] = useState(false);
  const [bankIdUrl, setBankIdUrl] = useState('');
  const [signInErrorStatus, setSignInErrorStatus] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const isAdmin = searchParams.get('adminAccess') === 'true';

  useEffect(() => {
    const getBankIdUrlFromScrive = async () => {
      const bankId = await getBankIdUrl();
      setBankIdUrl(bankId);
    };

    getBankIdUrlFromScrive();
    isAuthenticated && history.push('/dashboard');
  }, []);

  const handleInputChange = ({ target }) => changeField({ field: target.name, value: target.value });

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const user = await login(signInFields);
      dispatch(loginAction(user));
      setSignInErrorStatus(null);
      history.push('/dashboard');
    } catch (error) {
      setSignInErrorStatus('Permissions denied!');
    }
  };

  const handleEmailForm = () => isAdmin ? setIsSignInAsEmail(true) : window.location.replace(bankIdUrl);

  const renderLoginForm = () => (
    <>
      <Row className="sign-in-page__logo justify-content-center">
        <Col xs="4">
          <h3>Log In</h3>
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

        {
          signInErrorStatus ? (
            <Row className="justify-content-center">
              <Col xs="4">
                <Alert variant="danger" onClose={() => setSignInErrorStatus(null)} dismissible>
                  {signInErrorStatus}
                </Alert>
              </Col>
            </Row>
          ) : null
        }

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
        <Col xs="6">
          {isAdmin ? 'Welcome to dtPortal' : 'Welcome to your documents'}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="6">
          <Button
            text={
              <>
                <img src="../../../assets/images/kraft-bank-logo-small.png" alt=""/>
                <span>Continue to login</span>
              </>
            }
            classNames="welcome-page__button"
            onClickHandler={handleEmailForm}
          />
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