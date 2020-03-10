import React from 'react';
import { translatedWordsProp } from '../../propTypes';
import { Filter } from './Filter';
import { MoviesList } from './MoviesList';
import { withTranslation } from '../../hocs/withTranslation';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import styles from './HomePage.module.scss';

const words = ['app-homepage-title'];

const HomePageRoot = ({ translatedWords }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title={translatedWords['app-homepage-title']} />
        <main className={styles.contentContainer}>
          <div className={styles.mainContent}>
            <Filter />
            <MoviesList />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export const HomePage = withTranslation(words)(HomePageRoot);

HomePageRoot.propTypes = {
  translatedWords: translatedWordsProp,
};
