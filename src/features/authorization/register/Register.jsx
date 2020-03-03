import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userRegister } from '../actions';
import { Routes } from '../../../constants';
import { AuthorizationMessages } from '../constants';

import styles from './Register.module.scss';

class RegisterRoot extends Component {
  state = {
    warningMessage: '',
  };

  isUserExist = (users, currentUser) => {
    if (users.findIndex((user) => user.login === currentUser) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  submitRegister = (event) => {
    event.preventDefault();

    const { onRegister } = this.props;
    const { userName, password } = event.target;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userData = {
      login: userName.value,
      password: password.value,
    };

    if (this.isUserExist(users, userName.value)) {
      this.setState({
        warningMessage: AuthorizationMessages.BUSYLOGIN
      });
    } else {
      users.push(userData);
      localStorage.setItem('users', JSON.stringify(users));

      onRegister();

      this.props.history.push(Routes.HOMEPAGE);
    }
  };

  render() {
    const { warningMessage } = this.state;

    return (
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Movies</h1>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>Please register</h2>
          <form
            className={styles.signIn}
            onSubmit={this.submitRegister}>
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
            <button className={styles.submit}>Register</button>
            <span>
              {'Already have an account? '}
              <Link to="/login">Go to Login page</Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onRegister: userRegister,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export const Register = withConnect(RegisterRoot);
