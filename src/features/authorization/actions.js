import axios from 'axios';

import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_UBSENT,
  USER_STATUS_RESET,
  USERS_LOADED,
} from './types';

import { API_URLs } from '../../constants';

export const userRegistered = () => ({
  type: USER_REGISTER,
});

export const userLogin = () => ({
  type: USER_LOGIN,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const userStatusReset = () => ({
  type: USER_STATUS_RESET,
});

const usersLoaded = (payload) => ({
  type: USERS_LOADED,
  payload,
});

const userUbsent = () => ({
  type: USER_UBSENT,
});

export const fetchUsers = () => (dispatch, _, api) => {
  api(API_URLs.USERS)
    .then(({ data }) => {
      dispatch(usersLoaded(data));
    })
    .catch((error) => console.warn(error));
};

export const registerUser = (user) => (dispatch, _, api) => {
  api(API_URLs.USERS, 'post', user)
    .then(() => dispatch(userRegistered()))
    .catch((error) => console.warn(error));
};

export const verifyUser = (name, password) => (dispatch) => {
  axios.get(`http://localhost:3001/${API_URLs.USERS}`, {
    params: {
      name,
      password,
    },
  })
    .then(({ data }) => {
      if (data.length) {
        dispatch(userLogin());
      } else {
        dispatch(userUbsent());
      }
    })
    .catch((error) => console.warn(error));
};
