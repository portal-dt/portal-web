import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import SignInPage from '../signInPage/SignInPage';
import CustomerDocuments from '../customerDocuments/CustomerDocuments';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import CustomersList from '../customersList/CustomersList';
import AccountSettings from '../accountSettings/AccountSettings';
import NewPartnerDetails from '../newPartnerDetails/NewPartnerDetails';
import CustomerMessages from '../customerMessages/CustomerMessages';
import Container from 'react-bootstrap/Container';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import { languageSelector, isAuthenticatedSelector } from '../../selectors';
import { setUserAction } from '../../actions/actions';
import { authenticateViaBankId } from '../../utils/auth';
import { getUser } from '../../utils/api';
import { messages } from '../../translations';

import './App.less';


const App = () => {
  const dispatch = useDispatch();
  const { pathname, search = '' } = useLocation();
  const language = useSelector(languageSelector);
  const searchParams = new URLSearchParams(search);
  const transactionId = searchParams.get('transaction_id');
  const isAuthenticatedViaBankId = searchParams.get('success') === 'true';
  const isAuthenticated = useSelector(isAuthenticatedSelector) || localStorage.getItem('token') || isAuthenticatedViaBankId;


  const setUser = async () => {
    isAuthenticatedViaBankId && await authenticateViaBankId(transactionId);
    const user = await getUser(isAuthenticatedViaBankId);
    dispatch(setUserAction(user));
  };

  useEffect(() => {
    isAuthenticated && setUser();
  });

  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="en-gb">
      <Header isAuthenticated={isAuthenticated} />
      <Container className="page-content">
        <Switch>
          <Route path="/login">
            <SignInPage />
          </Route>
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <SignInPage />}
          </Route>
        {
          isAuthenticated ?
            <>
              <Route path="/documents">
                <CustomerDocuments />
              </Route>
              <Route path="/customers">
                <CustomersList />
              </Route>
              <Route path="/account-settings">
                <AccountSettings />
              </Route>
              <Route path="/dashboard">
                <CustomerDashboard />
              </Route>
              <Route path="/new-partner">
                <NewPartnerDetails />
              </Route>
              <Route path="/messages">
                <CustomerMessages />
              </Route>
            </> : <Redirect from={pathname} to="/login" />
        }
        </Switch>
      </Container>
      <Footer />
    </IntlProvider>
  );
};

export default App;