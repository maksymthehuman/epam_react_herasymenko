import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './core/configureStore';
import { HomePage } from './features/homePage/';

import moviesData from './moviesList';

import 'reset-css';

const stateToStore = {
  moviesReducer: {
    initialMovies: moviesData.movies,
    sortedMovies: moviesData.movies,
    currentMovieId: 0,
    searchQuery: '',
    sortType: 'default',
    sortedByAscend: true
  }
}

const store = configureStore(stateToStore);

function App() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default App;
