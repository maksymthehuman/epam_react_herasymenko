import {
  Languages,
  LOCAL_STORAGE_LANG,
} from '../../constants';

import {
  SET_LANGUAGE,
} from './types';

const languageSwitched = (payload) => ({
  type: SET_LANGUAGE,
  payload,
});

export const getLanguage = () => (dispatch) => {
  const currentLanguage = getCurrentLanguage();

  dispatch(languageSwitched(currentLanguage));
};

export const setLanguage = (language) => (dispatch) => {
  setCurrentLanguage(language);

  dispatch(languageSwitched(language));
};

function getCurrentLanguage() {
  if (!localStorage.getItem(LOCAL_STORAGE_LANG)) {
    setCurrentLanguage();
  }

  return localStorage.getItem(LOCAL_STORAGE_LANG);
}

function setCurrentLanguage(lang = Languages.ENG) {
  localStorage.setItem(LOCAL_STORAGE_LANG, lang);
}
