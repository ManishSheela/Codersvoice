import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import InputBox from "../../../components/shared/InputBox/InputBox";
import Card from "../../../components/shared/Card/Card";
import styles from "./stepName.module.css";
import { setName } from "../../../store/activateSlice";
import {useSelector,useDispatch}  from 'react-redux'
const StepName = ({ onNext }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.activateSlice);
  const [fullName, setFullName] = useState(name);
 
  function submit() {
    if (!fullName) return;
    dispatch(setName(fullName));
    onNext();
  }
  return (
    <Card title="What’s your full name?" icon="goggle-emoji">
      <InputBox onChange={(e) => setFullName(e.target.value)} />

      <p className={styles.paragraph}>
        People use real names at Codersvoice :) !
      </p>

      <div className={styles.actionButtonWrap}>
        <Button buttonText="Next" onClick={submit} />
      </div>
    </Card>
  );
};

export default StepName;
