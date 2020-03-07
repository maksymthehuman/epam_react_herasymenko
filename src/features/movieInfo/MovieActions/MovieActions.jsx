import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { deleteMovieById } from '../../homePage/actions';

import styles from './MovieActions.module.scss';

class MovieActionsRoot extends Component {
  handleDelete = async () => {
    const { id, deleteMovieById } = this.props;

    await deleteMovieById(id);

    this.props.history.push(Routes.HOMEPAGE);
  };

  render() {
    const { id } = this.props;

    return (
      <div className={styles.movieActions}>
        <button
          className={styles.movieAction}
          onClick={() => this.props.history.push(`${Routes.MOVIEEDIT}/${id}`)}>
          EDIT
          </button>
        <button
          className={styles.movieAction}
          onClick={this.handleDelete}>
          DELETE
          </button>
      </div>
    );
  }
};

const mapDispatchToProps = {
  deleteMovieById,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export const MovieActions = withRouter(withConnect(MovieActionsRoot));

MovieActionsRoot.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
