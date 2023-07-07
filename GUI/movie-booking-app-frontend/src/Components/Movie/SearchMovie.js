import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../../StateStorage";
import image from "../Images/SearchMovie.png";
import { useNavigate } from "react-router-dom";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchMovie = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

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
    setShowError(false);
    setMessage([]);
    event.preventDefault();
    const data = {
      movieName: event.target.movieName.value,
    };

    await axios
      .get(
        "https://localhost:7222/api/MovieBooking/Movies/Search/MovieName?movieName=" +
          data["movieName"],
        {
          headers: {
            Authorization: "Bearer " + storedJwtToken,
          },
        }
      )
      .then((response) => {
        const movies = response.data;
        if (movies.length > 0) {
          setMessage(movies);
          setSelectedMovie(movies[0]);
          setShowResult(true);
          setShowError(false);
        } else {
          setErrorMessage("No Such Movies Found");
          setShowError(true);
        }
      })
      .catch((error) => {
        setErrorMessage("An Error Occurred");
        setShowError(true);
      });
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "40px",
    marginLeft: "56vw",
    // marginTop: "15vh",
    borderRadius: "5px",
    boxShadow: "1 2px 4px rgba(0, 0, 0, 1)",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "24px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 40px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const homeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  const iconStyle = {
    marginRight: "10px",
  };

  const dropdownStyle = {
    padding: "10px 15px",
    width: "300px",
    marginBottom: "2vh",
    fontSize: "14px",
    borderRadius: "5px",
    
  };

  const movieDetailsStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "5px",
    marginTop: "5vh",
    marginLeft: "56vw",
    textAlign: "center",

  };

  const movieTitleStyle = {
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
    
  };

  const errorStyle = {
    marginTop: "20px",
    marginLeft: "54vw",
    fontSize: "18px",
    fontWeight: "bold",
    color: "red",
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>Search Movies</h1>
          <input
            style={inputStyle}
            type="text"
            name="movieName"
            placeholder="Movie Name"
          />
          <button style={buttonStyle} type="submit">
            <FontAwesomeIcon icon={faSearch} style={iconStyle} />
            Search
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
        {showResult && (
          <div style={movieDetailsStyle}>
            <select
              style={dropdownStyle}
              value={selectedMovie}
              onChange={(e) =>
                handleMovieSelect(
                  message.find((movie) => movie.name === e.target.value)
                )
              }
            >
              {message.map((movie) => (
                <option key={movie.name} value={movie.name}>
                {movie.name} 
                </option>
              ))}
            </select>
            {selectedMovie && (
              <>
                <h2 style={movieTitleStyle}>Movie Name: {selectedMovie.name}</h2>
                <h3>Theater Name: {selectedMovie.theatreName}</h3>
                <h3>
                  Tickets Available:{" "}
                  {selectedMovie.isAvailable ? "YES" : "NO"}
                </h3>
              </>
            )}
          </div>
        )}
        {showError && <p style={errorStyle}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default SearchMovie;
