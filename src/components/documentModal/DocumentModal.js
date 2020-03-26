import React from 'react';
import PropTypes from 'prop-types';

import './DocumentModal.css';

const DocumentModal = ({ isActive, children, onClose }) => (
  isActive &&
  <div className="asdasdas">
    <button onClick={onClose}>Close Document</button>
    {children}
  </div>
);

DocumentModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default DocumentModal;