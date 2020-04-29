import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import Button from '../button/Button';
import DocumentModal from '../documentModal/DocumentModal';

import { formatDateToLocalString } from '../../utils';
import { updateViewedDocument } from '../../utils/api';
import { messages } from './messages';
import { NavLink } from 'react-router-dom';

import './CustomerTableRow.less';


const CustomerTableRow = ({ documentId, documentNumber, documentType, creationDate, openedAt: documentOpenedAt, document, customerName, email }) => {
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);
  const [openedAt, setOpenedAt] = useState(documentOpenedAt);
  const { formatMessage } = useIntl();

  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);
  const onViewClickHandler = async () => {
    if (!customerName && !email) {
      const { openedAt } = await updateViewedDocument(documentId);
      setOpenedAt(openedAt);
    }
    viewDocument();
  };

  const openedAtClassName = classNames(`table-row__column--${openedAt ? 'green' : 'red'}`);

  const getPdfName = () => `${documentType} ${new Date(creationDate).toLocaleString('default', { month: 'long' })} ${new Date(creationDate).getUTCFullYear()}`;
  const lastOpenedAtText = openedAt ? formatDateToLocalString(openedAt) : formatMessage(messages.unread);

  return (
    <tr>
      <td>{documentNumber}</td>
      {customerName && <td>{customerName}</td>}
      {email && <td>{email}</td>}
      <td>{documentType}</td>
      <td>{formatDateToLocalString(creationDate)}</td>
      <td className={openedAtClassName}>{lastOpenedAtText}</td>
      <td>
        <Button
          classNames="theme-btn"
          text={formatMessage(messages.view)}
          onClickHandler={onViewClickHandler}
        />
        <a href={document} className="primary-btn btn" download={getPdfName()}>{formatMessage(messages.save)}</a>
      </td>
      <DocumentModal
        isActive={isDocumentOpened}
        onClose={closeDocument}
        document={document}
      />
    </tr>
  );
};

CustomerTableRow.propTypes = {
  documentNumber: PropTypes.number,
  documentId: PropTypes.string,
  creationDate: PropTypes.string
};

export default CustomerTableRow;
