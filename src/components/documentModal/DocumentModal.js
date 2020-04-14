import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Modal from 'react-bootstrap/Modal';

import './DocumentModal.less';

const DocumentModal = ({ isActive, onClose, document }) => {
  const [pageNumber, setPageNumber] = useState(1);
  // const [pagessNumber, setPagesssNumber] = useState('');
  //
  const onDocumentLoadSuccess = ({ numPages }) => setPageNumber(numPages);
  //
  // const onRender = (data) => {
  //   const a = window.document.querySelector('.react-pdf__Page canvas');
  //   const b = a.toDataURL();
  //   setPagesssNumber(b);
  //   console.log(b)
  // };

  return (
    <Modal show={isActive} onHide={onClose}>
      <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </Modal>
  );
};

DocumentModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default DocumentModal;
