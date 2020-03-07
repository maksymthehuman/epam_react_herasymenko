import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin, verifyUser, userStatusReset, } from '../actions';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { AuthorizationMessages } from '../constants';

import styles from './Login.module.scss';

class LoginRoot extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.history.push(Routes.HOMEPAGE);

      return false;
    }

    return true;
  }

  componentWillUnmount() {
    const { userStatusReset } = this.props;

    userStatusReset();
  }

  submitLogin = (event) => {
    event.preventDefault();

    const { verifyUser } = this.props;
    const { userName, password } = event.target;

    verifyUser(userName.value, password.value);
  }

  render() {
    const { wrongUserData } = this.props;

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
            {wrongUserData ?
              <p className={styles.warning}>{AuthorizationMessages.UBSENT_USER}</p> :
              null
            }
            <button className={styles.submit}>Login</button>
            <span>
              Already have an account? <Link to={Routes.REGISTER}>Go to Register page</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer: { isLoggedIn, wrongUserData } }) => ({
  isLoggedIn,
  wrongUserData,
});

const mapDispatchToProps = {
  onLogin: userLogin,
  verifyUser,
  userStatusReset,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Login = withConnect(LoginRoot);
