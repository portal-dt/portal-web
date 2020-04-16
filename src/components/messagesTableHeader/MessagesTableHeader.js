import React from 'react';
import { useIntl } from 'react-intl';

import { messages } from './messages';

import './MessagesTableHeader.less';


const MessagesTableHeader = () => {
  const { formatMessage } = useIntl();

  return (
    <thead className="table-header">
      <tr>
        <th>Subject</th>
        <th>Name</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
  );
};

export default MessagesTableHeader;
