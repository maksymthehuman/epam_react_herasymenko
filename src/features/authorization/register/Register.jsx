import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WORDS } from './Register.constants';
import { withTranslation } from '../../../hocs/withTranslation';
import { fetchUsers, registerUser } from '../actions';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { LanguagesList } from '../../../components/LanguagesList';
import { translatedWordsProp } from '../../../propTypes';

import styles from './Register.module.scss';

const wordsToTranslate = Object.values(WORDS);

class RegisterRoot extends Component {
  state = {
    warningMessage: '',
  };

  componentDidMount() {
    const { fetchUsers } = this.props;

    fetchUsers();
  }

  isUserExist = (users, currentUser) => !!users.find((user) => user.name === currentUser);

  submitRegister = (event) => {
    event.preventDefault();

    const { translatedWords, users, registerUser } = this.props;
    const { userName, password } = event.target;

    const userData = {
      name: userName.value,
      password: password.value,
    };

    if (this.isUserExist(users, userName.value)) {
      this.setState({
        warningMessage: translatedWords[WORDS.TEXT_BUSY_LOGIN],
      });
    } else {
      registerUser(userData);

      this.props.history.push(Routes.HOMEPAGE);
    }
  };

  render() {
    const { warningMessage } = this.state;
    const { translatedWords } = this.props;

    return (
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{translatedWords[WORDS.APP_TITLE]}</h1>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>{translatedWords[WORDS.TITLE]}</h2>
          <form
            className={styles.signIn}
            onSubmit={this.submitRegister}>
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
            {warningMessage ?
              <p className={styles.warning}>{warningMessage}</p> :
              null
            }
            <button className={styles.submit}>
              {translatedWords[WORDS.BUTTON_SUBMIT]}
            </button>
            <span>
              {translatedWords[WORDS.TEXT_HAVE_ACCOUNT]}
              <Link to={Routes.LOGIN}>
                {translatedWords[WORDS.TEXT_LOGIN_LINK]}
              </Link>
            </span>
          </form>
          <LanguagesList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer: { users } }) => ({
  users,
});

const mapDispatchToProps = {
  fetchUsers,
  registerUser,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Register = withTranslation(wordsToTranslate)(withConnect(RegisterRoot));

RegisterRoot.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  translatedWords: translatedWordsProp,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
