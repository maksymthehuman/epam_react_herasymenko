import {
  SET_LANGUAGE,
} from './types';

const initialState = {
  language: null,
};

export const languageReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_LANGUAGE:
      return { language: action.payload };

    default:
      return state;
  }
};
