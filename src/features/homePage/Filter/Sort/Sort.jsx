import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortMovies } from '../../actions';

import styles from './Sort.module.scss';

const setIconClass = (currentSortType, direction, sortType) => {
  if (currentSortType === sortType) {
    return direction ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
  }

  return 'fa fa-minus';
}

const Sort = (props) => {
  const {
    onSortMovies,
    sortType,
    sortedByAscend
  } = props;

  const sortLikesIconClass = setIconClass(sortType, sortedByAscend, 'likes');
  const sortStarsIconClass = setIconClass(sortType, sortedByAscend, 'stars');

  return (
    <div className={styles.filter}>
      <button
        className={styles.sortButton}
        onClick={() => onSortMovies('likes')}>
        By likes
      <span className={`${sortLikesIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => onSortMovies('stars')}>
        By rating
      <span className={`${sortStarsIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => onSortMovies('default')}>Reset</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sortType: state.moviesReducer.sortType,
  sortedByAscend: state.moviesReducer.sortedByAscend
});

const mapDispatchToProps = {
  onSortMovies: sortMovies
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(Sort);

Sort.propTypes = {
  onSortMovies: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  sortedByAscend: PropTypes.bool.isRequired,
}