import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { translatedWordsProp } from '../../propTypes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from '../../hocs/withTranslation';
import { fetchActorById, currentActorReset } from './actions';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import styles from './ActorInfo.module.scss';

const words = [
  'app-loading-text',
  'app-actorinfo-title',
  'app-actorinfo-name',
  'app-actorinfo-biography',
];

const actorDetails = (
  translatedWords,
  { name, imgUrl, biography },
) => (
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
            <span className={styles.paragraph}>
              {translatedWords['app-actorinfo-name']}
            </span>
            {name}
          </p>
          <p className={styles.text}>
            <span className={styles.paragraph}>
              {translatedWords['app-actorinfo-biography']}
            </span>
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
    const { translatedWords, currentActor } = this.props;

    return currentActor ? (
      <div className={styles.container}>
        <div className={styles.content}>
          <Header title={translatedWords['app-actorinfo-title']} />
          {actorDetails(translatedWords, currentActor)}
        </div>
        <Footer />
      </div>
    ) : (
        <h1>{translatedWords['app-loading-text']}</h1>
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

export const ActorInfo = compose(
  withTranslation(words),
  withRouter,
  withConnect,
)(ActorInfoRoot);

actorDetails.propTypes = {
  translatedWords: translatedWordsProp,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  biography: PropTypes.string.isRequired,
};

ActorInfoRoot.propTypes = {
  translatedWords: translatedWordsProp,
  fetchActorById: PropTypes.func.isRequired,
  currentActorReset: PropTypes.func.isRequired,
  currentActor: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
