import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortApdate, sortReset } from '../actions';
import { SortTypes } from './constants';

import styles from './Sort.module.scss';

const setIconClass = (currentSortType, direction, sortType) => {
  if (currentSortType === sortType) {
    return direction ? 'fa fa-chevron-down' : 'fa fa-chevron-up';
  }

  return 'fa fa-minus';
};

const SortRoot = (props) => {
  const {
    sortApdate,
    sortType,
    sortByAscend,
    sortReset,
  } = props;

  const sortLikesIconClass = setIconClass(sortType, sortByAscend, SortTypes.LIKES);
  const sortStarsIconClass = setIconClass(sortType, sortByAscend, SortTypes.STARS);

  return (
    <div className={styles.filter}>
      <button
        className={styles.sortButton}
        onClick={() => sortApdate(SortTypes.LIKES)}>
        By likes
      <span className={`${sortLikesIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => sortApdate(SortTypes.STARS)}>
        By rating
      <span className={`${sortStarsIconClass} ${styles.sortIcon}`}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={sortReset}>Reset</button>
    </div>
  );
};

const mapStateToProps = ({ filterReducer: { sortType, sortByAscend } }) => ({
  sortType,
  sortByAscend,
});

const mapDispatchToProps = {
  sortApdate,
  sortReset,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Sort = withConnect(SortRoot);

SortRoot.propTypes = {
  sortApdate: PropTypes.func.isRequired,
  sortReset: PropTypes.func.isRequired,
  sortType: PropTypes.string,
  sortByAscend: PropTypes.bool,
};
