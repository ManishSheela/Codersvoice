import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import InputBox from "../../../components/shared/InputBox/InputBox";
import styles from "./StepPhoneEmail.module.css";
const Email = ({onNext}) => {
     const [emailId, setEmailId] = useState("");
  return (
    <Card title="Enter your Email Id " icon="email-emoji">
      <InputBox type={emailId} onChange={(e) => setEmailId(e.target.value)} />
      <div className={styles.actionButtonWrap}>
        <Button buttonText="Next" onClick={onNext} />
      </div>
      <p className={styles.bottomParagraph}>
        By entering your email id, you're agreeing to our Terms of Service and
        Privacy Policy. Thanks!
      </p>
    </Card>
  );
};

export default Email;
