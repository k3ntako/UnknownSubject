import React from 'react';
import styles from './index.css';

export default (props) => {
  const message = props.message && <div className={styles.instruction}> {props.message} </div>;
  return <div className={"section"}>
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Unknown Subject</h1>
        <div className={styles.role}>Your Role: {props.myCharacterName}</div>
      </div>
      <h1>
        { props.timeLeft }
      </h1>
    </div>
    { message }
    { props.children }
  </div>
}


