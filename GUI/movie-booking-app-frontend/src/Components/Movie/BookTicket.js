import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../../StateStorage";
import image from "../Images/BookTicket.png";
import { useNavigate } from "react-router-dom";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTicketAlt } from "@fortawesome/free-solid-svg-icons";

const BookTicket = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const { storedUsername, storedJwtToken } = useStore((state) => ({
    storedUsername: state.loginId,
    storedJwtToken: state.jwtToken,
  }));
  useEffect(() => {
    if (storedUsername === "") {
      navigate("/Login");
    }
  });

  const handleSubmit = async (event) => {
    setShowResult(false);
    setMessage("");
    event.preventDefault();
    const data = {
      movieName: event.target.movieName.value,
      theatreName: event.target.theatreName.value,
      numberOfTickets: event.target.numberOfTickets.value,
      seatNumber: event.target.seatNumber.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .post("https://localhost:7222/api/MovieBooking/ticket/bookticket", data, {
        headers: {
          Authorization: "Bearer " + storedJwtToken,
        },
      })
      .then((response) => {
        setMessage("Ticket Booking Successful");
      })
      .catch((error) => {
        setMessage("Ticket Booking Failed");
      });
  };

  const homeClicked = () => {
    navigate("/Home");
  };

  // CSS styles
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
    padding: "40px",
    borderRadius: "10px",
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
    // borderRadius: "25px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "20px",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const homeStyle = {
    padding: "5px 15px",
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
            <FontAwesomeIcon
              icon={faTicketAlt}
              style={{ marginRight: "10px" }}
            />
            Book Tickets
          </h1>
          <input
            style={inputStyle}
            type="text"
            name="movieName"
            placeholder="Movie Name"
          />
          <input
            style={inputStyle}
            type="text"
            name="theatreName"
            placeholder="Theatre Name"
          />
          <input
            style={inputStyle}
            type="number"
            name="numberOfTickets"
            placeholder="Number of Tickets"
          />
          <input
            style={inputStyle}
            type="text"
            name="seatNumber"
            placeholder="Seat Number"
          />
          <button style={buttonStyle} type="submit">
          <FontAwesomeIcon
              icon={faTicketAlt}
              style={{ marginRight: "10px" }}
            />
            Submit
          </button>
          <button onClick={homeClicked} style={homeStyle} type="button">
            <FontAwesomeIcon icon={faHome} />
          </button>
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
      </div>
    </>
  );
};

export default BookTicket;
