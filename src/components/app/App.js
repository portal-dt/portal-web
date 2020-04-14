import React from "react";
import { IntlProvider } from 'react-intl';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import SignInPage from '../signInPage/SignInPage';
import AdminDashboard from '../adminDashboard/AdminDashboard';
import CustomerDocuments from '../customerDocuments/CustomerDocuments';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import AccountSettings from '../accountSettings/AccountSettings';
import NewPartnerDetails from '../newPartnerDetails/NewPartnerDetails';
import Container from 'react-bootstrap/Container';
import Header from '../header/Header';
import Footer from '../footer/Footer';

import { languageSelector, isAuthenticatedSelector } from '../../selectors';
import { messages } from '../../translations';

import './App.less';


// const language = navigator.language.split(/[-_]/)[0];  // language without region code

const App = () => {
  const language = useSelector(languageSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector) || localStorage.getItem('token');
  const { pathname } = useLocation();

  return (
    <IntlProvider locale={language} messages={messages[language]} defaultLocale="en-gb">
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
            <Header />
            <Container className="page-content">
              <Route path="/documents">
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
            </Container>
            <Footer />
          </> :
          <Redirect from={pathname} to="/login" />
        }
      </Switch>
    </IntlProvider>
  );
};

export default App;