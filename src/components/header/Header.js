import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { messages } from './messages';

import { logout } from '../../utils/auth';
import { logoutAction } from '../../actions/actions';
import { userNameSelector } from '../../selectors';

import { BoxArrowRight } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './Header.less';

const companyUrl = '../../../assets/images/company-logo.png'; // todo: move to props

const Header = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const userName = useSelector(userNameSelector);

  const handleLogOut = () => {
    logout();
    logoutAction();
    history.push('/login');
  };

  return (
    <header className="header">
      <Container>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand className="header__logo">
            <NavLink to="/dashboard">
              <img 
                  src={companyUrl}
                  alt="company logo"
                  height="25"
                  className="d-inline-block align-top"
              />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/documents" className="nav-link header__link">{formatMessage(messages.documentsLink)}</NavLink>
              <NavLink to="/account-settings" className="nav-link header__link">{formatMessage(messages.accountSettings)}</NavLink>
            </Nav>
            <span>Hi, {userName}</span>
            <Button variant="link" className="header__link" onClick={handleLogOut}>
              <BoxArrowRight size={45}/>{formatMessage(messages.logOut)}
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </Container>  
    </header>
  );
};

export default Header;