import React from 'react';
import { useIntl } from 'react-intl';

import { messages } from './messages';

import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

import './CustomerTableHeader.less';

const getSortArrow = isAsc => isAsc ? <ArrowUp/> : <ArrowDown/>;

const CustomerTableHeader = ({ onInputChange, sort, sortState, isAdmin }) => {
  const { formatMessage } = useIntl();
  return (
    <thead className="table-header">
    <tr>
      <th id="documentNumber" onClick={sort}>
        {formatMessage(messages.columnDocumentNumber)} {getSortArrow(sortState['documentNumber'].isAsc)}
      </th>
      {
        isAdmin && (
          <th id="customerName" onClick={sort}>
            Customer Name {getSortArrow(sortState['customerName'].isAsc)}
          </th>
        )
      }
      {
        isAdmin && (
          <th id="email" onClick={sort}>
            Email {getSortArrow(sortState['email'].isAsc)}
          </th>
        )
      }
      <th id="documentType" onClick={sort}>
        {formatMessage(messages.columnDocumentType)} {getSortArrow(sortState['documentType'].isAsc)}
      </th>
      <th id="creationDate" onClick={sort}>
        {formatMessage(messages.columnCreationDate)} {getSortArrow(sortState['creationDate'].isAsc)}
      </th>
      <th id="openedAt" onClick={sort}>
        {formatMessage(messages.columnLastOpened)} {getSortArrow(sortState['openedAt'].isAsc)}
      </th>
      <th>
        <input
          type="text"
          placeholder={formatMessage(messages.filterLastRead)}
          onChange={onInputChange}
        />
      </th>
    </tr>
    </thead>
  );
};

export default CustomerTableHeader;
