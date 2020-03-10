import React from 'react';
import { translatedWordsProp } from '../../../propTypes';
import { withTranslation } from '../../../hocs/withTranslation';
import { Sort } from './Sort';
import { Search } from './Search';

import styles from './Filter.module.scss';

const words = ['app-filter-title'];

const FilterRoot = ({ translatedWords }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{translatedWords['app-filter-title']}</h2>
      <Sort />
      <Search />
    </div>
  );
};

export const Filter = withTranslation(words)(FilterRoot);

FilterRoot.propTypes = {
  translatedWords: translatedWordsProp,
};
