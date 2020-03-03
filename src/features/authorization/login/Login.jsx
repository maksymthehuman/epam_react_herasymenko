import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import { Routes } from '../../../constants';
import { AuthorizationMessages } from '../constants';

import styles from './Login.module.scss';

class LoginRoot extends Component {
  state = {
    warningMessage: '',
  };

  submitLogin = (event) => {
    event.preventDefault();

    const { onLogin } = this.props;
    const { userName, password } = event.target;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userData = users.find((user) => user.login === userName.value);

    if (userData) {
      if (userData.password === password.value) {
        onLogin();
        this.props.history.push(Routes.HOMEPAGE);
      } else {
        this.setState({
          warningMessage: AuthorizationMessages.WRONGPASSWORD
        });
      }
    } else {
      this.setState({
        warningMessage: AuthorizationMessages.NONEXISTENTLOGIN
      });
    }
  }

  render() {
    const { warningMessage } = this.state;

    return (
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Movies</h1>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>Please login</h2>
          <form
            className={styles.signIn}
            onSubmit={this.submitLogin}>
            <input
              className={styles.inputField}
              name="userName"
              type="text"
              placeholder="Enter your name"
              required />
            <input
              className={styles.inputField}
              name="password"
              type="password"
              placeholder="Enter your password"
              required />
            {warningMessage ?
              <p className={styles.warning}>{warningMessage}</p> :
              null
            }
            <button className={styles.submit}>Login</button>
            <span>
              {'Already have an account? '}
              <Link to="/register">Go to Register page</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onLogin: userLogin,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export const Login = withConnect(LoginRoot);
