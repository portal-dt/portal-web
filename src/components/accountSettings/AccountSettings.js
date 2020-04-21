import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { userSelector} from '../../selectors';
import { updateUser } from '../../utils/api';

import { messages } from './messages';

import 'react-flags-select/css/react-flags-select.css';
import SettingsForm from '../settingsForm/SettingsForm';

const AccountSettings = () => {
  const { formatMessage } = useIntl();
  const user = useSelector(userSelector);
  const apiUrl = `users/${user.id}`;

  const errors = {};
  const initialValues = {...user};
  const handleSubmit = async (data) => {
    await updateUser(user.id, data);
    console.log('Submit', data);
  };
  
  return (
    <>
      <div className="page-content__title">{formatMessage(messages.accountSettings)}</div>
      <SettingsForm 
        errors={errors}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AccountSettings;
