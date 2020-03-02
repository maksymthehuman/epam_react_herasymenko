import React from 'react';
import { MovieCard } from './MovieCard';

import styles from './MoviesList.module.scss';

export const MoviesList = (props) => {
  const {
    moviesList,
    onTitleClick,
    onLikesChange,
    onStarsChange
  } = props;

  return (
    <div className={styles.moviesContainer}>
      {moviesList.map(({ id, title, posterUrl, stars, likes }) => (
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
      ))}
    </div>
  );
};
