import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { userSelector} from '../../selectors';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Button from '../button/Button';

import { messages } from './messages';

import 'react-flags-select/css/react-flags-select.css';

const AccountSettings = () => {
  const { formatMessage } = useIntl();
  const user = useSelector(userSelector);

  return (
    <>
      <div className="page-content__title">{formatMessage(messages.accountSettings)}</div>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="validationCustomUsername">
            <Form.Label>Mobile</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <ReactFlagsSelect
                  countries={["GB", "SE", "NO"]}
                  defaultCountry="GB"
                  // customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
                  showSelectedLabel={false}
                  showOptionLabel={false}
                />
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder={user.mobile}
                aria-describedby="inputGroupPrepend"
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="validationCustomUsername1">
            <Form.Label>Language</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend1">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Language"
                aria-describedby="inputGroupPrepend1"
                required
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs="6" controlId="validationCustomUsername2">
            <Form.Label>Format</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend2">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Format"
                aria-describedby="inputGroupPrepend2"
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

export default AccountSettings;
