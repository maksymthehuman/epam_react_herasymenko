import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Routes } from '../AppRoutes/AppRoutes.constants';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { fetchMovieById, updateCurrentMovieById, currentMovieReset } from '../homePage/actions';
import { movieShortInfo } from '../../propTypes';

import styles from './MovieEdit.module.scss';

class MovieEditRoot extends Component {
  componentDidMount() {
    const { fetchMovieById } = this.props;
    const { id } = this.props.match.params;

    fetchMovieById(id);
  }

  componentWillUnmount() {
    const { currentMovieReset } = this.props;

    currentMovieReset();
  }

  submitEditedMovie = (event) => {
    event.preventDefault();

    const { updateCurrentMovieById } = this.props;
    const {
      id,
      stars,
      likes,
      actorsIds,
    } = this.props.currentMovie;

    const {
      movieTitle,
      moviePoster,
      movieDirector,
      movieGenres,
      movieDescription,
    } = event.target;

    const formattedGenres = movieGenres.value.split(', ');

    const newMovieData = {
      id,
      title: movieTitle.value,
      posterUrl: moviePoster.value,
      stars,
      likes,
      actorsIds,
      director: movieDirector.value,
      genres: formattedGenres,
      description: movieDescription.value,
    };

    updateCurrentMovieById(id, newMovieData);
    this.props.history.push(`${Routes.MOVIEINFO}/${id}`);
  };

  render() {
    const { currentMovie } = this.props;

    if (!currentMovie) {
      return <h1>Loading...</h1>
    }

    const { id, title, posterUrl, description, director } = currentMovie;
    const genres = currentMovie.genres.join(', ');

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Header title="Movies" />
          <form
            className={styles.movieEdit}
            onSubmit={this.submitEditedMovie}>
            <div className={styles.inputGroup}>
              <label className={styles.description} htmlFor="movieTitle">Title</label>
              <input
                className={styles.inputField}
                type="text"
                id="movieTitle"
                name="movieTitle"
                defaultValue={title}
                required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.description} htmlFor="moviePoster">Image URL</label>
              <input
                className={styles.inputField}
                type="text"
                id="moviePoster"
                name="moviePoster"
                defaultValue={posterUrl}
                required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.description} htmlFor="movieDirector">Director</label>
              <input
                className={styles.inputField}
                type="text"
                id="movieDirector"
                name="movieDirector"
                defaultValue={director}
                required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.description} htmlFor="movieGenres">Genres</label>
              <input
                className={styles.inputField}
                type="text"
                id="movieGenres"
                name="movieGenres"
                title="Enter movie genres separated by comma and space: ', '"
                defaultValue={genres}
                required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.description} htmlFor="movieDescription">Description</label>
              <textarea
                className={styles.inputFieldLarge}
                id="movieDescription"
                name="movieDescription"
                defaultValue={description}
                required>
              </textarea>
            </div>
            <div className={styles.submitContainer}>
              <button
                className={styles.actionButton}
                type="submit">
                Submit
            </button>
              <button
                className={styles.actionButton}
                type="button"
                onClick={() => this.props.history.push(`${Routes.MOVIEINFO}/${id}`)}>
                Go back
            </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
};

const mapStateToProps = ({ moviesReducer: { currentMovie } }) => ({
  currentMovie,
});

const mapDispatchToProps = {
  fetchMovieById,
  updateCurrentMovieById,
  currentMovieReset,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const MovieEdit = withRouter(withConnect(MovieEditRoot));

MovieEditRoot.propTypes = {
  sortedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      ...movieShortInfo,
    }),
  ),
  onEdit: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
