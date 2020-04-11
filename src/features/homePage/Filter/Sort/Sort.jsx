import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { SORT_TYPES, WORDS } from './Sort.constants';
import { translatedWordsProp } from '../../../../propTypes';
import { withTranslation } from '../../../../hocs/withTranslation';
import { sortApdate, sortReset } from '../actions';

import styles from './Sort.module.scss';

const wordsToTranslate = Object.values(WORDS);

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
    setIconClass(sortType, sortByAscend, SORT_TYPES.LIKES),
  );

  const sortStarsIconClass = classNames(
    styles.sortIcon,
    'fa',
    setIconClass(sortType, sortByAscend, SORT_TYPES.STARS),
  );

  return (
    <div className={styles.filter}>
      <button
        className={styles.sortButton}
        onClick={() => sortApdate(SORT_TYPES.LIKES)}>
        {translatedWords[WORDS.BUTTON_LIKES]}
        <span className={sortLikesIconClass}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={() => sortApdate(SORT_TYPES.STARS)}>
        {translatedWords[WORDS.BUTTON_RATING]}
        <span className={sortStarsIconClass}></span>
      </button>
      <button
        className={styles.sortButton}
        onClick={sortReset}>
        {translatedWords[WORDS.BUTTON_RESET]}
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

export const Sort = withTranslation(wordsToTranslate)(withConnect(SortRoot));

SortRoot.propTypes = {
  translatedWords: translatedWordsProp,
  sortApdate: PropTypes.func.isRequired,
  sortReset: PropTypes.func.isRequired,
  sortType: PropTypes.string,
  sortByAscend: PropTypes.bool,
};
