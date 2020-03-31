import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../button/Button';
import DocumentModal from '../documentModal/DocumentModal';

import { formatDateToLocalString } from '../../utils';
import { updateViewedDocument } from '../../utils/api';

import './CustomerTableRow.less';


const CustomerTableRow = ({ documentNumber, documentType, creationDate, openedAt, document, id }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);

  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);
  const onDocumentLoadSuccess = ({ numPages }) => setPageNumber(numPages);
  const onViewClickHandler = async () => {
   await updateViewedDocument(documentNumber);
   viewDocument();
  };

  const openedAtClassName = classNames(`table-row__column--${openedAt ? 'green' : 'red'}`);

  return (
    <tr>
      <td>{documentNumber}</td>
      <td>{documentType}</td>
      <td>{formatDateToLocalString(creationDate)}</td>
      <td className={openedAtClassName}>{openedAt ? formatDateToLocalString(openedAt) : 'Unread'}</td>
      <td>
        <Button classNames="theme-btn" text="View" onClickHandler={onViewClickHandler} />
      </td>
      <td>
        <Button classNames="theme-btn" text="Save" onClickHandler={onViewClickHandler} />
      </td>
      {
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