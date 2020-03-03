import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MovieCard } from './MovieCard';
import { movieShortInfo } from '../../../propTypes';

import styles from './MoviesList.module.scss';

const MoviesListRoot = (props) => {
  const { sortedMovies } = props;

  return (
    <div className={styles.moviesContainer}>
      {sortedMovies.map(({ id, title, posterUrl, stars, likes }) => (
        <div key={id} className={styles.movie}>
          <MovieCard
            id={id}
            title={title}
            posterUrl={posterUrl}
            stars={stars}
            likes={likes} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortedMovies: state.moviesReducer.sortedMovies,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export const MoviesList = withConnect(MoviesListRoot);

MoviesListRoot.propTypes = {
  sortedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      ...movieShortInfo,
    }),
  ),
};
