import React, { Component } from 'react';

import styles from './Sort.module.scss';

export class Sort extends Component {
  setIconClass(currentSortType, direction, sortType) {
    if (currentSortType === sortType) {
      return direction ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
    }

    return 'fa fa-minus';
  }

  render() {
    const {
      sortMovies,
      sortType,
      sortedByAscend
    } = this.props;

    const sortLikesIconClass = this.setIconClass(sortType, sortedByAscend, 'likes');
    const sortStarsIconClass = this.setIconClass(sortType, sortedByAscend, 'stars');

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
  }
}
