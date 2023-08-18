import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
const Home = () => {
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  const navigate = useNavigate();
  function startRegister() {
    navigate("/authenticate");
  }
  return (
    // <></> this is called freagments

    <div className={styles.cardWrapper}>
      {/* sending props to the Card components for logo and title heading */}
      <Card icon="logo" title="Welcome to Codersvoice!">
        {/* all the children content show because of prop special property sent to Card component*/}
        <p className={styles.text}>
          We're working hard to get Codersvoice ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks
        </p>

        <div>
          {/* import button component */}
          <Button onClick={startRegister} buttonText="Let's Go" />
        </div>

        <div className={styles.signinWrapper}>
          <span>Have an invite text ?</span>
          <Link to="/login" style={signInLinkStyle}>
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
