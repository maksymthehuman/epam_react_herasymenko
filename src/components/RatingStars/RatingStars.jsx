import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { starsChange } from '../../features/homePage/actions';

import styles from './RatingStars.module.scss';

const RatingStarsRoot = (props) => {
  const {
    id,
    stars,
    onStarsChange,
  } = props;

  const MAX_STARS = 5;
  const starsTemplate = [];

  for (let i = 1; i <= MAX_STARS; i++) {
    starsTemplate.push(
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
      {starsTemplate}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortedMovies: state.moviesReducer.sortedMovies,
  currentMovieId: state.moviesReducer.currentMovieId,
});

const mapDispatchToProps = {
  onStarsChange: starsChange,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const RatingStars = withConnect(RatingStarsRoot);

RatingStarsRoot.propTypes = {
  id: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  onStarsChange: PropTypes.func.isRequired,
};
