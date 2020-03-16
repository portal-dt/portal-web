import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';

const ControlBarAction = ({ actionText, actionIconSrc }) => (
  <Col xs="2">
    {actionIconSrc} {actionText} user
  </Col>
);

ControlBarAction.propTypes = {
  actionText: PropTypes.string.isRequired,
  actionIconSrc: PropTypes.node.isRequired,
};

export default ControlBarAction;