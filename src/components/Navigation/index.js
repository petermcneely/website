import React from 'react';
import { Link } from 'react-router-dom';

import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-controls="theNavBar"
          aria-expanded="false"
          aria-label="Toggle navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
      </div>
    </div>
    <div id="theNavBar" className="navbar-collapse collapse">
        <AuthUserContext.Consumer>
          {authUser => 
            authUser ? <NavigationAuth /> : <NavigationUnAuth />
          }
        </AuthUserContext.Consumer>
      </div>
  </nav>
);

const NavigationAuth = () => (
  <ul className="nav navbar-nav">
      <li className="nav-item">
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li className="nav-item">
        <Link to={ROUTES.COVID_19}>COVID-19</Link>
      </li>
      <li className="nav-item">
        <Link to={ROUTES.ABOUT}>About</Link>
      </li>
      <li className="nav-item">
        <Link to={ROUTES.RESUME}>Resume</Link>
      </li>
      <li className="nav-item">
        <Link to={ROUTES.POST_FORM}>Create Post</Link>
      </li>
      <li className="nav-item">
        <SignOut />
      </li>
    </ul>
);

const NavigationUnAuth = () => (
  <ul className="nav navbar-nav">
    <li className="nav-item">
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li className="nav-item">
      <Link to={ROUTES.COVID_19}>COVID-19</Link>
    </li>
    <li className="nav-item">
      <Link to={ROUTES.ABOUT}>About</Link>
    </li>
    <li className="nav-item">
      <Link to={ROUTES.RESUME}>Resume</Link>
    </li>
  </ul>
);

export default Navigation;