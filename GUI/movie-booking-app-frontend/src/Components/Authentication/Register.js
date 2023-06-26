import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../Images/Register.png";
import { useNavigate } from "react-router-dom";
import useStore from "../../StateStorage";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faHome } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
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
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      loginId: event.target.loginId.value,
      password: event.target.password.value,
      contact: event.target.contactNo.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .post("https://localhost:7222/api/MovieBooking/Register", data)
      .then((response) => {
        setMessage("User Created Successfully");
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "30px",
    borderRadius: "25px",
    marginRight: "20vh",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 1)",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "25px",
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
    padding: "14px 40px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "17px",
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
    marginRight: "20vh",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>
            <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "10px" }} />
            Register Page
          </h1>
          <input
            style={inputStyle}
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <input
            style={inputStyle}
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            style={inputStyle}
            type="text"
            name="loginId"
            placeholder="Username"
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            style={inputStyle}
            type="text"
            name="contactNo"
            placeholder="Contact No."
          />
          <button style={buttonStyle} type="submit">
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "10px" }} />
            Register
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

export default Register;
