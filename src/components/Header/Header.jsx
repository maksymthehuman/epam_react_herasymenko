import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WORDS } from './Header.constants';
import { translatedWordsProp } from '../../propTypes';
import { withTranslation } from '../../hocs/withTranslation';
import { userLogout } from '../../features/authorization/actions';
import { Routes } from '../../features/AppRoutes/AppRoutes.constants';
import { LanguagesList } from '../LanguagesList';

import styles from './Header.module.scss';

const wordsToTranslate = Object.values(WORDS);

const HeaderRoot = ({ translatedWords, title, userLogout }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainNavigation}>
        <nav className={styles.navigation}>
          <NavLink
            to={Routes.HOMEPAGE}
            className={styles.navigationItem}
            activeClassName={styles.navigationItemActive}>
            {translatedWords[WORDS.NAV_HOMEPAGE]}
          </NavLink>
        </nav>
        <LanguagesList />
        <div className={styles.logoutContainer}>
          <button
            className={styles.logout}
            onClick={userLogout}>
            {translatedWords[WORDS.BUTTON_LOGOUT]}
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
  userLogout,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export const Header = withTranslation(wordsToTranslate)(withConnect(HeaderRoot));

HeaderRoot.propTypes = {
  translatedWords: translatedWordsProp,
  title: PropTypes.string,
  userLogout: PropTypes.func.isRequired,
};
