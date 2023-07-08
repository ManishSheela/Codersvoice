import React from 'react';
import styles from './InputBox.module.css';
const InputBox = (props) => {
  return <input className={styles.input} {...props} />;
}

export default InputBox