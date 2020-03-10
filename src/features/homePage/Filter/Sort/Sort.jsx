import React from 'react';
import PropTypes from 'prop-types';
import { translatedWordsProp } from '../../../../propTypes';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withTranslation } from '../../../../hocs/withTranslation';
import { sortApdate, sortReset } from '../actions';
import { SortTypes } from './constants';

import styles from './Sort.module.scss';

const words = [
  'app-filter-sort-likes',
  'app-filter-sort-rating',
  'app-filter-sort-reset',
];

const setIconClass = (currentSortType, direction, sortType) => {
  if (currentSortType === sortType) {
    return direction ? 'fa-chevron-down' : 'fa-chevron-up';
  }

  return 'fa-minus';
};

const SortRoot = (props) => {
  const {
    translatedWords,
    sortApdate,
    sortType,
    sortByAscend,
    sortReset,
  } = props;

  const sortLikesIconClass = classNames(
    styles.sortIcon,
    'fa',
    setIconClass(sortType, sortByAscend, SortTypes.LIKES),
  );

  const sortStarsIconClass = classNames(
    styles.sortIcon,
    'fa',
    setIconClass(sortType, sortByAscend, SortTypes.STARS),
  );

  return (
    <div className={styles.filter}>
      <button
        className={styles.sortButton}
        onClick={() => sortApdate(SortTypes.LIKES)}>
        {translatedWords['app-filter-sort-likes']}
        <span className={sortLikesIconClass}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => sortApdate(SortTypes.STARS)}>
        {translatedWords['app-filter-sort-rating']}
        <span className={sortStarsIconClass}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={sortReset}>
        {translatedWords['app-filter-sort-reset']}
      </button>
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

export const Sort = withTranslation(words)(withConnect(SortRoot));

SortRoot.propTypes = {
  translatedWords: translatedWordsProp,
  sortApdate: PropTypes.func.isRequired,
  sortReset: PropTypes.func.isRequired,
  sortType: PropTypes.string,
  sortByAscend: PropTypes.bool,
};
