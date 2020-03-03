import {
  MOVIE_UPDATED,
  MOVIE_EDITED,
  MOVIE_DELETED,
  MOVIES_SEARCH,
  MOVIES_SORT,
} from './types';

const initialState = {
  initialMovies: null,
  sortedMovies: null,
  searchQuery: '',
  sortType: 'default',
  sortedByAscend: true,
};

const updateMoviesList = (movies, movie, movieIndex) => {
  return [
    ...movies.slice(0, movieIndex),
    movie,
    ...movies.slice(movieIndex + 1),
  ];
};

const updateMovie = (movie, value, property) => {
  let updatedMovie = {};

  switch (property) {
    case 'likes':
      updatedMovie = {
        ...movie,
        likes: movie.likes + value,
      };

      break;

    case 'stars':
      updatedMovie = {
        ...movie,
        stars: value,
      };

      break;

    default:

      break;
  }

  return updatedMovie;
};

const search = (movies, query) => {
  let searchQuery;

  if (query.length === 0) {
    return movies;
  }

  return movies.filter((movie) => {
    searchQuery = new RegExp(query, 'i');

    return searchQuery.test(movie.title);
  });
};

const resetSortProperties = (currentType, type) => {
  if (currentType !== type) {
    return {
      sortType: type,
      sortedByAscend: true,
    };
  }

  return {};
};

const compareProperties = (property, a, b, ascend = true) => {
  const firstObject = a[property];
  const secondObject = b[property];
  let comparison = 0;

  if (firstObject > secondObject) {
    comparison = -1;
  }

  if (firstObject < secondObject) {
    comparison = 1;
  }

  return ascend ? comparison : (comparison * -1);
};

const updateMoviesLists = (state, payload) => {
  const { initialMovies, sortedMovies } = state;
  const { id, value, property } = payload;

  const sortedMovieIndex = sortedMovies.findIndex((movie) => movie.id === id);
  const initialMovieIndex = initialMovies.findIndex((movie) => movie.id === id);

  const movie = sortedMovies[sortedMovieIndex];

  const updatedMovie = updateMovie(movie, value, property);

  return {
    ...state,
    sortedMovies: updateMoviesList(sortedMovies, updatedMovie, sortedMovieIndex),
    initialMovies: updateMoviesList(initialMovies, updatedMovie, initialMovieIndex),
  };
};

const removeMovieFromList = (list, movieIndex) => {
  return [
    ...list.slice(0, movieIndex),
    ...list.slice(movieIndex + 1),
  ];
};

const deleteMovie = (state, id) => {
  const { initialMovies, sortedMovies } = state;

  const initialMovieIndex = initialMovies.findIndex((movie) => movie.id === id);
  const sortedMovieIndex = sortedMovies.findIndex((movie) => movie.id === id);

  return {
    ...state,
    initialMovies: removeMovieFromList(initialMovies, initialMovieIndex),
    sortedMovies: removeMovieFromList(sortedMovies, sortedMovieIndex),
  };
};

const saveEditedMovie = (state, movie) => {
  const { initialMovies, sortedMovies } = state;
  const { id } = movie;

  const initialMovieIndex = initialMovies.findIndex((movie) => movie.id === id);
  const sortedMovieIndex = sortedMovies.findIndex((movie) => movie.id === id);

  const newMovie = {
    ...initialMovies[initialMovieIndex],
    ...movie,
  };

  return {
    ...state,
    initialMovies: updateMoviesList(initialMovies, newMovie, initialMovieIndex),
    sortedMovies: updateMoviesList(sortedMovies, newMovie, sortedMovieIndex),
  };
};

export const moviesReducer = (state = initialState, action) => {

  switch (action.type) {

    case MOVIE_UPDATED:
      return updateMoviesLists(state, action.payload);

    case MOVIE_EDITED:
      return saveEditedMovie(state, action.payload);

    case MOVIE_DELETED:
      return deleteMovie(state, action.payload);

    case MOVIES_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
        sortedMovies: search(state.initialMovies, action.payload),
      };

    case MOVIES_SORT:
      const newProperties = {
        sortedByAscend: state.sortedByAscend,
        ...resetSortProperties(state.sortType, action.payload),
      };

      if (action.payload === 'default') {
        newProperties.sortedMovies = [...state.initialMovies];
        newProperties.searchQuery = '';
      } else {
        newProperties.sortedMovies = [...state.sortedMovies];
        newProperties.sortedMovies.sort((a, b) => compareProperties(action.payload, a, b, newProperties.sortedByAscend));
      }

      newProperties.sortedByAscend = !newProperties.sortedByAscend;

      return {
        ...state,
        ...newProperties,
      };

    default:
      return state;
  }
};
