import React, { useState } from "react";
import axios from "axios";
import image from "../Images/Register.png"

const Register = () => {
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

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
    padding: "15px 60px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
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
          <h1 style={titleStyle}>Register Page</h1>
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
            Register
          </button>
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
      </div>
    </>
  );
};

export default Register;
