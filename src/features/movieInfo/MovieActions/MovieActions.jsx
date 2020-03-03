import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Routes } from '../../../constants';
import { movieDeleted } from '../../homePage/actions';

import styles from './MovieActions.module.scss';

const MovieActionsRoot = (props) => {
  const {
    id,
    onDelete,
  } = props;

  const handleDelete = () => {
    onDelete(id);
    props.history.push(Routes.HOMEPAGE);
  };

  return (
    <div className={styles.movieActions}>
      <button
        className={styles.movieAction}
        onClick={() => props.history.push(`${Routes.MOVIEEDIT}/${id}`)}>
        EDIT
      </button>
      <button
        className={styles.movieAction}
        onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  onDelete: movieDeleted,
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
