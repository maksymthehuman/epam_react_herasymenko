import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Routes } from '../../constants'
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { movieEdited } from '../homePage/actions';

import styles from './MovieEdit.module.scss';

const MovieEdit = (props) => {
  const {
    sortedMovies,
    onEdit
  } = props;

  const currentMovieId = +props.match.params.id;

  const currentMovie = sortedMovies.find((movie) => movie.id === currentMovieId);
  const { title, posterUrl, description, director } = currentMovie;
  const genres = currentMovie.genres.join(', ');

  const submitEditedMovie = (event) => {
    event.preventDefault();

    const {
      movieTitle,
      moviePoster,
      movieDirector,
      movieGenres,
      movieDescription,
    } = event.target;

    const formattedGenres = movieGenres.value.split(', ');

    const newMovieData = {
      id: currentMovieId,
      title: movieTitle.value,
      posterUrl: moviePoster.value,
      director: movieDirector.value,
      genres: formattedGenres,
      description: movieDescription.value,
    };

    onEdit(newMovieData);
    props.history.push(`${Routes.MOVIEINFO}/${currentMovieId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Movies" />
        <form
          className={styles.movieEdit}
          onSubmit={submitEditedMovie}>
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
              onClick={() => props.history.push(`${Routes.MOVIEINFO}/${currentMovieId}`)}>
              Go back
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sortedMovies: state.moviesReducer.sortedMovies,
});

const mapDispatchToProps = {
  onEdit: movieEdited,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(withConnect(MovieEdit));
