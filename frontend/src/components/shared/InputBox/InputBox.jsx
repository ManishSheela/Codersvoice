import React from "react";
import styles from "./InputBox.module.css";
const InputBox = (props) => {
  return (
    <input
      className={styles.input}
      style={{
        width: props.fullwidth === "true" ? "100%" : "",
      }}
      type="text"
      {...props}
    />
  );
};

export default InputBox;
