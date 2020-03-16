import {
  MOVIE_RESET,
  MOVIE_UPDATED,
  MOVIE_LOADED,
  MOVIES_LOADED,
  MOVIES_RESET,
  ALL_MOVIES_RESET,
  CURRENT_MOVIES_UPDATED,
} from './types';

import { API_URLs } from '../../constants';

export const currentMovieReset = () => ({
  type: MOVIE_RESET,
});

const moviesLoaded = (payload) => ({
  type: MOVIES_LOADED,
  payload,
});

const currentMovieLoaded = (payload) => ({
  type: MOVIE_LOADED,
  payload,
});

export const moviesResetToDefault = () => ({
  type: MOVIES_RESET,
});

export const allMoviesReset = () => ({
  type: ALL_MOVIES_RESET,
});

const movieUpdated = (updatedMovie) => ({
  type: MOVIE_UPDATED,
  payload: updatedMovie,
});

const currentMovieUpdated = (updatedMovie) => ({
  type: CURRENT_MOVIES_UPDATED,
  payload: updatedMovie,
});

export const fetchMovies = () => (dispatch, _, api) => {
  api(API_URLs.MOVIES)
    .then(({ data }) => {
      dispatch(moviesLoaded(data));
    })
    .catch((error) => console.warn(error));
};

export const fetchMovieById = (id) => (dispatch, _, api) => {
  api(`${API_URLs.MOVIES}/${id}`)
    .then(({ data }) => {
      dispatch(currentMovieLoaded(data));
    })
    .catch((error) => console.warn(error));
};

export const deleteMovieById = (id) => async (dispatch, _, api) => {
  try {
    await api(`${API_URLs.MOVIES}/${id}`, 'delete');
    dispatch(currentMovieReset());
  } catch (error) {
    console.warn(error);
  }
};

export const updateMovieById = (id, movie) => async (dispatch, _, api) => {
  try {
    const response = await api(`${API_URLs.MOVIES}/${id}`, 'put', movie);
    dispatch(movieUpdated(response.data));
  } catch (error) {
    console.warn(error);
  }
};

export const updateCurrentMovieById = (id, movie) => async (dispatch, _, api) => {
  try {
    const response = await api(`${API_URLs.MOVIES}/${id}`, 'put', movie);
    dispatch(currentMovieUpdated(response.data));
  } catch (error) {
    console.warn(error);
  }
};
