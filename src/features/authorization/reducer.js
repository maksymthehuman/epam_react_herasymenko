import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_UBSENT,
  USER_STATUS_RESET,
  USERS_LOADED,
} from './types';

const initialState = {
  users: null,
  isLoggedIn: false,
  wrongUserData: false,
};

export const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case USER_REGISTER:
      return { ...state, isLoggedIn: true };

    case USER_LOGIN:
      return { ...state, isLoggedIn: true };

    case USER_LOGOUT:
      return { ...state, isLoggedIn: false };

    case USERS_LOADED:
      return { ...state, users: action.payload };

    case USER_UBSENT:
      return { ...state, wrongUserData: true };

    case USER_STATUS_RESET:
      return { ...state, wrongUserData: false };

    default:
      return state;
  }
};
