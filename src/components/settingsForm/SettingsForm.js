import React, {useState} from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useIntl } from 'react-intl';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Button from '../button/Button';


import { messages } from './messages';
import './SettingsForm.less';


const SettingsForm = ({onSubmit, errors, initialValues}) => {
  const { formatMessage } = useIntl();  

  const [email, setEmail] = useState(initialValues.email || '');
  const [password, setPasword] = useState(undefined);
  const [mobile, setMobile] = useState(initialValues.mobile || '');
  const [language, setLanguage] = useState(initialValues.language || '');
  const [format, setFormat] = useState(initialValues.format || '');
 
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      email,
      password,
      mobile,
      language,
      format
    });
  }

  return (
    <>
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
              {/* TODO: Add flags */}
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
                as="select"
                value={format}
                onChange={e => setFormat(e.target.value)}
                required
              >
                <option value="en-GB">English</option>
                <option value="sv-SE">Swedish</option>
              </Form.Control>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Button text="Update" type="submit" />
      </Form>
    </>
  );
};

export default SettingsForm;
