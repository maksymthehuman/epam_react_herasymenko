import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMovies } from '../../actions';

import styles from './Search.module.scss';

class Search extends Component {
  state = {
    searchQuery: ''
  }

  onInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { onSearch } = this.props;
    const trimmedQuery = this.state.searchQuery.trim();

    onSearch(trimmedQuery);

    this.setState({
      searchQuery: trimmedQuery
    });
  };

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

const mapDispatchToProps = {
  onSearch: searchMovies
};

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default withConnect(Search);
