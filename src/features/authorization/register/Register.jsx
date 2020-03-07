import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers, registerUser } from '../actions';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { AuthorizationMessages } from '../constants';

import styles from './Register.module.scss';

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

    const { users, registerUser } = this.props;
    const { userName, password } = event.target;

    const userData = {
      name: userName.value,
      password: password.value,
    };

    if (this.isUserExist(users, userName.value)) {
      this.setState({
        warningMessage: AuthorizationMessages.BUSY_LOGIN
      });
    } else {
      registerUser(userData);

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
              Already have an account? <Link to={Routes.LOGIN}>Go to Login page</Link>
            </span>
          </form>
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

export const Register = withConnect(RegisterRoot);
