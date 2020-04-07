import React from "react";
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';

import SignInPage from '../signInPage/SignInPage';
import AdminDashboard from '../adminDashboard/AdminDashboard';
import CustomerDocuments from '../customerDocuments/CustomerDocuments';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import NewPartnerDetails from '../newPartnerDetails/NewPartnerDetails';

import './App.less';
import Header from "../header/Header";
import Footer from '../footer/Footer';
import { IntlProvider } from 'react-intl';
import { messages } from '../../translations';


// const language = navigator.language.split(/[-_]/)[0];  // language without region code

const App = (props) => (  
  <>
    <IntlProvider locale={props.language} messages={messages[props.language]} defaultLocale="en-gb">
      <Switch>
        <Route exact path="/login">
          <SignInPage />
        </Route>
        <Route path="/">
          <Header />
            <Container className="page-content">
              <Route path="/documents">
                <CustomerDocuments />
              </Route>
              <Route path="/dashboard">
                <CustomerDashboard />
              </Route>
              <Route path="/new-partner">
                <NewPartnerDetails />
              </Route>
            </Container>
          <Footer />
        </Route>
      </Switch>
    </IntlProvider>
  </>
);

function mapStateToProps(state) {
  return {
    language: state.configs.language
  }
}

export default connect(mapStateToProps)(App);