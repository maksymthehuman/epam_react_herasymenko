import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { RatingStars } from '../../../../components/RatingStars';
import { Routes } from '../../../AppRoutes/AppRoutes.constants';
import { updateMovieById } from '../../actions';

import styles from './MovieCard.module.scss';

const MovieCardRoot = ({ updateMovieById, movie }) => {
  const {
    id,
    title,
    posterUrl,
    likes,
  } = movie;

  const onLikesClick = (value) => {
    const { likes: previousLikes, id } = movie;

    const updatedMovie = {
      ...movie,
      likes: previousLikes + value,
    };

    updateMovieById(id, updatedMovie);
  };

  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <Link
          to={`${Routes.MOVIEINFO}/${id}`}
          className={styles.titleLink}>
          <h4
            className={styles.title}
            title={title}>
            {title}
          </h4>
        </Link>
      </div>
      <div className={styles.posterContainer}>
        <img
          className={styles.poster}
          src={posterUrl}
          alt="poster" />
      </div>
      <RatingStars
        movie={movie}
        handleStarClick={updateMovieById} />
      <div className={styles.likesContainer}>
        <span
          className={`fa fa-thumbs-o-down ${styles.dislike}`}
          onClick={() => onLikesClick(-1)}>
        </span>
        <span className={styles.likesAmount}>{likes}</span>
        <span
          className={`fa fa-thumbs-o-up ${styles.like}`}
          onClick={() => onLikesClick(1)}>
        </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateMovieById,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export const MovieCard = withRouter(withConnect(MovieCardRoot));

MovieCardRoot.propTypes = {
  movie: PropTypes.object.isRequired,
  updateMovieById: PropTypes.func.isRequired,
};
