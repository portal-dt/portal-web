import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import SignInPage from '../signInPage/SignInPage';
import CustomerDocuments from '../customerDocuments/CustomerDocuments';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import CustomersList from '../customersList/CustomersList';
import AccountSettings from '../accountSettings/AccountSettings';
import NewPartnerDetails from '../newPartnerDetails/NewPartnerDetails';
import CustomerMessages from '../customerMessages/CustomerMessages';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import { setUserAction, setLoadingAction } from '../../actions/actions';
import { authenticateViaBankId, logout } from '../../utils/auth';
import { getUser } from '../../utils/api';
import { messages } from '../../translations';
import {
  languageSelector,
  isAuthenticatedSelector,
  isLoadingSelector
} from '../../selectors';

import './App.less';


const App = () => {
  const dispatch = useDispatch();
  const { pathname, search = '' } = useLocation();
  const language = useSelector(languageSelector);
  const isLoading = useSelector(isLoadingSelector);
  const searchParams = new URLSearchParams(search);
  const transactionId = searchParams.get('transaction_id');
  const isAuthenticatedViaBankId = searchParams.get('success') === 'true';
  const isAuthenticated = useSelector(isAuthenticatedSelector) || localStorage.getItem('userId') || isAuthenticatedViaBankId;


  const setUser = async () => {
    try {
      dispatch(setLoadingAction(true));
      isAuthenticatedViaBankId && await authenticateViaBankId(transactionId);
      const user = await getUser(isAuthenticatedViaBankId);
      dispatch(setUserAction(user));
      dispatch(setLoadingAction(false));
    } catch (e) {
      logout();
    }
  };

  useEffect(() => {
    isAuthenticated && setUser();
    !isAuthenticated && logout();
  }, []);

  const renderRoutes = () => (
    <Switch>
      <Route path="/login">
        <SignInPage isAuthenticated={isAuthenticated} />
      </Route>
      <Route exact path="/">
        {isAuthenticated ? <Redirect to="/dashboard" /> : <SignInPage isAuthenticated={isAuthenticated} />}
      </Route>
      {
        isAuthenticated ?
          <>
            <Route path="/documents">
              <CustomerDocuments />
            </Route>
            <Route exact path="/customers">
              <CustomersList />
            </Route>
            <Route path="/customers/:id">
              <CustomerDocuments />
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
  );

  const renderSpinner = () => (
    <div className="page-content__spinner">
      <Spinner variant="warning" animation="border" />
    </div>
  );

  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="en-gb">
      {
        isLoading ? renderSpinner() :
          <>
            <Header isAuthenticated={isAuthenticated} />
            <Container className="page-content">
              {renderRoutes()}
            </Container>
            <Footer />
          </>
      }
    </IntlProvider>
  );
};

export default App;