import React, {useState, useContext, useEffect} from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { userSelector} from '../../selectors';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Button from '../button/Button';


import { messages } from './messages';
import { CurrentUserContext } from '../../contexts/currentUser';
import './SettingsForm.less';


const initialState = {
  email: '',
  password: '',
  language: '',
  format: '',
  mobile: ''
};

const SettingsForm = ({onSubmit, errors, initialValues}) => {
  const { formatMessage } = useIntl();
  const [currentUserState] = useContext(CurrentUserContext);

  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const [mobile, setMobile] = useState('');
  const [language, setLanguage] = useState('');
  const [format, setFormat] = useState(new Date());
 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    onSubmit({
      // ...currentUserState.currentUser,
      email,
      password,
      mobile,
      language,
      // format
    });
  }

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }

    setEmail(currentUserState.currentUser.email);
    setMobile(currentUserState.currentUser.mobile);
    setLanguage(currentUserState.currentUser.locale);
    setFormat(currentUserState.currentUser.format || '');
  }, [currentUserState.currentUser]);

  return (
    <>
      <Alert variant="danger">
        This is a error alert—check it out!
      </Alert>
      <Alert variant="success">
        This is a success alert—check it out!
      </Alert>

      <Form onSubmit={handleSubmit} autoComplete="off" className="settings-form">
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoComplete="new-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPasword(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="validationCustomUsername">
            <Form.Label>Mobile</Form.Label>
            <InputGroup>
              {/* <InputGroup.Prepend>
                <ReactFlagsSelect
                  // countries={["GB", "SE", "NO"]}
                  defaultCountry="GB"
                  // customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
                  // showSelectedLabel={false}
                  // showOptionLabel={false}
                />
              </InputGroup.Prepend> */}
              <Form.Control
                autoComplete="off"
                type="text"
                placeholder={initialValues.mobile}
                aria-describedby="inputGroupPrepend"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="validationCustomUsername1">
            <Form.Label>Language</Form.Label>
            <InputGroup>
              <Form.Control
                as="select"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                required
              >
                <option value="en">English</option>
                <option value="no">Norvegian</option>
                <option value="sv">Swedish</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs="6" controlId="validationCustomUsername2">
            <Form.Label>Format</Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                placeholder="Format"
                aria-describedby="inputGroupPrepend2"
                value={format}
                onChange={e => setFormat(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Button text="Update" type="submit" />
      </Form>
    </>
  );
};

export default SettingsForm;
