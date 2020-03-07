import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchActorById, currentActorReset } from './actions';
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

class ActorInfoRoot extends Component {
  componentDidMount() {
    const { fetchActorById } = this.props;
    const { id } = this.props.match.params;

    fetchActorById(id);
  }

  componentWillUnmount() {
    const { currentActorReset } = this.props;

    currentActorReset();
  }

  render() {
    const { currentActor } = this.props;

    if (!currentActor) {
      return <h1>Loading...</h1>
    }

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Header title="Actors" />
          {actorDetails(currentActor)}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ actorsReducer: { currentActor } }) => ({
  currentActor,
});

const mapDispatchToProps = {
  fetchActorById,
  currentActorReset,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const ActorInfo = withConnect(withRouter(ActorInfoRoot));

actorDetails.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
};

ActorInfoRoot.propTypes = {
  fetchActorById: PropTypes.func.isRequired,
  currentActorReset: PropTypes.func.isRequired,
  currentActor: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
