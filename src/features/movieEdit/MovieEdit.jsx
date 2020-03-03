import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import styles from './MovieEdit.module.scss';

const MovieEdit = (props) => {
  const { sortedMovies } = props;

  const currentMovie = sortedMovies.find((movie) => movie.id === +props.match.params.id);
  console.log(currentMovie);
  const { title, posterUrl, description, director } = currentMovie;
  const genres = currentMovie.genres.join(', ');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Movies" />
        <form className={styles.movieEdit}>
          <div className={styles.inputGroup}>
            <label className={styles.description} htmlFor="movieTitle">Title</label>
            <input
              className={styles.inputField}
              type="text"
              id="movieTitle"
              defaultValue={title} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.description} htmlFor="moviePoster">Image URL</label>
            <input
              className={styles.inputField}
              type="text"
              id="moviePoster"
              defaultValue={posterUrl} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.description} htmlFor="movieDirector">Director</label>
            <input
              className={styles.inputField}
              type="text"
              id="movieDirector"
              defaultValue={director} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.description} htmlFor="movieGenres">Genres</label>
            <input
              className={styles.inputField}
              type="text"
              id="movieGenres"
              defaultValue={genres} />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.description} htmlFor="movieDescription">Description</label>
            <textarea
              className={styles.inputFieldLarge}
              id="movieDescription"
              defaultValue={description}>
            </textarea>
          </div>
          <div className={styles.submitContainer}>
            <button className={styles.actionButton}>
              Submit
            </button>
            <button className={styles.actionButton}>
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

// const mapDispatchToProps = {
//   onEdit: 
// }

const withConnect = connect(
  mapStateToProps,
  null,
);

export default withRouter(withConnect(MovieEdit));
