import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../hocs/withTranslation'
import { searchApdate } from '../actions';

import styles from './Search.module.scss';

const words = ['app-filter-search-placeholder'];

class SearchRoot extends Component {
  onSubmit = (event) => {
    event.preventDefault();

    const { searchApdate } = this.props;

    const searchQuery = event.target.searchField.value;
    const trimmedQuery = searchQuery.trim();

    searchApdate(trimmedQuery);
  };

  render() {
    const { translatedWords, searchQuery } = this.props;

    return (
      <form
        className={styles.search}
        onSubmit={this.onSubmit}>
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
  }
}

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
