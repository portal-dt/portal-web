import React from "react";
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import SignInPage from '../signInPage/SignInPage';
import AdminDashboard from '../adminDashboard/AdminDashboard';
import CustomerDocuments from '../customerDocuments/CustomerDocuments';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import NewPartnerDetails from '../newPartnerDetails/NewPartnerDetails';

import './App.css';

const App = () => (
  <Switch>
    <Route path="/admins">
      {/*<AdminDashboard/>*/}
      <CustomerDocuments />
      {/*<NewPartnerDetails />*/}
    </Route>
    <Route path="/customers">
      <CustomerDocuments />
    </Route>
    <Route path="/new-partner">
      <NewPartnerDetails />
    </Route>
    <Route exact path="/">
      {/*<SignInPage />*/}
      <CustomerDashboard />
    </Route>
  </Switch>
);

export default App;