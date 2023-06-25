import React, { Fragment, useState } from "react";
import axios from "axios";
import useStore from "../../StateStorage";
import image from "../Images/Forgot.png";

const Forgot = () => {
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { storedJwtToken } = useStore((state) => ({
    storedJwtToken: state.jwtToken,
  }));

  const handleSubmit = async (event) => {
    setShowResult(false);
    setMessage("");
    event.preventDefault();
    const data = {
      loginId: event.target.loginId.value,
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
    borderRadius: "25px",
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
    borderRadius: "25px",
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
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const messageStyle = {
    marginTop: "6vh",
    marginLeft: "48vw",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>Forgot Password</h1>
          <input
            style={inputStyle}
            type="text"
            name="loginId"
            placeholder="loginId"
          />
          <input
            style={inputStyle}
            type="password"
            name="newPassword"
            placeholder="newPassword"
          />
          <button style={buttonStyle} type="submit">
            Reset Password
          </button>
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
      </div>
    </>
  );
};

export default Forgot;
