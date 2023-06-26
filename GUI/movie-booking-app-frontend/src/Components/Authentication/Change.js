import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import image from "../Images/Change.png";
import { useNavigate } from "react-router-dom";
import useStore from "../../StateStorage";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faHome } from "@fortawesome/free-solid-svg-icons";

const Change = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { storedUsername, storedJwtToken } = useStore((state) => ({
    storedUsername: state.loginId,
    storedJwtToken: state.jwtToken,
  }));
  useEffect(() => {
    if (storedUsername != "") {
      navigate("/Home");
    }
  });

  const handleSubmit = async (event) => {
    setShowResult(false);
    setMessage("");
    event.preventDefault();
    const data = {
      loginId: event.target.loginId.value,
      oldPassword: event.target.oldPassword.value,
      newPassword: event.target.newPassword.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .get(
        "https://localhost:7222/api/MovieBooking/" +
          data["loginId"] +
          "/changePassword?oldPassword=" +
          data["oldPassword"] +
          "&newPassword=" +
          data["newPassword"]
      )
      .then((response) => {
        setMessage("Password changed successfully");
      })
      .catch((error) => {
        setMessage("Some Error Occurred");
      });
  };
  const homeClicked = () => {
    navigate("/Home");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: "40px",
    borderRadius: "30px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 1)",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "29px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "25px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "20px",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "10px 30px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const homeStyle = {
    padding: "5px 20px",
    backgroundColor: "#1877f2",
    color: "white",
    border: "2px wavy black",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "2vh",
  };

  const messageStyle = {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>
            <FontAwesomeIcon icon={faLock} style={{ marginRight: "10px" }} />
            Change Password
          </h1>
          <input
            style={inputStyle}
            type="text"
            name="loginId"
            placeholder="loginId"
          />
          <input
            style={inputStyle}
            type="password"
            name="oldPassword"
            placeholder="oldPassword"
          />
          <input
            style={inputStyle}
            type="password"
            name="newPassword"
            placeholder="newPassword"
          />
          <button style={buttonStyle} type="submit">
          <FontAwesomeIcon icon={faLock} style={{ marginRight: "10px" }} />
            Change Password
          </button>
          <button
            onClick={homeClicked}
            style={homeStyle}
            type="button"
            value="homeButton"
          >
            <FontAwesomeIcon icon={faHome} />
          </button>
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
      </div>
    </>
  );
};

export default Change;
