import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from '../../../hocs/withTranslation';
import { userLogin, verifyUser, userStatusReset, } from '../actions';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { LanguagesList } from '../../../components/LanguagesList';

import styles from './Login.module.scss';

const words = [
  'app-title',
  'app-login-title',
  'app-login-form-login-placeholder',
  'app-login-form-password-placeholder',
  'app-login-form-button-submit',
  'app-login-dont-have-account',
  'app-login-link-to-register',
  'app-login-message-wrong-user',
];

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
    const { translatedWords, wrongUserData } = this.props;

    return (
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{translatedWords['app-title']}</h1>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>{translatedWords['app-login-title']}</h2>
          <form
            className={styles.signIn}
            onSubmit={this.submitLogin}>
            <input
              className={styles.inputField}
              name="userName"
              type="text"
              placeholder={translatedWords['app-login-form-login-placeholder']}
              required />
            <input
              className={styles.inputField}
              name="password"
              type="password"
              placeholder={translatedWords['app-login-form-password-placeholder']}
              required />
            {wrongUserData ?
              <p className={styles.warning}>{translatedWords['app-login-message-wrong-user']}</p> :
              null
            }
            <button className={styles.submit}>{translatedWords['app-login-form-button-submit']}</button>
            <span>
              {translatedWords['app-login-dont-have-account']}
              <Link to={Routes.REGISTER}>
                {translatedWords['app-login-link-to-register']}
              </Link>
            </span>
          </form>
          <LanguagesList />
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

export const Login = withTranslation(words)(withConnect(LoginRoot));
