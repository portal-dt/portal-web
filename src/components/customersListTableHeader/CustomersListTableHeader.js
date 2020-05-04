import React from 'react';
import { useIntl } from 'react-intl';
import { messages } from './messages';

import './CustomersListTableHeader.less';


const CustomersListTableHeader = () => {
  const { formatMessage } = useIntl();
  
  return (
    <thead className="table-header">
      <tr>
        <th>{formatMessage(messages.customerName)}</th>
        <th>{formatMessage(messages.email)}</th>
        <th>{formatMessage(messages.accountNumbers)}</th>
        <th>{formatMessage(messages.lastLogin)}</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

export default CustomersListTableHeader;
