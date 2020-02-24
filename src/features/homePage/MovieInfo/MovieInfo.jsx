import React, { Component } from 'react';
import { RatingStars } from '../../../components/RatingStars'

import styles from './MovieInfo.module.scss';

export class MovieInfo extends Component {
  concatenateTextArray = (textArray) => textArray.join(', ');

  movieDetails = (movie) => {
    const {
      id,
      title,
      likes,
      stars,
      posterUrl,
      director,
      actors,
      genres,
      description
    } = movie;

    const { onStarsChange } = this.props;

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
              {this.concatenateTextArray(actors)}
            </p>
            <p className={styles.text}>
              <span className={styles.paragraph}>Genres: </span>
              {this.concatenateTextArray(genres)}
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

  noMovie = (
    <div className={styles.noMovieContainer}>
      <p className={styles.noMovie}>
        Click on movie title to see more information
      </p>
    </div>
  );

  render() {
    const { movie } = this.props;

    return (
      <>
        {movie.length ? this.movieDetails(movie[0]) : this.noMovie}
      </>
    );
  }
}
