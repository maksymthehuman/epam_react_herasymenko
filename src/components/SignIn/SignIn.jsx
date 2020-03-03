import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './SignIn.module.scss';

const componentDescription = {
  login: {
    title: 'Please login',
    submitName: 'Login',
    linkText: 'Go to Register page',
    linkURL: '/register',
  },
  register: {
    title: 'Please register',
    submitName: 'Register',
    linkText: 'Go to Login page',
    linkURL: '/login',
  },
};

const isUserExist = (users, currentUser) => {
  if (users.findIndex((user) => user.login === currentUser) > 0) {
    return true;
  } else {
    return false;
  }
}

const login = (event) => {
  event.preventDefault();

  const { userName, password } = event.target;
  const users = JSON.parse(localStorage.getItem('users'));

  const userData = users.find((user) => user.login === userName.value);

  if (userData) {

  }

}

const register = (event) => {
  event.preventDefault();

  const { userName, password } = event.target;

  let users = JSON.parse(localStorage.getItem('users'));
  console.log(users);

  if (users) {

    if (isUserExist(users, userName.value)) {

      console.log('user already exist');

    } else {
      users.push({
        login: userName.value,
        password: password.value,
      });

      localStorage.setItem('users', JSON.stringify(users));
    }

  } else {

    users = [{
      login: userName.value,
      password: password.value,
    }];

    localStorage.setItem('users', JSON.stringify(users));
  }
}

const SignIn = () => {
  const { type } = this.props;
  const {
    title,
    submitName,
    linkText,
    linkURL,
  } = componentDescription[type];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <form
        className={styles.signIn}
        onSubmit={type === 'register' ? register : login}>
        <input
          className={styles.inputField}
          name="userName"
          type="text"
          placeholder="Enter your name" />
        <input
          className={styles.inputField}
          name="password"
          type="password"
          placeholder="Enter your password" />
        <button
          className={styles.submit}>
          {submitName}
        </button>
        <span>
          {'Don\'t have an account? '}
          <Link to={linkURL}>
            {linkText}
          </Link>
        </span>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

const mapDispatchToProps = {

};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withConnect(SignIn);
