import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RatingStars } from '../../components/RatingStars';
import { Actor } from './Actor';
import { MovieActions } from './MovieActions';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { movieShortInfo, movieAdirionalInfo } from '../../propTypes';

import styles from './MovieInfo.module.scss';

const concatenateTextArray = (textArray) => textArray.join(', ');

const movieDetails = (
  {
    id,
    title,
    likes,
    stars,
    posterUrl,
    director,
    actorsIds,
    genres,
    description,
  },
  actors,
) => {

  const currentActors = actors.filter((actor) => actorsIds.includes(actor.id));

  return (
    <article className={styles.movie}>
      <div className={styles.aside}>
        <div className={styles.shortInfo}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.likes}>Likes: {likes}</p>
          <RatingStars
            id={id}
            stars={stars} />
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
            <span className={styles.paragraph}>Director: </span>
            {director}
          </p>
          <p className={styles.text}>
            <span className={styles.paragraph}>Actors: </span>
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
            <span className={styles.paragraph}>Genres: </span>
            {concatenateTextArray(genres)}
          </p>
          <p className={styles.text}>
            <span className={styles.paragraph}>Description: </span>
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

const noMovie = (
  <div className={styles.noMovieContainer}>
    <p className={styles.noMovie}>
      Click on movie title to see more information
    </p>
  </div>
);

const MovieInfo = (props) => {
  const {
    sortedMovies,
    actors,
  } = props;

  const currentMovie = sortedMovies.find((movie) => movie.id === +props.match.params.id);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Movies" />
        {currentMovie ? movieDetails(currentMovie, actors) : noMovie}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortedMovies: state.moviesReducer.sortedMovies,
  actors: state.moviesReducer.actors,
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withConnect(MovieInfo);

movieDetails.propTypes = {
  ...movieShortInfo,
  ...movieAdirionalInfo,
};

MovieInfo.propTypes = {
  sortedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      ...movieShortInfo,
      ...movieAdirionalInfo,
    }),
  ),
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      biography: PropTypes.string.isRequired,
    }),
  ),
};
