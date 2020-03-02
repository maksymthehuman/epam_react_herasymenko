import React, { Component } from 'react';
import { Filter } from './Filter';
import { MoviesList } from './MoviesList';
import { MovieInfo } from './MovieInfo';

import moviesData from '../../moviesList';

import styles from './HomePage.module.scss';

export class HomePage extends Component {
  state = {
    initialMovies: moviesData.movies,
    sortedMovies: moviesData.movies,
    currentMovieId: 0,
    searchQuery: '',
    sortType: 'default',
    sortedByAscend: true
  }

  copyArray = (oldArray) => JSON.parse(JSON.stringify(oldArray));

  onSearchQuery = (query) => {
    this.setState({
      searchQuery: query
    });
  };

  search(movies, query) {
    let searchQuery;

    if (query.length === 0) {
      return movies;
    }

    return movies.filter((movie) => {
      searchQuery = new RegExp(query, 'i');

      return searchQuery.test(movie.title);
    });
  };

  resetSortProperties = (type) => {
    if (this.state.sortType !== type) {
      this.setState({
        sortType: type,
        sortedByAscend: true
      });
    }
  };

  sortMovies = (type) => {
    this.resetSortProperties(type);

    const newMoviesList = this.copyArray(this.state.initialMovies);

    if (type === 'default') {
      this.setState({
        sortedMovies: newMoviesList
      });
    } else {
      this.setState(({ sortedByAscend }) => {
        newMoviesList.sort((a, b) => this.compareProperties(type, a, b, sortedByAscend));

        return {
          sortedMovies: newMoviesList,
          sortedByAscend: !sortedByAscend
        };
      });
    }
  };

  compareProperties(property, a, b, ascend = true) {
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

  onTitleClick = (id) => {
    this.setState({
      currentMovieId: id
    });
  };

  updateProperty(movies, id, value, property) {
    const changedMovie = movies.find((movie) => movie.id === id);

    switch (property) {
      case 'likes':
        changedMovie[property] += value;

        break;

      case 'stars':
        changedMovie[property] = value;

        break;

      default:

        break;
    }

    return movies;
  };

  updateMovie = (id, value, property) => {
    this.resetSortProperties('noSort');

    this.setState(({ initialMovies, sortedMovies }) => {
      const newInitialMovies = this.updateProperty(
        this.copyArray(initialMovies),
        id,
        value,
        property
      );

      const newSortedMovies = this.updateProperty(
        this.copyArray(sortedMovies),
        id,
        value,
        property
      );

      return {
        initialMovies: newInitialMovies,
        sortedMovies: newSortedMovies
      };
    });
  };

  render() {
    const {
      sortedMovies,
      currentMovieId,
      sortType,
      sortedByAscend,
      searchQuery
    } = this.state;

    const currentMovie = sortedMovies.filter((movie) => movie.id === currentMovieId);
    const filteredMovies = this.search(sortedMovies, searchQuery);

    return (
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Movies</h1>
          <div className={styles.contentContainer}>
            <div className={styles.mainContent}>
              <Filter
                sortMovies={this.sortMovies}
                sortType={sortType}
                sortedByAscend={sortedByAscend}
                onSearch={this.onSearchQuery} />
              <MoviesList
                moviesList={filteredMovies}
                onTitleClick={this.onTitleClick}
                onLikesChange={this.updateMovie}
                onStarsChange={this.updateMovie} />
            </div>
            <div className={styles.asideContent}>
              <MovieInfo
                movie={currentMovie}
                onStarsChange={this.updateMovie} />
            </div>
          </div>
        </div>
        <span className={styles.company}>EPAM</span>
      </main>
    );
  }
};
