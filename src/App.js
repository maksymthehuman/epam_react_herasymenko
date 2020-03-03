import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './core/configureStore';
import { AppRoutes } from './features/AppRoutes/AppRoutes';

import moviesData from './moviesList';

import 'reset-css';

const stateToStore = {
  moviesReducer: {
    initialMovies: moviesData.movies,
    sortedMovies: moviesData.movies,
    actors: moviesData.actors,
    searchQuery: '',
    sortType: 'default',
    sortedByAscend: true,
  },
  userReducer: {
    isLoggedIn: false,
  },
};

const store = configureStore(stateToStore);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
