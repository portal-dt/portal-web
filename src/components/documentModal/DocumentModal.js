import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Modal from 'react-bootstrap/Modal';

import './DocumentModal.less';

const DocumentModal = ({ isActive, onClose, document, onRender }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setPageNumber(numPages);

  return (
    <Modal show={isActive} onHide={onClose}>
      <Document file={document} onLoadSuccess={onDocumentLoadSuccess} onRenderSuccess={onRender}>
        <Page className="pdf-page" pageNumber={pageNumber} onRenderSuccess={onRender}/>
      </Document>
    </Modal>
  );
};

DocumentModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default DocumentModal;
