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
        <span style={logoText}>Codersvoice</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          {/* <div className={styles.profile}> */}
          <h3>{user?.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>
          {/* </div> */}
          <button className={styles.logoutButton} onClick={logoutUser}>
            Logout
            {/* <img src="/images/logout.png" alt="logout" /> */}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
