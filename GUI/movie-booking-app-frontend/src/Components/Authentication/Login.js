import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../../StateStorage";
import image from "../Images/login.png";
import Forgot from "./Forgot";
import { useNavigate } from "react-router-dom";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faQuestionCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { storedUsername, addValues } = useStore((state) => ({
    storedUsername: state.loginId,
    addValues: state.addValues,
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
      password: event.target.password.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .get(
        "https://localhost:7222/api/MovieBooking/Login?loginId=" +
          data["loginId"] +
          "&password=" +
          data["password"]
      )
      .then((response) => {
        addValues(data["loginId"], response.data);
        setMessage("Login Successful");
      })
      .catch((error) => {
        setMessage("Login Failed");
      });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
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
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: "50px",
    marginRight: "19vh",
    borderRadius: "30px",
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
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "11px 38px",
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const forgotPassword = {
    marginTop: "2vh",
    cursor: "pointer",
    textDecoration: "underline",
    color: "#1877f2",
  };

  const registerNow = {
    marginTop: "3vh",
    marginLeft: "1vw",
    padding: "15px 40px",
    backgroundColor: "#42b72a",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const messageStyle = {
    marginTop: "20px",
    marginRight: "19vw",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  };

  const footerStyle = {
    marginTop: "20px",
    marginRight: "185px",
    color: "#777",
    fontSize: "12px",
    textAlign: "center",
  };

  const changePasswordClicked = () => {
    navigate("/Change");
  };

  const registerClicked = () => {
    navigate("/Register");
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>
            
            Login
          </h1>
          <input
            style={inputStyle}
            type="text"
            name="loginId"
            placeholder="Login ID"
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button style={buttonStyle} type="submit" value="Login">
          <FontAwesomeIcon icon={faKey} style={{ marginRight: "7px" }} />
            Login
          </button>
          <a style={forgotPassword} onClick={changePasswordClicked}>
            <FontAwesomeIcon icon={faQuestionCircle} style={{ marginRight: "5px" }} />
            Update password?
          </a>
          <button
            onClick={registerClicked}
            style={registerNow}
            value="Register"
          >
            <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "5px" }} />
            Create New Account
          </button>
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
        <p style={footerStyle}>
          © 2023 Movie Booking App. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Login;
