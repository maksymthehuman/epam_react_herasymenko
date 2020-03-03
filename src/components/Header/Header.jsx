import React from 'react';
import { connect } from 'react-redux';

import { userLogout } from '../../features/authorization/actions'

import styles from './Header.module.scss';

const Header = ({ title, onLogout }) => {
  const logout = () => {
    onLogout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <button
          className={styles.logout}
          onClick={logout}>
          Log out
        </button>
      </div>
      <h1 className={styles.title}>
        {title}
      </h1>
    </div>
  );
};

const mapDispatchToProps = {
  onLogout: userLogout,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(Header);
