import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Routes } from '../../../constants'
import { movieDeleted } from '../../homePage/actions'

import styles from './MovieActions.module.scss';

export const MovieActions = (props) => {
  const {
    id,
    onDelete
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
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withRouter(withConnect(MovieActions));
