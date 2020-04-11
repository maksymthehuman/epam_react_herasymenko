import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { WORDS } from './MovieEdit.constants';
import { withTranslation } from '../../hocs/withTranslation';
import { Routes } from '../AppRoutes/AppRoutes.constants';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { fetchMovieById, updateCurrentMovieById, currentMovieReset } from '../homePage/actions';
import {
  movieShortInfo,
  movieAditionalInfo,
  translatedWordsProp,
} from '../../propTypes';

import styles from './MovieEdit.module.scss';

const wordsToTranslate = Object.values(WORDS);

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

  submitEditedMovie = ({ genres, ...data }) => {
    const { updateCurrentMovieById } = this.props;
    const {
      id,
      stars,
      likes,
      actorsIds,
    } = this.props.currentMovie;

    const formattedGenres = genres.split(', ');

    const newMovieData = {
      id,
      stars,
      likes,
      actorsIds,
      genres: formattedGenres,
      ...data,
    };

    updateCurrentMovieById(id, newMovieData);
    this.props.history.push(`${Routes.MOVIEINFO}/${id}`);
  };

  render() {
    const { translatedWords, currentMovie } = this.props;
    const {
      id,
      title,
      posterUrl,
      director,
      genres: genresArray,
      description,
    } = currentMovie || {};

    const genres = currentMovie ? genresArray.join(', ') : '';

    return currentMovie ? (
      <div className={styles.container}>
        <div className={styles.content}>
          <Header title={translatedWords[WORDS.TITLE]} />
          <Form
            initialValues={{ title, posterUrl, director, genres, description }}
            onSubmit={this.submitEditedMovie}
            render={({ handleSubmit }) => (
              <form
                className={styles.movieEdit}
                onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="title">
                    {translatedWords[WORDS.LABEL_TITLE]}
                  </label>
                  <Field
                    className={styles.inputField}
                    id="title"
                    name="title"
                    component="input"
                    required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="posterUrl">
                    {translatedWords[WORDS.LABEL_IMAGE_URL]}
                  </label>
                  <Field
                    className={styles.inputField}
                    id="posterUrl"
                    name="posterUrl"
                    component="input"
                    required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="director">
                    {translatedWords[WORDS.LABEL_DIRECTOR]}
                  </label>
                  <Field
                    className={styles.inputField}
                    id="director"
                    name="director"
                    component="input"
                    required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="genres">
                    {translatedWords[WORDS.LABEL_GENRES]}
                  </label>
                  <Field
                    className={styles.inputField}
                    id="genres"
                    name="genres"
                    title={translatedWords[WORDS.LABEL_GENRES_TIP]}
                    component="input"
                    required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="description">
                    {translatedWords[WORDS.LABEL_DESCRIPTION]}
                  </label>
                  <Field
                    className={styles.inputFieldLarge}
                    id="description"
                    name="description"
                    component="textarea"
                    required />
                </div>
                <div className={styles.submitContainer}>
                  <button
                    className={styles.actionButton}
                    type="submit">
                    {translatedWords[WORDS.BUTTON_SUBMIT]}
                  </button>
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => this.props.history.push(`${Routes.MOVIEINFO}/${id}`)}>
                    {translatedWords[WORDS.BUTTON_BACK]}
                  </button>
                </div>
              </form>
            )}
          />
        </div>
        <Footer />
      </div>
    ) : (
        <h1>{translatedWords[WORDS.TEXT_LOADING]}</h1>
      );
  }
}

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

export const MovieEdit = compose(
  withTranslation(wordsToTranslate),
  withRouter,
  withConnect,
)(MovieEditRoot);

MovieEditRoot.propTypes = {
  fetchMovieById: PropTypes.func.isRequired,
  updateCurrentMovieById: PropTypes.func.isRequired,
  currentMovieReset: PropTypes.func.isRequired,
  currentMovie: PropTypes.shape({
    ...movieShortInfo,
    ...movieAditionalInfo,
  }),
  translatedWords: translatedWordsProp,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
