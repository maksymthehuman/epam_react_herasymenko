import React from 'react';

import styles from './RatingStars.module.scss';

export const RatingStars = (props) => {
  const {
    id,
    stars,
    onStarsChange
  } = props;

  const MAX_STARS = 5;
  const result = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    result.push(
      <span key={i}
        className={i <= stars ?
          `fa fa-star ${styles.star}` :
          `fa fa-star-o ${styles.star}`}
        onClick={() => onStarsChange(id, i, 'stars')}>
      </span>
    );
  }

  return (
    <div className={styles.starsContainer}>
      {result}
    </div>
  );
}
