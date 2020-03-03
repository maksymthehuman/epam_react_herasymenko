import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
} from './types';

const initialState = {
  isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {

  switch (action.type) {

    case USER_REGISTER:
      return { isLoggedIn: true };

    case USER_LOGIN:
      return { isLoggedIn: true };

    case USER_LOGOUT:
      return { isLoggedIn: false };

    default:
      return state;
  }
};
