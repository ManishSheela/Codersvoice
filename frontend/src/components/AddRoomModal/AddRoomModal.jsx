import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import InputBox from "../shared/InputBox/InputBox";
import { useNavigate } from "react-router-dom";
import { createRoom as create } from "../../http/index";

const AddRoomModal = ({ onClose }) => {
  let navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");
  async function createRoom() {
    if (!topic) return;
    try {
      const { data } = await create({ roomType, topic });
      navigate(`/room/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        {/* modal close button  */}
        <button className={styles.closeButton} onClick={onClose}>
          <img src="/images/close.png" alt="close" />
        </button>
        {/* modal header  */}
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <InputBox
            fullwidth="true"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          {/* Type of room start here  */}
          <h2 className={styles.subHeading}>Room types</h2>

          <div className={styles.roomTypes}>
            {/* Open for all room type start here */}
            <div
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
              onClick={() => setRoomType("open")}
            >
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            {/* Social room type start here */}
            <div
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
              onClick={() => setRoomType("social")}
            >
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            {/* Private room type start here */}
            <div
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
              onClick={() => setRoomType("private")}
            >
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        {/* modal footer start here      */}
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button className={styles.footerButton} onClick={createRoom}>
            <img src="/images/celebration.png" alt="celebration" />
            <span>Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
