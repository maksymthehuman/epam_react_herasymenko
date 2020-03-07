import {
  MOVIE_LOADED,
  MOVIE_UPDATED,
  MOVIE_RESET,
  MOVIES_LOADED,
  MOVIES_RESET,
  ALL_MOVIES_RESET,
  CURRENT_MOVIES_UPDATED,
} from './types';

const initialState = {
  moviesList: null,
  currentMovie: null,
};

const updateMoviesList = (movies, movie, movieIndex) => {
  return [
    ...movies.slice(0, movieIndex),
    movie,
    ...movies.slice(movieIndex + 1),
  ];
};

export const moviesReducer = (state = initialState, action) => {

  switch (action.type) {

    case MOVIES_RESET:
      return {
        ...state,
        moviesList: null,
      };

    case ALL_MOVIES_RESET:
      return {
        ...state,
        moviesList: null,
        currentMovie: null,
      };

    case MOVIES_LOADED:
      return {
        ...state,
        moviesList: action.payload,
      };

    case MOVIE_LOADED:
      return {
        ...state,
        currentMovie: action.payload,
      };

    case MOVIE_UPDATED:
      const { moviesList } = state;
      const { id } = action.payload;
      const sortedMovieIndex = moviesList.findIndex((movie) => movie.id === id);

      const updatedMovie = action.payload;

      const updatedMoviesList = updateMoviesList(
        moviesList,
        updatedMovie,
        sortedMovieIndex,
      );

      return { ...state, moviesList: updatedMoviesList };

    case CURRENT_MOVIES_UPDATED:
      return { ...state, currentMovie: action.payload };

    case MOVIE_RESET:
      return {
        ...state,
        currentMovie: null,
      };

    default:
      return state;
  }
};
