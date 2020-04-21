import React, { useReducer, useContext } from 'react';
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

import './SignInPage.css';
import { CurrentUserContext } from '../../contexts/currentUser';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

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
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
  const history = useHistory();
  const dispatch = useDispatch();

  console.log('current user', currentUserState);
  

  const handleInputChange = ({ target }) => changeField({ field: target.name, value: target.value });

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const user = await login(signInFields);
      dispatch(loginAction(user));
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: user.user
      }));
      history.push('/dashboard');
    } catch (error) {
      console.log('not authorized')
    }
  };

  return (
    <div className="sign-in-page">
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
    </div>
  );
};

export default SignInPage;