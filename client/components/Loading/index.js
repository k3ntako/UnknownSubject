import React from 'react';
import styles from './index.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div>
        Loading<span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );
};

export default Loading;