import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../../StateStorage";
import image from "../Images/Forgot.png";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockAlt, faHome } from "@fortawesome/free-solid-svg-icons";

const Forgot = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { storedUsername, storedJwtToken } = useStore((state) => ({
    storedUsername: state.loginId,
    storedJwtToken: state.jwtToken,
  }));
  useEffect(() => {
    if (storedUsername == "") {
      navigate("/Login");
    }
  });

  const handleSubmit = async (event) => {
    setShowResult(false);
    setMessage("");
    event.preventDefault();
    const data = {
      loginId: storedUsername,
      newPassword: event.target.newPassword.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .get(
        "https://localhost:7222/api/MovieBooking/" +
          data["loginId"] +
          "/Forgot?newPassword=" +
          data["newPassword"],
        {
          headers: {
            Authorization: "Bearer " + storedJwtToken,
          },
        }
      )
      .then((response) => {
        setMessage("Password Reset Successful");
      })
      .catch((error) => {
        setMessage("Some Error Occured");
      });
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
    padding: "50px",
    borderRadius: "5px",
    marginLeft: "105vh",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 1)",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "20px",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 25px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
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
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "2vh",
  };

  const messageStyle = {
    marginTop: "6vh",
    marginLeft: "48vw",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  };

  const homeClicked = () => {
    navigate("/Home");
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>
            <FontAwesomeIcon icon={faUnlockAlt} style={{ marginRight: "10px" }} />
            Change Password
          </h1>
          <input
            style={inputStyle}
            type="password"
            name="newPassword"
            placeholder="New Password"
          />
          <button style={buttonStyle} type="submit">
          <FontAwesomeIcon icon={faUnlockAlt} style={{ marginRight: "10px" }} />
            Submit
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

export default Forgot;
