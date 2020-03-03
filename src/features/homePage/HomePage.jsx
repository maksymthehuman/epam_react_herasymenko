import React from 'react';
import { Filter } from './Filter';
import { MoviesList } from './MoviesList';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Movies" />
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
