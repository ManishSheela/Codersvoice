import React,{useState} from 'react'
import styles from '../StepPhoneEmail/StepPhoneEmail.module.css';
import Button from '../../../components/shared/Button/Button';
import InputBox from '../../../components/shared/InputBox/InputBox';
import Card from '../../../components/shared/Card/Card';
import { verifyOtp } from '../../../http';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { setName, setAvatar } from "../../../store/activateSlice";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  // retrive data from redux store
  const { phone, hash } = useSelector((state) => state.auth.otp);
  async function submit() {
    if (!otp || !phone || !hash) return;
    try {
      const { data } = await verifyOtp({ otp, phone: phone, hash: hash }); // opt phone hash
      console.log(data);
      dispatch(setAuth(data));

      if (data.user.name) {
        dispatch(setName(data.user.name));
        dispatch(setAvatar(data.user.avatar));
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code we just texted you" icon="lock-emoji">
        <InputBox type={otp} onChange={(e) => setOtp(e.target.value)} />

        <p className={styles.bottomParagraph}>Didn't receive? Tap to resend</p>

        <div className={styles.actionButtonWrap}>
          <Button buttonText="Next" onClick={submit} />
        </div>
      </Card>
    </div>
  );
};

export default StepOtp