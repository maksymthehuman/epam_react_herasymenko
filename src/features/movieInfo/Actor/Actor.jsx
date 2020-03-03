import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Routes } from '../../../constants';

import styles from './Actor.module.scss';

const ActorRoot = (props) => {
  const { id, name } = props;

  return (
    <span
      className={styles.name}
      onClick={() => props.history.push(`${Routes.ACTORINFO}/${id}`)}>
      {name}
    </span>
  );
};

export const Actor = withRouter(ActorRoot);

ActorRoot.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
