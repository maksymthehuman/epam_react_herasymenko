import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';
import { configureStore } from './core/configureStore';
import { Routes } from './constants';
import { AppRoutes } from './features/AppRoutes/AppRoutes';

import moviesData from './moviesList';

import 'reset-css';

const stateToStore = {
  moviesReducer: {
    initialMovies: moviesData.movies,
    sortedMovies: moviesData.movies,
    actors: moviesData.actors,
    // delete tails
    // currentMovieId: 0,
    searchQuery: '',
    sortType: 'default',
    sortedByAscend: true,
  },
  userReducer: {
    // change to false
    isLoggedIn: false,
  },
};

const store = configureStore(stateToStore);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>

        {/* navigation goes to header */}

        {/* <ul>
          <li>
            <Link to={Routes.HOMEPAGE}>home</Link>
          </li>
          <li>
            <Link to={`${Routes.MOVIEINFO}/1`}>info</Link>
          </li>
          <li>
            <Link to={`${Routes.ACTORINFO}/1`}>actor</Link>
          </li>
          <li>
            <Link to={`${Routes.MOVIEEDIT}/1`}>edit movie</Link>
          </li>
          <li>
            <Link to={Routes.LOGIN}>login</Link>
          </li>
        </ul> */}

        <AppRoutes />

      </BrowserRouter>
    </Provider>
  );
}

export default App;
