import React from 'react';
import { Filter } from './Filter';
import { MoviesList } from './MoviesList';
import { MovieInfo } from './MovieInfo';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Movies</h1>
        <div className={styles.contentContainer}>
          <div className={styles.mainContent}>
            <Filter />
            <MoviesList />
          </div>
          <div className={styles.asideContent}>
            <MovieInfo />
          </div>
        </div>
      </div>
      <span className={styles.company}>EPAM</span>
    </main>
  );
}
