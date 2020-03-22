import React from "react";
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import SignInPage from '../signInPage';
import AdminDashboard from '../adminDashboard';
import CustomerDashboard from '../customerDashboard';
import NewPartnerDetails from '../newPartnerDetails';

import './index.css';

const App = () => (
    <Switch>
      <Route path="/admins">
        {/*<AdminDashboard/>*/}
        <CustomerDashboard />
        {/*<NewPartnerDetails />*/}
      </Route>
      <Route path="/customers">
        <CustomerDashboard />
      </Route>
      <Route path="/new-partner">
        <NewPartnerDetails />
      </Route>
      <Route exact path="/">
        <SignInPage />
      </Route>
    </Switch>
);

export default App;