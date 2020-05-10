import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await this.props.firebase.doSignInWithEmailAndPassword(email, password);
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    }
    catch (error) {
      this.setState({ error });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <div className="container-fluid">
        <div className="modal-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button disabled={isInvalid} type="submit" className="btn btn-success">
                Sign In
              </button>
            </div>
            
            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;