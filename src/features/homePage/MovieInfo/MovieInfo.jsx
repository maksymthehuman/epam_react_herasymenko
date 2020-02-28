import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RatingStars } from '../../../components/RatingStars'
import { movieShortInfo, movieAdirionalInfo } from '../../../propTypes';

import styles from './MovieInfo.module.scss';

const concatenateTextArray = (textArray) => textArray.join(', ');

const movieDetails = ({
  id,
  title,
  likes,
  stars,
  posterUrl,
  director,
  actors,
  genres,
  description
}) => {

  return (
    <article className={styles.container}>
      <div className={styles.shortInfo}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.likes}>Likes: {likes}</p>
        <RatingStars
          id={id}
          stars={stars} />
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
            {concatenateTextArray(actors)}
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
    currentMovieId
  } = props;

  const currentMovie = sortedMovies.find((movie) => movie.id === currentMovieId);

  return (
    <>
      {currentMovie ? movieDetails(currentMovie) : noMovie}
    </>
  );
}

const mapStateToProps = (state) => ({
  sortedMovies: state.moviesReducer.sortedMovies,
  currentMovieId: state.moviesReducer.currentMovieId
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default withConnect(MovieInfo)

movieDetails.propTypes = {
  ...movieShortInfo,
  ...movieAdirionalInfo,
};

MovieInfo.propTypes = {
  sortedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      ...movieShortInfo,
      ...movieAdirionalInfo,
    })
  ),
  currentMovieId: PropTypes.number,
};
