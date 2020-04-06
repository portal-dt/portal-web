import React from 'react';
import { useIntl } from 'react-intl';

import { messages } from './messages';

import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

import './CustomerTableHeader.less';

const getSortArrow = isAsc => isAsc ? <ArrowUp/> : <ArrowDown/>;

const CustomerTableHeader = ({ onInputChange, sort, sortState }) => {
  const { formatMessage } = useIntl();
  return (
    <thead className="table-header">
    <tr>
      <th id="documentNumber" onClick={sort}>
        {formatMessage(messages.columnDocumentName)} {getSortArrow(sortState['documentNumber'].isAsc)}
      </th>
      <th id="documentType" onClick={sort}>
        {formatMessage(messages.columnDocumentType)} {getSortArrow(sortState['documentType'].isAsc)}
      </th>
      <th id="creationDate" onClick={sort}>
        {formatMessage(messages.columnCreationDate)} {getSortArrow(sortState['creationDate'].isAsc)}
      </th>
      <th id="openedAt">
        {formatMessage(messages.columnLastOpened)}
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
