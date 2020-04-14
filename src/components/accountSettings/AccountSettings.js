import React from 'react';
import { useIntl } from 'react-intl';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import { messages } from './messages';

const AccountSettings = () => {
  const { formatMessage } = useIntl();

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
      </Form>
    </>
  );
};

export default AccountSettings;
