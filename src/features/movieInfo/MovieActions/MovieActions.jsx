import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from '../../../hocs/withTranslation';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { deleteMovieById } from '../../homePage/actions';

import styles from './MovieActions.module.scss';

const words = [
  'app-movieinfo-button-edit',
  'app-movieinfo-button-delete',
];

class MovieActionsRoot extends Component {
  handleDelete = async () => {
    const { id, deleteMovieById } = this.props;

    await deleteMovieById(id);

    this.props.history.push(Routes.HOMEPAGE);
  };

  render() {
    const { translatedWords, id } = this.props;

    return (
      <div className={styles.movieActions}>
        <button
          className={styles.movieAction}
          onClick={() => this.props.history.push(`${Routes.MOVIEEDIT}/${id}`)}>
          {translatedWords['app-movieinfo-button-edit']}
        </button>
        <button
          className={styles.movieAction}
          onClick={this.handleDelete}>
          {translatedWords['app-movieinfo-button-delete']}
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

export const MovieActions = compose(
  withTranslation(words),
  withRouter,
  withConnect,
)(MovieActionsRoot);

MovieActionsRoot.propTypes = {
  id: PropTypes.number,
  onDelete: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
