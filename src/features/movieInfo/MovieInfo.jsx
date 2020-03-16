import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translatedWordsProp } from '../../propTypes';
import { withTranslation } from '../../hocs/withTranslation';
import { RatingStars } from '../../components/RatingStars';
import { Actor } from './Actor';
import { MovieActions } from './MovieActions';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { fetchActors, actorsReset } from '../actorInfo/actions';
import {
  fetchMovieById,
  currentMovieReset,
  updateCurrentMovieById,
} from '../homePage/actions';

import styles from './MovieInfo.module.scss';

const words = [
  'app-loading-text',
  'app-movieinfo-title',
  'app-movieinfo-likes',
  'app-movieinfo-director',
  'app-movieinfo-actors',
  'app-movieinfo-genres',
  'app-movieinfo-description',
];

const concatenateTextArray = (textArray) => textArray.join(', ');

const movieDetails = (translatedWords, currentMovie, actors, handleStarClick) => {
  const {
    id,
    title,
    likes,
    posterUrl,
    director,
    actorsIds,
    genres,
    description,
  } = currentMovie;

  const currentActors = actors.filter((actor) => actorsIds.includes(actor.id));

  return (
    <article className={styles.movie}>
      <div className={styles.aside}>
        <div className={styles.shortInfo}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.likes}>{translatedWords['app-movieinfo-likes']}{likes}</p>
          <RatingStars
            movie={currentMovie}
            handleStarClick={handleStarClick} />
        </div>
        <MovieActions id={id} />
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.posterContainer}>
          <img
            className={styles.poster}
            src={posterUrl}
            alt="poster" />
        </div>
        <div>
          <p className={styles.text}>
            <span className={styles.paragraph}>
              {translatedWords['app-movieinfo-director']}
            </span>
            {director}
          </p>
          <p className={styles.text}>
            <span className={styles.paragraph}>
              {translatedWords['app-movieinfo-actors']}
            </span>
            {currentActors.map(({ id, name }, index) => (
              <span key={id}>
                <Actor
                  id={id}
                  name={name} />
                {currentActors.length - 1 === index ? '.' : ', '}
              </span>
            ))}
          </p>
          <p className={styles.text}>
            <span className={styles.paragraph}>
              {translatedWords['app-movieinfo-genres']}
            </span>
            {concatenateTextArray(genres)}
          </p>
          <p className={styles.text}>
            <span className={styles.paragraph}>
              {translatedWords['app-movieinfo-description']}
            </span>
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

class MovieInfoRoot extends Component {
  componentDidMount() {
    const { fetchMovieById, fetchActors } = this.props;
    const { id } = this.props.match.params;

    fetchMovieById(id);
    fetchActors();
  }

  componentWillUnmount() {
    const { currentMovieReset, actorsReset } = this.props;

    currentMovieReset();
    actorsReset();
  }

  render() {
    const {
      translatedWords,
      currentMovie,
      actors,
      updateCurrentMovieById,
    } = this.props;

    return currentMovie && actors ? (
      <div className={styles.container}>
        <div className={styles.content}>
          <Header title={translatedWords['app-movieinfo-title']} />
          {movieDetails(translatedWords, currentMovie, actors, updateCurrentMovieById)}
        </div>
        <Footer />
      </div>
    ) : (
        <h1>{translatedWords['app-loading-text']}</h1>
      );
  }
}

const mapStateToProps = ({
  actorsReducer: { actors },
  moviesReducer: { currentMovie },
}) => ({
  actors,
  currentMovie,
});

const mapDispatchToProps = {
  fetchMovieById,
  currentMovieReset,
  fetchActors,
  actorsReset,
  updateCurrentMovieById,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const MovieInfo = withTranslation(words)(withConnect(MovieInfoRoot));

movieDetails.propTypes = {
  translatedWords: translatedWordsProp,
  currentMovie: PropTypes.object.isRequired,
  actors: PropTypes.array.isRequired,
  handleStarClick: PropTypes.func.isRequired,
};

MovieInfoRoot.propTypes = {
  translatedWords: translatedWordsProp,
  fetchMovieById: PropTypes.func.isRequired,
  fetchActors: PropTypes.func.isRequired,
  currentMovieReset: PropTypes.func.isRequired,
  actorsReset: PropTypes.func.isRequired,
  updateCurrentMovieById: PropTypes.func.isRequired,
  currentMovie: PropTypes.object,
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      biography: PropTypes.string.isRequired,
    }),
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};
