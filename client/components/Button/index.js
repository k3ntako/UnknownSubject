import React from 'react';
import styles from './index.css';

const fallbackFunc = () => console.warn("No button onClick function set");

const index = (props) => {
  return <button 
    className={`${styles.button} ${props.className}`}
    disabled={!!props.disabled}
    onClick={props.onClick || fallbackFunc }>
    {props.children}
  </button>
};

export default index;