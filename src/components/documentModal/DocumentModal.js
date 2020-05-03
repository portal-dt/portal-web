import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './DocumentModal.less';
import {messages} from "../customerTableRow/messages";

const DocumentModal = ({ isActive, onClose, document, onRender, documentName }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => setPageNumber(numPages);

  return (
    <Modal show={isActive} onHide={onClose} className="document-modal">
      <Document file={document} onLoadSuccess={onDocumentLoadSuccess} onRenderSuccess={onRender}>
        <Page className="pdf-page" pageNumber={pageNumber} onRenderSuccess={onRender}/>
      </Document>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary">
          <a href={document} download={documentName} className="save-pfd-btn">Save</a>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DocumentModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default DocumentModal;
