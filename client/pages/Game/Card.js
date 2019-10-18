import React from 'react';
import styles from './Card.css';

export default (props) => {
  const selectedClassName = props.selected.includes(props.id) ? styles.selected : "";
  const isSelectingClassName = props.isSelecting ? styles.isSelecting : "";

  return <div
    className={`${styles.cardBackBg} ${selectedClassName} ${isSelectingClassName}`}
    onClick={() => props.onCardClick(props.id)}>
    <div className={styles.cardBack}>
      <span>{props.text}</span>
    </div>
  </div>
}
