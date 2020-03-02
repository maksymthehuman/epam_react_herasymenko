import React from 'react';
import { RatingStars } from '../../../components/RatingStars';

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
    actors,
    genres,
    description
  },
  onStarsChange
) => {

  return (
    <article className={styles.container}>
      <div className={styles.shortInfo}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.likes}>Likes: {likes}</p>
        <RatingStars
          id={id}
          stars={stars}
          onStarsChange={onStarsChange} />
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

export const MovieInfo = (props) => {
  const { movie, onStarsChange } = props;

  return (
    <>
      {movie.length ? movieDetails(movie[0], onStarsChange) : noMovie}
    </>
  );
};
