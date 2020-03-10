import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Languages } from '../constants';
import { getLanguage } from '../components/LanguagesList/actions';
import englishWords from '../internalize/eng';
import ukrainianWords from '../internalize/ukr';

export const withTranslation = (words = []) => (WrappedComponent) => {
  function getCurrentLanguageWords(currentLanguage) {
    switch (currentLanguage) {

      case Languages.ENG:
        return englishWords;

      case Languages.UKR:
        return ukrainianWords;

      default:
        return englishWords;
    }
  }

  function getTransletedWords(words, currentLanguage) {
    const currentLanguageWords = getCurrentLanguageWords(currentLanguage);
    const translatedWords = {};

    for (const word in currentLanguageWords) {
      if (words.includes(word)) {
        translatedWords[word] = currentLanguageWords[word];
      }
    }

    return translatedWords;
  }

  class NewComponent extends Component {
    render() {
      const { language, getLanguage } = this.props;

      if (!language) {
        getLanguage();
      }

      const translatedWords = getTransletedWords(words, language);

      return (
        <WrappedComponent
          {...this.props}
          translatedWords={translatedWords} />
      );
    }
  }

  const mapStateToProps = ({ languageReducer: { language } }) => ({
    language,
  });

  const mapDispatchToProps = {
    getLanguage,
  };

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  NewComponent.propTypes = {
    language: PropTypes.string,
    getLanguage: PropTypes.func.isRequired,
  };

  return withConnect(NewComponent);
};
