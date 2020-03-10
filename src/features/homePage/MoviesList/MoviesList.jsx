import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from '../../../hocs/withTranslation'
import { fetchMovies, moviesResetToDefault } from '../actions';
import { MovieCard } from './MovieCard';
import { movieShortInfo, movieAdirionalInfo } from '../../../propTypes';

import styles from './MoviesList.module.scss';

const words = ['app-loading-text'];

class MoviesListRoot extends Component {
  componentDidMount() {
    const { fetchMovies } = this.props;

    fetchMovies();
  }

  componentWillUnmount() {
    const { moviesResetToDefault } = this.props;

    moviesResetToDefault();
  }

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

  compareProperties = (property, a, b, ascend = true) => {
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

  render() {
    const {
      translatedWords,
      moviesList,
      searchQuery,
      sortType,
      sortByAscend,
    } = this.props;

    if (!moviesList) {
      return <h1>{translatedWords['app-loading-text']}</h1>
    }

    const filteredMovies = this.search(moviesList, searchQuery);
    const sortedMovies = [...filteredMovies];

    if (sortType) {
      sortedMovies.sort((a, b) => this.compareProperties(sortType, a, b, sortByAscend));
    }

    return (
      <div className={styles.moviesContainer}>
        {sortedMovies.map((movie) => (
          <div key={movie.id} className={styles.movie}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({
  moviesReducer: { moviesList },
  filterReducer: {
    searchQuery,
    sortType,
    sortByAscend,
  },
}) => ({
  moviesList,
  searchQuery,
  sortType,
  sortByAscend,
});

const mapDispatchToProps = {
  fetchMovies,
  moviesResetToDefault,
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const MoviesList = withTranslation(words)(withConnect(MoviesListRoot));

MoviesListRoot.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
  moviesResetToDefault: PropTypes.func.isRequired,
  moviesList: PropTypes.arrayOf(
    PropTypes.shape({
      ...movieShortInfo,
      ...movieAdirionalInfo,
    })
  ),
  searchQuery: PropTypes.string,
  sortType: PropTypes.string,
  sortByAscend: PropTypes.bool,
};
