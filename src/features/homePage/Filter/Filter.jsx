import React from 'react';
import { WORDS } from './Filter.constants';
import { translatedWordsProp } from '../../../propTypes';
import { withTranslation } from '../../../hocs/withTranslation';
import { Sort } from './Sort';
import { Search } from './Search';

import styles from './Filter.module.scss';

const wordsToTranslate = Object.values(WORDS);

const FilterRoot = ({ translatedWords }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{translatedWords[WORDS.TITLE]}</h2>
      <Sort />
      <Search />
    </div>
  );
};

export const Filter = withTranslation(wordsToTranslate)(FilterRoot);

FilterRoot.propTypes = {
  translatedWords: translatedWordsProp,
};
