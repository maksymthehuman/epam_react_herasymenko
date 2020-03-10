import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translatedWordsProp } from '../../propTypes';
import cx from 'classnames';
import { withTranslation } from '../../hocs/withTranslation';
import { setLanguage } from './actions';
import { Languages } from '../../constants';

import styles from './LanguagesList.module.scss';

const words = [
  'app-languages-text',
  'app-languages-ukr',
  'app-languages-eng',
];

const LanguagesListRoot = ({ setLanguage, language, translatedWords }) => {
  return (
    <div className={styles.langContainer}>
      <p className={styles.langText}>
        {translatedWords['app-languages-text']}
      </p>
      <ul className={styles.langList}>
        <li
          className={cx(
            styles.langListItem,
            language === Languages.UKR && styles.langListItemActive,
          )}
          onClick={() => setLanguage(Languages.UKR)}>
          {translatedWords['app-languages-ukr']}
        </li>
        <li
          className={cx(
            styles.langListItem,
            language === Languages.ENG && styles.langListItemActive,
          )}
          onClick={() => setLanguage(Languages.ENG)}>
          {translatedWords['app-languages-eng']}
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ languageReducer: { language } }) => ({
  language,
});

const mapDispatchToProps = {
  setLanguage,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const LanguagesList = withTranslation(words)(withConnect(LanguagesListRoot));

LanguagesListRoot.propTypes = {
  translatedWords: translatedWordsProp,
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
