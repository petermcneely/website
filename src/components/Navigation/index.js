import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
    <div className="navbar-header">
        <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        </div>
      <div className="navbar-collapse collapse">
        <AuthUserContext.Consumer>
          {authUser => 
            authUser ? <NavigationAuth /> : <NavigationUnAuth />
          }
        </AuthUserContext.Consumer>
      </div>
    </div>
  </nav>
);

const NavigationAuth = () => (
  <div className="navbar-collapse collapse">
    <ul className="nav navbar-nav">
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.COVID_19}>COVID-19</Link>
      </li>
      <li>
        <Link to={ROUTES.ABOUT}>About</Link>
      </li>
      <li>
        <Link to={ROUTES.RESUME}>Resume</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationUnAuth = () => (
  <div className="navbar-collapse collapse">
    <ul className="nav navbar-nav">
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.COVID_19}>COVID-19</Link>
      </li>
      <li>
        <Link to={ROUTES.ABOUT}>About</Link>
      </li>
      <li>
        <Link to={ROUTES.RESUME}>Resume</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;