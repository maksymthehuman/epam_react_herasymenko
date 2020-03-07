import {
  MOVIE_RESET,
  MOVIE_UPDATED,
  MOVIE_LOADED,
  MOVIES_LOADED,
  MOVIES_RESET,
  ALL_MOVIES_RESET,
  CURRENT_MOVIES_UPDATED,
} from './types';

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
  api('movies')
    .then(({ data }) => {
      dispatch(moviesLoaded(data));
    });
};

export const fetchMovieById = (id) => (dispatch, _, api) => {
  api(`movies/${id}`)
    .then(({ data }) => {
      dispatch(currentMovieLoaded(data));
    });
};

export const deleteMovieById = (id) => async (dispatch, _, api) => {
  await api(`movies/${id}`, 'delete');
  dispatch(currentMovieReset());
};

export const updateMovieById = (id, movie) => async (dispatch, _, api) => {
  const response = await api(`movies/${id}`, 'put', movie);
  dispatch(movieUpdated(response.data));
};

export const updateCurrentMovieById = (id, movie) => async (dispatch, _, api) => {
  const response = await api(`movies/${id}`, 'put', movie);
  dispatch(currentMovieUpdated(response.data));
};
