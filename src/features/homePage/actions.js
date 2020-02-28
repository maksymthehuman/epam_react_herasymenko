import {
  MOVIE_SELECTED,
  MOVIE_UPDATED,
  MOVIES_SEARCH,
  MOVIES_SORT
} from './types';

export const titleClick = (movieId) => ({
  type: MOVIE_SELECTED,
  payload: movieId
});

export const likesChange = (id, value, property) => ({
  type: MOVIE_UPDATED,
  payload: {
    id,
    value,
    property
  }
});

export const starsChange = (id, value, property) => ({
  type: MOVIE_UPDATED,
  payload: {
    id,
    value,
    property
  }
});

export const searchMovies = (searchQuery) => ({
  type: MOVIES_SEARCH,
  payload: searchQuery
});

export const sortMovies = (sortType) => ({
  type: MOVIES_SORT,
  payload: sortType
});
