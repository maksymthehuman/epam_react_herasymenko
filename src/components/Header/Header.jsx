import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogout } from '../../features/authorization/actions';
import { Routes } from '../../constants';

import styles from './Header.module.scss';

const HeaderRoot = ({ title, onLogout }) => {
  const logout = () => {
    onLogout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainNavigation}>
        <nav className={styles.navigation}>
          <NavLink
            to={Routes.HOMEPAGE}
            className={styles.navigationItem}
            activeClassName={styles.navigationItemActive}>
            Homepage
          </NavLink>
        </nav>
        <div className={styles.logoutContainer}>
          <button
            className={styles.logout}
            onClick={logout}>
            Log out
        </button>
        </div>
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

export const Header = withConnect(HeaderRoot);

HeaderRoot.propTypes = {
  title: PropTypes.string,
  onLogout: PropTypes.func,
};
