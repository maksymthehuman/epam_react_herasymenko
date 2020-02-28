import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RatingStars } from '../../../../components/RatingStars';
import { movieShortInfo } from '../../../../propTypes';

import {
  titleClick,
  likesChange
} from '../../actions';

import styles from './MovieCard.module.scss';

const MovieCard = (props) => {
  const {
    id,
    title,
    posterUrl,
    stars,
    likes,
    onTitleClick,
    onLikesChange
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
        stars={stars} />
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

const mapDispatchToProps = {
  onTitleClick: titleClick,
  onLikesChange: likesChange
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default withConnect(MovieCard);

MovieCard.propTypes = {
  ...movieShortInfo,
  onTitleClick: PropTypes.func.isRequired,
  onLikesChange: PropTypes.func.isRequired,
}
