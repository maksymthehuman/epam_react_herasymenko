import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { starsChange } from '../../features/homePage/actions';

import styles from './RatingStars.module.scss';

const RatingStars = (props) => {
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

const mapStateToProps = (state) => ({
  sortedMovies: state.moviesReducer.sortedMovies,
  currentMovieId: state.moviesReducer.currentMovieId
});

const mapDispatchToProps = {
  onStarsChange: starsChange
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(RatingStars);

RatingStars.propTypes = {
  id: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  onStarsChange: PropTypes.func.isRequired,
}
