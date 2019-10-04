import React from 'react';
import styles from './Card.css';

export default (props) => {
  const selectedClassName = props.selected.includes(props.user.id) ? styles.selected : "";

  return <div
    className={`${styles.cardBackBg} ${selectedClassName}`}
    onClick={() => props.onCardClick(props.user.id)}>
    <div className={styles.cardBack}>
      <span>{props.user.name}</span>
    </div>
  </div>
}
