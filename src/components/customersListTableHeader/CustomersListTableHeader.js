import React from 'react';
import { useIntl } from 'react-intl';
import { messages } from './messages';

import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

import './CustomersListTableHeader.less';

const getSortArrow = isAsc => isAsc ? <ArrowUp/> : <ArrowDown/>;

const CustomersListTableHeader = ({ onInputChange, sort, sortState }) => {
  const { formatMessage } = useIntl();
  
  return (
    <thead className="table-header">
      <tr>
        <th id="customerName" onClick={sort}>
          {formatMessage(messages.customerName)} {getSortArrow(sortState['customerName'].isAsc)}
        </th>
        <th id="email" onClick={sort}>
          {formatMessage(messages.email)} {getSortArrow(sortState['email'].isAsc)}
        </th>
        <th>{formatMessage(messages.accountNumbers)}</th>
        <th>{formatMessage(messages.lastLogin)}</th>
        <th>
          <input
            type="text"
            placeholder="Filter"
            onChange={onInputChange}
          />
        </th>
      </tr>
    </thead>
  );
};

export default CustomersListTableHeader;
