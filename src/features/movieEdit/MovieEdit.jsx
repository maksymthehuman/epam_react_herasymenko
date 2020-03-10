import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { withTranslation } from '../../hocs/withTranslation';
import { Routes } from '../AppRoutes/AppRoutes.constants';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { fetchMovieById, updateCurrentMovieById, currentMovieReset } from '../homePage/actions';
import { movieShortInfo } from '../../propTypes';

import styles from './MovieEdit.module.scss';

const words = [
  'app-loading-text',
  'app-movieedit-title',
  'app-movieedit-form-label-title',
  'app-movieedit-form-label-image-url',
  'app-movieedit-form-label-director',
  'app-movieedit-form-label-genres',
  'app-movieedit-form-label-genres-tip',
  'app-movieedit-form-label-description',
  'app-movieedit-form-button-submit',
  'app-movieedit-form-button-back',
];

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

    if (!currentMovie) {
      return <h1>{translatedWords['app-loading-text']}</h1>
    }

    const { id, title, posterUrl, description, director } = currentMovie;
    const genres = currentMovie.genres.join(', ');

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <Header title={translatedWords['app-movieedit-title']} />
          <Form
            initialValues={{ title, posterUrl, director, genres, description }}
            onSubmit={this.submitEditedMovie}
            render={({ handleSubmit }) => (
              <form
                className={styles.movieEdit}
                onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="title">
                    {translatedWords['app-movieedit-form-label-title']}
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
                    {translatedWords['app-movieedit-form-label-image-url']}
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
                    {translatedWords['app-movieedit-form-label-director']}
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
                    {translatedWords['app-movieedit-form-label-genres']}
                  </label>
                  <Field
                    className={styles.inputField}
                    id="genres"
                    name="genres"
                    title={translatedWords['app-movieedit-form-label-genres-tip']}
                    component="input"
                    required />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.description} htmlFor="description">
                    {translatedWords['app-movieedit-form-label-description']}
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
                    {translatedWords['app-movieedit-form-button-submit']}
                  </button>
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => this.props.history.push(`${Routes.MOVIEINFO}/${id}`)}>
                    {translatedWords['app-movieedit-form-button-back']}
                  </button>
                </div>
              </form>
            )}
          />
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

export const MovieEdit = compose(
  withTranslation(words),
  withRouter,
  withConnect,
)(MovieEditRoot);

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
