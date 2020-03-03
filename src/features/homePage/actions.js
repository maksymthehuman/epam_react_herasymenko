import {
  MOVIE_UPDATED,
  MOVIE_EDITED,
  MOVIE_DELETED,
  MOVIES_SEARCH,
  MOVIES_SORT,
} from './types';

export const likesChange = (id, value, property) => ({
  type: MOVIE_UPDATED,
  payload: {
    id,
    value,
    property,
  },
});

export const movieEdited = (editedMovieData) => ({
  type: MOVIE_EDITED,
  payload: editedMovieData,
});

export const movieDeleted = (id) => ({
  type: MOVIE_DELETED,
  payload: id,
});

export const starsChange = (id, value, property) => ({
  type: MOVIE_UPDATED,
  payload: {
    id,
    value,
    property,
  },
});

export const searchMovies = (searchQuery) => ({
  type: MOVIES_SEARCH,
  payload: searchQuery,
});

export const sortMovies = (sortType) => ({
  type: MOVIES_SORT,
  payload: sortType,
});
