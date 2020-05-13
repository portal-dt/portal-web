import React, { useReducer, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { messages } from './messages';
import { login, getEligibility } from '../../utils/auth';
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
  password: '',
  otp: ''
};

const handleInputChangesReducer = (state, { field, value }) => ({
  ...state,
  [field]: value
});

const SignInPage = ({ isAuthenticated }) => {
  const { formatMessage } = useIntl();
  const [signInFields, changeField] = useReducer(handleInputChangesReducer, initialState);
  const [isSignInAsEmail, setIsSignInAsEmail] = useState(false);
  const [isOtpForm, setIsOtpForm] = useState(false);
  const [eligibilityData, setEligibilityData] = useState({});
  const [bankIdUrl, setBankIdUrl] = useState('');
  const [signInErrorStatus, setSignInErrorStatus] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const isAdmin = searchParams.get('adminAccess') === 'true';

  useEffect(() => {
    !isAdmin && getBankIdUrlFromScrive();
    isAuthenticated && history.push('/dashboard');
  }, []);

  const getBankIdUrlFromScrive = async () => {
    const bankId = await getBankIdUrl();
    setBankIdUrl(bankId);
  };

  const handleInputChange = ({ target }) => changeField({ field: target.name, value: target.value });

  const handleOtp = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        email: signInFields.email,
        otp: signInFields.otp.trim()
      };
      const user = await login(userData);
      dispatch(loginAction(user));
      setSignInErrorStatus(null);
      history.push('/dashboard');
    } catch (error) {
      setSignInErrorStatus(formatMessage(messages.invalidPassword));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        email: signInFields.email,
        password: signInFields.password
      };
      setSignInErrorStatus(null);
      setEligibilityData(await getEligibility(userData));
      setIsOtpForm(true);
    } catch (e) {
      setSignInErrorStatus(formatMessage(messages.permissionsDenied));
    }
  };

  const handleEmailForm = () => isAdmin ? setIsSignInAsEmail(true) : window.location.replace(bankIdUrl);

  const renderLoginForm = () => (
    <>
      <Row className="sign-in-page__logo justify-content-center">
        <Col xs="4">
          <h3>{formatMessage(messages.submitButton)}</h3>
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
              onClickHandler={handleLogin}
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
          {formatMessage(messages[isAdmin ? 'welcomeToPortal' : 'welcomeToDocuments'])}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="6">
          <Button
            text={
              <>
                <img src="../../../assets/images/kraft-bank-logo-small.png" alt=""/>
                <span>{formatMessage(messages.continueToLogin)}</span>
              </>
            }
            classNames="welcome-page__button"
            onClickHandler={handleEmailForm}
          />
        </Col>
      </Row>
    </div>
  );

  const renderOTPForm = () => {
    return (
      <>
        <h2>{formatMessage(messages.welcomeToLogin)}</h2>
        {eligibilityData && eligibilityData.qrCode && <img alt="QR Code" src={eligibilityData.qrCode} />}
        <p>{formatMessage(messages.otp)}</p>
        <Form>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm="2">
              {formatMessage(messages.yourEmail)}
            </Form.Label>
            <Col sm="3">
              <Form.Control plaintext readOnly defaultValue={signInFields.email} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="otp">
            <Form.Label column sm="2">
              {formatMessage(messages.authCode)}
            </Form.Label>
            <Col sm="3">
              <Form.Control type="text" name="otp" onChange={handleInputChange}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col xs="2">
              <Button
                text={formatMessage(messages.submitButton)}
                classNames="sign-in-page__button"
                onClickHandler={handleOtp}
                type="submit"
              />
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  };

  return (
    <div className="sign-in-page">
      {
        isSignInAsEmail
        ? ( isOtpForm
            ? renderOTPForm()
            : renderLoginForm()
          )
        : renderWelcomePage()
      }
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
    </div>
  );
};

export default SignInPage;