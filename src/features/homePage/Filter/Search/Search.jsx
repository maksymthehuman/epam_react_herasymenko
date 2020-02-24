import React, { Component } from 'react';

import styles from './Search.module.scss';

export class Search extends Component {
  state = {
    searchQuery: ''
  }

  onInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { onSearch } = this.props;
    const trimmedQuery = this.state.searchQuery.trim();

    onSearch(trimmedQuery);

    this.setState({
      searchQuery: trimmedQuery
    });
  }

  render() {
    const { searchQuery } = this.state;

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
          placeholder="Search by title"
          value={searchQuery}
          onChange={this.onInputChange} />
      </form>
    );
  }
}
