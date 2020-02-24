import React from 'react';
import { MovieCard } from './MovieCard';

import styles from './MoviesList.module.scss'

export const MoviesList = (props) => {
  const {
    moviesList,
    onTitleClick,
    onLikesChange,
    onStarsChange
  } = props;

  const movies = moviesList.map((movie) => {
    const {
      id,
      title,
      posterUrl,
      stars,
      likes
    } = movie;

    return (
      <div key={id} className={styles.movie}>
        <MovieCard
          id={id}
          title={title}
          posterUrl={posterUrl}
          stars={stars}
          likes={likes}
          onTitleClick={onTitleClick}
          onLikesChange={onLikesChange}
          onStarsChange={onStarsChange} />
      </div>
    );
  });

  return (
    <div className={styles.moviesContainer}>
      {movies}
    </div>
  );
};
