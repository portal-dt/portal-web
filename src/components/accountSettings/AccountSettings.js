import React from 'react';

import { useIntl } from 'react-intl';
import { messages } from './messages';

const AccountSettings = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="page-content__title">{formatMessage(messages.accountSettings)}</div>
    </>
  );
};

export default AccountSettings;
