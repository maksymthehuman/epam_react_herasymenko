import React from 'react';

import styles from './Sort.module.scss';

const setIconClass = (currentSortType, direction, sortType) => {
  if (currentSortType === sortType) {
    return direction ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
  }

  return 'fa fa-minus';
};

export const Sort = (props) => {
  const {
    sortMovies,
    sortType,
    sortedByAscend
  } = props;

  const sortLikesIconClass = setIconClass(sortType, sortedByAscend, 'likes');
  const sortStarsIconClass = setIconClass(sortType, sortedByAscend, 'stars');

  return (
    <div className={styles.filter}>
      <button
        className={styles.sortButton}
        onClick={() => sortMovies('likes')}>
        By likes
        <span className={`${sortLikesIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => sortMovies('stars')}>
        By rating
        <span className={`${sortStarsIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => sortMovies('default')}>Reset</button>
    </div>
  );
};
