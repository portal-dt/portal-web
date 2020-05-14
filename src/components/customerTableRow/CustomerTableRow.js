import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import Button from '../button/Button';
import DocumentModal from '../documentModal/DocumentModal';

import { updateViewedDocument } from '../../utils/api';
import { getDocumentName } from '../../utils';
import { userSelector } from '../../selectors';
import { messages } from './messages';

import './CustomerTableRow.less';


const CustomerTableRow = ({ documentId, documentNumber, documentType, creationDate, openedAt, document, customerName, email }) => {
  const { formatMessage, formatDate } = useIntl();
  const [isDocumentOpened, setIsDocumentOpened] = useState(false);
  const { isAdmin } = useSelector(userSelector);
  const { id } = useParams();


  const viewDocument = () => setIsDocumentOpened(true);
  const closeDocument = () => setIsDocumentOpened(false);
  const onViewClickHandler = async () => {
    if (!isAdmin && !id) {
      await updateViewedDocument(documentId);
    }
    viewDocument();
  };

  const openedAtClassName = classNames(`table-row__column--${openedAt ? 'green' : 'red'}`);
  const lastOpenedAtText = openedAt ? formatDate(openedAt) : formatMessage(messages.unread);

  const getPdfName = () => getDocumentName(creationDate, documentType, formatMessage, messages);
  

  return (
    <tr>
      <td>{documentNumber}</td>
      {customerName && !id && <td>{customerName}</td>}
      {email && !id && <td>{email}</td>}
      <td>{formatMessage(messages[documentType ? documentType : 'invoice'])}</td>
      <td>{formatDate(creationDate)}</td>
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
        documentName={getPdfName()}
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
