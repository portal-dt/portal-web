import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf/dist/entry.webpack';

import Button from '../button/Button';
import DocumentModal from '../documentModal/DocumentModal';

import { formatDateToLocalString } from '../../utils';


const CustomerTableRow = ({ documentNumber, documentType, creationDate, openedAt, document }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);

  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);
  const onDocumentLoadSuccess = ({ numPages }) => setPageNumber(numPages);

  return (
    <tr>
      <td>{documentNumber}</td>
      <td>{documentType}</td>
      <td>{formatDateToLocalString(creationDate)}</td>
      <td>{openedAt ? formatDateToLocalString(openedAt) : 'Unread'}</td>
      <td>
        <Button classNames="theme-btn" text={'View'} onClickHandler={viewDocument} />
      </td>
      {
        isDocumentOpened &&
        <DocumentModal isActive={isDocumentOpened} onClose={closeDocument}>
          <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </DocumentModal>
      }
    </tr>
  );
};

CustomerTableRow.propTypes = {
  documentNumber: PropTypes.number,
  documentId: PropTypes.string,
  creationDate: PropTypes.string
};

export default CustomerTableRow;