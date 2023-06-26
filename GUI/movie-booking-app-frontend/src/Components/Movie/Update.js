import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import useStore from "../../StateStorage";
import image from "../Images/Update.png";
import { useNavigate } from "react-router-dom";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHome } from "@fortawesome/free-solid-svg-icons";

const Update = () => {
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
      id: event.target.id.value,
      namemovieName: event.target.movieName.value,
      theaterName: event.target.theaterName.value,
      numberOfTickets: event.target.numberOfTickets.value,
      seatNumber: event.target.seatNumber.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .post("https://localhost:7222/api/MovieBooking/ticket/update", data)
      .then((response) => {
        setMessage("Ticket Updation Successful");
      })
      .catch((error) => {
        setMessage("Ticket Updation Failed");
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
    padding: "20px",
    borderRadius: "20px",
    marginRight: "100vh",
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
    borderRadius: "20px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "20px",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 50px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "20px",
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
            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "10px" }} />
            Update Ticket
          </h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Booking Id</label>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    type="text"
                    name="id"
                    placeholder="Booking Id"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Movie Name</label>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    type="text"
                    name="movieName"
                    placeholder="Movie Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Theatre Name</label>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    type="text"
                    name="theatreName"
                    placeholder="Theatre Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Number of Tickets</label>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    type="number"
                    name="numberOfTickets"
                    placeholder="Number of Tickets"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Seat Number</label>
                </td>
                <td>
                  <input
                    style={inputStyle}
                    type="text"
                    name="seatNumber"
                    placeholder="Seat Number"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input style={buttonStyle} type="submit" value="Submit" />
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

export default Update;
