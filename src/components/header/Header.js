import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { messages } from './messages';

import { logout } from '../../utils/auth';
import { logoutAction } from '../../actions/actions';
import { userNameSelector } from '../../selectors';

import { BoxArrowRight, GearFill } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './Header.less';

const companyUrl = '../../../assets/images/kraft-logo.jpeg'; // todo: move to props

const Header = ({ isAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const userName = useSelector(userNameSelector);

  const handleLogOut = () => {
    logout();
    dispatch(logoutAction());
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
                  height="38"
                  className="d-inline-block align-top"
              />
            </NavLink>
          </Navbar.Brand>
          {isAuthenticated && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
          {
            isAuthenticated && (
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavLink to="/dashboard" className="nav-link header__link">Home</NavLink>
                  <NavLink to="/documents" className="nav-link header__link">{formatMessage(messages.documentsLink)}</NavLink>
                  <NavLink to="/customers" className="nav-link header__link">Customers</NavLink>

                </Nav>
                <Nav>
                  <div className="header__user-settings">
                    <span>Hi, {userName}</span>
                  </div>
                  <Button variant="link" className="header__link" onClick={handleLogOut}>
                    <BoxArrowRight size={45}/>{formatMessage(messages.logOut)}
                  </Button>
                </Nav>
              </Navbar.Collapse>
            )
          }
        </Navbar>
      </Container>  
    </header>
  );
};

export default Header;