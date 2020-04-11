import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { WORDS } from './MovieActions.constants';
import { withTranslation } from '../../../hocs/withTranslation';
import { Routes } from '../../AppRoutes/AppRoutes.constants';
import { deleteMovieById } from '../../homePage/actions';
import { translatedWordsProp } from '../../../propTypes';

import styles from './MovieActions.module.scss';

const wordsToTranslate = Object.values(WORDS);

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
          {translatedWords[WORDS.BUTTON_EDIT]}
        </button>
        <button
          className={styles.movieAction}
          onClick={this.handleDelete}>
          {translatedWords[WORDS.BUTTON_DELETE]}
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  deleteMovieById,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export const MovieActions = compose(
  withTranslation(wordsToTranslate),
  withRouter,
  withConnect,
)(MovieActionsRoot);

MovieActionsRoot.propTypes = {
  id: PropTypes.number.isRequired,
  translatedWords: translatedWordsProp,
  deleteMovieById: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
