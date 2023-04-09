import React, { useState } from "react";
import Phone from "./Phone";
import Email from "./Email";
import styles from "./StepPhoneEmail.module.css";
const PhoneEmailMap = {
  phone: Phone,
  email: Email,
};
const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = PhoneEmailMap[type];

  return (
    <div className={styles.cardWrapper}>
        <div>
        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.tabButton} ${
              type === "phone" ? styles.active : ""
            }`}
            onClick={() => setType("phone")}
          >
            <img src="/images/phone-white.png" alt="phone" />
          </button>

          <button
            className={`${styles.tabButton} ${
              type === "email" ? styles.active : ""
            }`}
            onClick={() => setType("email")}
          >
            <img src="/images/mail-white.png" alt="mail" />
          </button>
        </div>
        <Component onNext={onNext}/>
      </div>
    </div>
  );
};

export default StepPhoneEmail;
