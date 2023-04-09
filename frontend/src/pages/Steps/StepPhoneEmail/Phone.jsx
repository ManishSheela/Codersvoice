import React, { useState } from 'react'
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import InputBox from '../../../components/shared/InputBox/InputBox';
import styles from './StepPhoneEmail.module.css'
import { sendOtp } from "../../../http/index";
import { setOtp } from '../../../store/authSlice';
import {useDispatch}  from 'react-redux'
const Phone = ({ onNext }) => {
  const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
 async function submit() {
   const {data} = await sendOtp({phone:phoneNumber});
   console.log(data);
   dispatch(setOtp({ phone: data.phone, hash: data.hash }));
   onNext();
 }
    return (
      <Card title="Enter your phone number" icon="phone">
        <InputBox
          type={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className={styles.actionButtonWrap}>
          <Button buttonText="Next" onClick={submit}/>
            </div>
            <p className={styles.bottomParagraph}>
            By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
            </p>
      </Card>
    );
}

export default Phone