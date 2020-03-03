import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortMovies } from '../../actions';
import { SortTypes } from './constants';

import styles from './Sort.module.scss';

const setIconClass = (currentSortType, direction, sortType) => {
  if (currentSortType === sortType) {
    return direction ? 'fa fa-chevron-up' : 'fa fa-chevron-down';
  }

  return 'fa fa-minus';
};

const SortRoot = (props) => {
  const {
    onSortMovies,
    sortType,
    sortedByAscend,
  } = props;

  const sortLikesIconClass = setIconClass(sortType, sortedByAscend, SortTypes.LIKES);
  const sortStarsIconClass = setIconClass(sortType, sortedByAscend, SortTypes.STARS);

  return (
    <div className={styles.filter}>
      <button
        className={styles.sortButton}
        onClick={() => onSortMovies(SortTypes.LIKES)}>
        By likes
      <span className={`${sortLikesIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => onSortMovies(SortTypes.STARS)}>
        By rating
      <span className={`${sortStarsIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => onSortMovies('default')}>Reset</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortType: state.moviesReducer.sortType,
  sortedByAscend: state.moviesReducer.sortedByAscend,
});

const mapDispatchToProps = {
  onSortMovies: sortMovies,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Sort = withConnect(SortRoot);

SortRoot.propTypes = {
  onSortMovies: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  sortedByAscend: PropTypes.bool.isRequired,
};
