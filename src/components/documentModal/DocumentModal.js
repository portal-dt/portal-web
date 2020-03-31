import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';

import './DocumentModal.less';

const DocumentModal = ({ isActive, children, onClose }) => (
  <Modal show={isActive} onHide={onClose}>
    {children}
  </Modal>
);

DocumentModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default DocumentModal;
