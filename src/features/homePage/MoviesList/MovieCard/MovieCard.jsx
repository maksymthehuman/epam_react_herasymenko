import React from 'react';
import { RatingStars } from '../../../../components/RatingStars'

import styles from './MovieCard.module.scss';

export const MovieCard = (props) => {
  const {
    id,
    title,
    posterUrl,
    stars,
    likes,
    onTitleClick,
    onLikesChange,
    onStarsChange
  } = props;

  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <h4
          className={styles.title}
          title={title}
          onClick={() => onTitleClick(id)}>
          {title}
        </h4>
      </div>
      <div className={styles.posterContainer}>
        <img
          className={styles.poster}
          src={posterUrl}
          alt="poster" />
      </div>
      <RatingStars
        id={id}
        stars={stars}
        onStarsChange={onStarsChange} />
      <div className={styles.likesContainer}>
        <span
          className={`fa fa-thumbs-o-down ${styles.dislike}`}
          onClick={() => onLikesChange(id, -1, 'likes')}>
        </span>
        <span className={styles.likesAmount}>{likes}</span>
        <span
          className={`fa fa-thumbs-o-up ${styles.like}`}
          onClick={() => onLikesChange(id, 1, 'likes')}>
        </span>
      </div>
    </div>
  );
}
