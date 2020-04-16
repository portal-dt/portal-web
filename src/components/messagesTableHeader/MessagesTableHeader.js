import React from 'react';
import { useIntl } from 'react-intl';

import { messages } from './messages';

import './MessagesTableHeader.less';


const MessagesTableHeader = () => {
  const { formatMessage } = useIntl();

  return (
    <thead className="table-header">
      <tr>
        <th>{formatMessage(messages.subject)}</th>
        <th>{formatMessage(messages.sender)}</th>
        <th>{formatMessage(messages.date)}</th>
        <th>{formatMessage(messages.status)}</th>
      </tr>
    </thead>
  );
};

export default MessagesTableHeader;
