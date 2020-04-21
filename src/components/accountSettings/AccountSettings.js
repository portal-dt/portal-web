import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { userSelector} from '../../selectors';
import { updateUser } from '../../utils/api';
import Alert from 'react-bootstrap/Alert';

import { messages } from './messages';

import 'react-flags-select/css/react-flags-select.css';
import SettingsForm from '../settingsForm/SettingsForm';
import { updateUserAction } from '../../actions/actions';

const AccountSettings = () => {
  const { formatMessage } = useIntl();
  const [displayAlertFlag, setDisplayAlertFlag] = useState(false);
  const [submitAlertStatus, setSubmitAlertStatus] = useState({variant: 'danger', text: 'Failed'});
  const user = useSelector(userSelector);
  const dispatch = useDispatch();


  const errors = {};
  const initialValues = {...user};
  const handleSubmit = async (data) => {      
      const updateResponse = await updateUser(user.id, data);
      
      if (updateResponse.status === 200) {
        setSubmitAlertStatus({variant: 'success', text: updateResponse.data.message})
        dispatch(updateUserAction(data));
      } else {
        setSubmitAlertStatus({variant: 'danger', text: updateResponse.statusText})
      }
      setDisplayAlertFlag(true);
  };

  const SubmitStatusAlert = ({variant, text}) => (
    <Alert variant={variant}>
      {text}
    </Alert>
  )
  
  return (
    <>
      <div className="page-content__title">{formatMessage(messages.accountSettings)}</div>
      { displayAlertFlag ? <SubmitStatusAlert variant={submitAlertStatus.variant} text={submitAlertStatus.text} /> : null }  
      <SettingsForm 
        errors={errors}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AccountSettings;
