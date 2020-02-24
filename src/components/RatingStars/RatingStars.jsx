import React, { Component } from 'react';

import styles from './RatingStars.module.scss';

export class RatingStars extends Component {
  render() {
    const {
      id,
      stars,
      onStarsChange
    } = this.props;
    const result = [];

    for (let i = 1; i <= 5; i++) {
      result.push(
        <span key={i}
          className={i <= stars ?
            `fa fa-star ${styles.star}` :
            `fa fa-star-o ${styles.star}`}
          onClick={() => onStarsChange(id, i, 'stars')}>
        </span>
      );
    }

    return (
      <div className={styles.starsContainer}>
        {result}
      </div>
    );
  }
}
