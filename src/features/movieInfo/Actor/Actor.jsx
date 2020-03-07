import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Routes } from '../../AppRoutes/AppRoutes.constants';

import styles from './Actor.module.scss';

const ActorRoot = (props) => {
  const { id, name } = props;

  return (
    <Link
      to={`${Routes.ACTORINFO}/${id}`}
      className={styles.nameLink}>
      <span className={styles.name}>
        {name}
      </span>
    </Link>
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
