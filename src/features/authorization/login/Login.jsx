import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WORDS } from './Login.constants';
import { withTranslation } from '../../../hocs/withTranslation';
import { userLogin, verifyUser, userStatusReset } from '../actions';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { LanguagesList } from '../../../components/LanguagesList';
import { translatedWordsProp } from '../../../propTypes';

import styles from './Login.module.scss';

const wordsToTranslate = Object.values(WORDS);

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
        <h1 className={styles.title}>{translatedWords[WORDS.APP_TITLE]}</h1>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>{translatedWords[WORDS.TITLE]}</h2>
          <form
            className={styles.signIn}
            onSubmit={this.submitLogin}>
            <input
              className={styles.inputField}
              name="userName"
              type="text"
              placeholder={translatedWords[WORDS.PLACEHOLDER_LOGIN]}
              required />
            <input
              className={styles.inputField}
              name="password"
              type="password"
              placeholder={translatedWords[WORDS.PLACEHOLDER_PASSWORD]}
              required />
            {wrongUserData ?
              <p className={styles.warning}>{translatedWords[WORDS.TEXT_WRONG_USER]}</p> :
              null
            }
            <button className={styles.submit}>{translatedWords[WORDS.BUTTON_SUBMIT]}</button>
            <span>
              {translatedWords[WORDS.TEXT_NO_ACCOUNT]}
              <Link to={Routes.REGISTER}>
                {translatedWords[WORDS.TEXT_REGISTER_LINK]}
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

export const Login = withTranslation(wordsToTranslate)(withConnect(LoginRoot));

LoginRoot.propTypes = {
  onLogin: PropTypes.func.isRequired,
  verifyUser: PropTypes.func.isRequired,
  userStatusReset: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  wrongUserData: PropTypes.bool.isRequired,
  translatedWords: translatedWordsProp,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
