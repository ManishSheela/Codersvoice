import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { setAuth } from "../../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../http";
const Navigation = () => {
  const brandStyle = {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
  };
  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth); // showing name & photo to the navbar
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to="/" style={brandStyle}>
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>Codershouse</span>
      </Link>
      {isAuth && (
        <div>
          <button className={styles.logoutButton} onClick={logoutUser}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
