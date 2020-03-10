import React from 'react';
import PropTypes from 'prop-types';

import styles from './RatingStars.module.scss';

export const RatingStars = (props) => {

  const onStarClick = (relevantStars) => {
    const { movie, handleStarClick } = props;
    const id = props.movie.id;

    const updatedMovie = {
      ...movie,
      stars: relevantStars,
    };

    handleStarClick(id, updatedMovie);
  };

  const { stars } = props.movie;

  const MAX_STARS = 5;
  const starsTemplate = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    starsTemplate.push(
      <span key={i}
        className={i <= stars ?
          `fa fa-star ${styles.star}` :
          `fa fa-star-o ${styles.star}`}
        onClick={() => onStarClick(i)}>
      </span>,
    );
  }

  return (
    <div className={styles.starsContainer}>
      {starsTemplate}
    </div>
  );
};

RatingStars.propTypes = {
  handleStarClick: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
};
