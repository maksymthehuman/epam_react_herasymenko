import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import styles from './ActorInfo.module.scss';

const actorDetails = ({ name, imgUrl, biography }) => (
  <article className={styles.actor}>
    <div className={styles.actorInfo}>
      <div className={styles.photoContainer}>
        <img
          className={styles.photo}
          src={imgUrl}
          alt={name} />
      </div>
      <div className={styles.textContent}>
        <p className={styles.text}>
          <span className={styles.paragraph}>Name: </span>
          {name}
        </p>
        <p className={styles.text}>
          <span className={styles.paragraph}>Biography: </span>
          {biography}
        </p>
      </div>
    </div>
  </article>
);

const noActor = (
  <div className={styles.noActorContainer}>
    <p className={styles.noActor}>
      Sorry, there is no such actor
    </p>
  </div>
);

const ActorInfoRoot = (props) => {
  const { actors } = props;
  const { id } = props.match.params;

  const currentActor = actors.find((actor) => actor.id === +id);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Actors" />
        {currentActor ? actorDetails(currentActor) : noActor}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  actors: state.moviesReducer.actors,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export const ActorInfo = withConnect(withRouter(ActorInfoRoot));

actorDetails.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
};

ActorInfoRoot.propTypes = {
  actors: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
