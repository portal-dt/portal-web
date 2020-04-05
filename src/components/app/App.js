import React from "react";
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import SignInPage from '../signInPage/SignInPage';
import AdminDashboard from '../adminDashboard/AdminDashboard';
import CustomerDocuments from '../customerDocuments/CustomerDocuments';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import NewPartnerDetails from '../newPartnerDetails/NewPartnerDetails';

import './App.less';
import Header from "../header/Header";
import Footer from '../footer/Footer';

const App = () => (
  <>
    <Header />
      <Container className="page-content" >
        <Switch>
          <Route path="/documents">
            <CustomerDocuments />
          </Route>
          <Route path="/dashboard">
            <CustomerDashboard />
          </Route>
          <Route path="/new-partner">
            <NewPartnerDetails />
          </Route>
          <Route exact path="/">
            <SignInPage />
          </Route>
        </Switch>
      </Container>
    <Footer />
  </>
);

export default App;