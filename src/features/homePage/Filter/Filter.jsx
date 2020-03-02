import React from 'react';
import { Sort } from './Sort';
import { Search } from './Search';

import styles from './Filter.module.scss';

export const Filter = (props) => {
  const { onSearch, ...sortProps } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sort movies</h2>
      <Sort {...sortProps} />
      <Search onSearch={onSearch} />
    </div>
  );
}
