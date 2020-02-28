import {
  MOVIE_SELECTED,
  MOVIE_UPDATED,
  MOVIES_SEARCH,
  MOVIES_SORT
} from './types';

const initialState = {
  initialMovies: null,
  sortedMovies: null,
  currentMovieId: 0,
  searchQuery: '',
  sortType: 'default',
  sortedByAscend: true
}

const updateMoviesList = (movies, movie, movieIndex) => {
  return [
    ...movies.slice(0, movieIndex),
    movie,
    ...movies.slice(movieIndex + 1)
  ];
};

const updateMovie = (movie, value, property) => {
  let updatedMovie = {};

  switch (property) {
    case 'likes':
      updatedMovie = {
        ...movie,
        likes: movie.likes + value
      };

      break;

    case 'stars':
      updatedMovie = {
        ...movie,
        stars: value
      }

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
      sortedByAscend: true
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
    initialMovies: updateMoviesList(initialMovies, updatedMovie, initialMovieIndex)
  };
}

export const moviesReducer = (state = initialState, action) => {

  switch (action.type) {

    case MOVIE_SELECTED:
      return { ...state, currentMovieId: action.payload };

    case MOVIE_UPDATED:
      return updateMoviesLists(state, action.payload);

    case MOVIES_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
        sortedMovies: search(state.initialMovies, action.payload)
      };

    case MOVIES_SORT:
      const newProperties = {
        sortedByAscend: state.sortedByAscend,
        ...resetSortProperties(state.sortType, action.payload)
      }

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
        ...newProperties
      };

    default:
      return state;
  }
};
