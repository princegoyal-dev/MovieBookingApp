import useStore from "../../StateStorage";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import image from "../Images/Home.png";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUnlockAlt,
  faSignOutAlt,
  faTicketAlt,
  faSearch,
  faEdit,
  faStore,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { storedUsername, removeValues } = useStore((state) => ({
    storedUsername: state.loginId,
    removeValues: state.removeValues,
  }));

  useEffect(() => {
    if (storedUsername === "") {
      navigate("/Login");
    }
    if(storedUsername == "MasterAdmin") {
      setIsAdmin(true);
    }
  });

  const forgotClicked = () => {
    navigate("/Forgot");
  };

  const logoutClicked = () => {
    removeValues();
    navigate("/Login");
  };

  const bookTicketClicked = () => {
    navigate("/BookTicket");
  };

  const searchMovieClicked = () => {
    navigate("/SearchMovie");
  };

  const updateTicketClicked = () => {
    navigate("/UpdateTicket");
  };

  const addMovieClicked = () => {
    navigate("/AddMovie");
  };

  // CSS styles
  const containerStyle = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${image});
    background-size: cover;
    background-position: center;
  `;

  const sectionContainerStyle = `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  `;

  const sectionTitleStyle = `
    font-size: 30px;
    color: #000;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  `;

  const buttonContainerStyle = `
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  `;

  const buttonStyle = `
    position: relative;
    padding: 20px 40px;
    font-size: 20px;
    color: #fff;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: linear-gradient(to right, #F25D50, #F9B1AD);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  `;

  const buttonHoverStyle = `
    transform: translateY(-3px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  `;

  const buttonTextWrapperStyle = `
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 10px;
    margin: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  `;

  const buttonHoverTextWrapperStyle = `
    opacity: 1;
  `;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

          .container { ${containerStyle} }
          .section-container { ${sectionContainerStyle} }
          .section-title { ${sectionTitleStyle} }
          .button-container { ${buttonContainerStyle} }
          .action-button { ${buttonStyle} }
          .action-button:hover { ${buttonHoverStyle} }
          .button-text-wrapper { ${buttonTextWrapperStyle} }
          .action-button:hover .button-text-wrapper { ${buttonHoverTextWrapperStyle} }
        `}
      </style>
      <div className="container">
        <div className="section-container">
          <h2 className="section-title">Account</h2>
          <div className="button-container">
            <button
              className="action-button"
              onClick={forgotClicked}
              value="ChangePassword"
            >
              <FontAwesomeIcon icon={faUnlockAlt} />
              <span className="button-text-wrapper">Change Password</span>
            </button>
            <button
              className="action-button"
              onClick={logoutClicked}
              value="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="button-text-wrapper">Logout</span>
            </button>
          </div>
        </div>
        <div className="section-container">
          <h2 className="section-title">Movies</h2>
          <div className="button-container">
            <button
              className="action-button"
              onClick={bookTicketClicked}
              value="BookTicket"
            >
              <FontAwesomeIcon icon={faTicketAlt} />
              <span className="button-text-wrapper">Book Ticket</span>
            </button>
            <button
              className="action-button"
              onClick={searchMovieClicked}
              value="SearchMovie"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="button-text-wrapper">Search Movie</span>
            </button>
            <button
              className="action-button"
              onClick={updateTicketClicked}
              value="UpdateTicket"
            >
              <FontAwesomeIcon icon={faEdit} />
              <span className="button-text-wrapper">Update Ticket</span>
            </button>
            {isAdmin && 
            <button
              className="action-button"
              onClick={addMovieClicked}
              value="AddMovie"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span className="button-text-wrapper">Add Movie</span>
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

