import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
} from './types';

export const userRegister = () => ({
  type: USER_REGISTER,
});

export const userLogin = () => ({
  type: USER_LOGIN,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
