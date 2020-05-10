import React from "react";
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navigation from '../Navigation';
import HomePage from '../Home';
import SignInPage from '../SignIn';
import AboutPage from '../About';
import COVID19Page from '../COVID19';
import ResumePage from '../Resume';
import { PostDetail } from '../Post';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.ABOUT} component={AboutPage} />
      <Route path={ROUTES.COVID_19} component={COVID19Page} />
      <Route path={ROUTES.RESUME} component={ResumePage} />
      <Route exact path={`${ROUTES.POSTS}/:id`} component={PostDetail} />
    </div>
  </Router>
);

export default withAuthentication(App);