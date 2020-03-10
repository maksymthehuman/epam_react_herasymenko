import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from '../../../hocs/withTranslation';
import { fetchUsers, registerUser } from '../actions';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { LanguagesList } from '../../../components/LanguagesList';

import styles from './Register.module.scss';


const words = [
  'app-title',
  'app-register-title',
  'app-register-form-login-placeholder',
  'app-register-form-password-placeholder',
  'app-register-form-button-submit',
  'app-register-have-account',
  'app-register-link-to-login',
  'app-register-message-busy-login',
];

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
        warningMessage: translatedWords['app-register-message-busy-login'],
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
        <h1 className={styles.title}>{translatedWords['app-title']}</h1>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>{translatedWords['app-register-title']}</h2>
          <form
            className={styles.signIn}
            onSubmit={this.submitRegister}>
            <input
              className={styles.inputField}
              name="userName"
              type="text"
              placeholder={translatedWords['app-register-form-login-placeholder']}
              required />
            <input
              className={styles.inputField}
              name="password"
              type="password"
              placeholder={translatedWords['app-register-form-password-placeholder']}
              required />
            {warningMessage ?
              <p className={styles.warning}>{warningMessage}</p> :
              null
            }
            <button className={styles.submit}>
              {translatedWords['app-register-form-button-submit']}
            </button>
            <span>
              {translatedWords['app-register-have-account']}
              <Link to={Routes.LOGIN}>
                {translatedWords['app-register-link-to-login']}
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

export const Register = withTranslation(words)(withConnect(RegisterRoot));
