import React from 'react';
import {Link} from 'react-router-dom';

import { withFirebase } from '../Firebase';

const SignOut = ({ firebase }) => (
  <Link onClick={firebase.doSignOut} to="">Sign Out</Link>
);

export default withFirebase(SignOut);