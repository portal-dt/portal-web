import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/Button';

import './Button.css';

const Button = ({ text = '', backgroundColor = '', classNames, type, onClickHandler }) => {
  return (
    <BootstrapButton
    variant="success"
    type={type}
    style={{ backgroundColor: backgroundColor, borderColor: backgroundColor }}
    className={classNames}
    onClick={onClickHandler}
    >
      {text}
    </BootstrapButton>
  );
};


Button.defaultProps = {
  type: 'button',
  classNames: '',
  text: ''
};

Button.propTypes = {
  classNames: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClickHandler: PropTypes.func
};

export default Button;