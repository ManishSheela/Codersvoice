import React from "react";
import styles from "./Button.module.css";
const Button = ({ buttonText,onClick }) => {
    return (
    //   receive onClick event from Home component
    <button onClick={onClick} className={styles.button}>
      <span>{buttonText}</span>
      <img
        className={styles.arrow}
        src="/images/arrow-forward.png"
        alt="arrow"
      />
    </button>
  );
};

export default Button;
