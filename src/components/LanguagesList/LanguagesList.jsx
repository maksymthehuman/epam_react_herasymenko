import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { WORDS } from './LanguagesList.constants';
import { translatedWordsProp } from '../../propTypes';
import { withTranslation } from '../../hocs/withTranslation';
import { setLanguage } from './actions';
import { LANGUAGES } from '../../constants';

import styles from './LanguagesList.module.scss';

const wordsToTranslate = Object.values(WORDS);

const LanguagesListRoot = ({ setLanguage, language, translatedWords }) => {
  return (
    <div className={styles.langContainer}>
      <p className={styles.langText}>
        {translatedWords[WORDS.TEXT_LANGUAGE]}
      </p>
      <ul className={styles.langList}>
        <li
          className={cx(
            styles.langListItem,
            language === LANGUAGES.UKR && styles.langListItemActive,
          )}
          onClick={() => setLanguage(LANGUAGES.UKR)}>
          {translatedWords[WORDS.LANGUAGE_UKR]}
        </li>
        <li
          className={cx(
            styles.langListItem,
            language === LANGUAGES.ENG && styles.langListItemActive,
          )}
          onClick={() => setLanguage(LANGUAGES.ENG)}>
          {translatedWords[WORDS.LANGUAGE_ENG]}
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

export const LanguagesList = withTranslation(wordsToTranslate)(withConnect(LanguagesListRoot));

LanguagesListRoot.propTypes = {
  translatedWords: translatedWordsProp,
  setLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
