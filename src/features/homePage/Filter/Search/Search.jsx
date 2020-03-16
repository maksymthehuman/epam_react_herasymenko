import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withTranslation } from '../../../../hocs/withTranslation';
import { searchApdate } from '../actions';
import { translatedWordsProp } from '../../../../propTypes';

import styles from './Search.module.scss';

const words = ['app-filter-search-placeholder'];

const SearchRoot = ({
  searchApdate,
  translatedWords,
  searchQuery,
}) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const { value: searchQuery } = event.target.searchField;
    const trimmedQuery = searchQuery.trim();

    searchApdate(trimmedQuery);
  };

  return (
    <form
      className={styles.search}
      onSubmit={onSubmit}>
      <button className={styles.searchButton}>
        <span className={`fa fa-search ${styles.searchIcon}`}></span>
      </button>
      <input
        className={styles.searchField}
        type="search"
        placeholder={translatedWords['app-filter-search-placeholder']}
        name="searchField"
        defaultValue={searchQuery} />
    </form>
  );
};

const mapStateToProps = ({ filterReducer: { searchQuery } }) => ({
  searchQuery,
});

const mapDispatchToProps = {
  searchApdate,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Search = withTranslation(words)(withConnect(SearchRoot));

SearchRoot.propTypes = {
  searchApdate: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  translatedWords: translatedWordsProp,
};
