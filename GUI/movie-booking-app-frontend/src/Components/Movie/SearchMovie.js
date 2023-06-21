// import React, { useState } from 'react'
// import axios from 'axios';
// import useStore from '../../StateStorage';

// const SearchMovie = () => {

//     const [message, setMessage] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [showError, setShowError] = useState(false);

//     const { storedJwtToken } = useStore(
//         (state) => ({
//             storedJwtToken: state.jwtToken
//         })
//     )

//     const handleSubmit = async (event) => {
//         setShowResult(false);
//         setShowError(false);
//         setMessage("");
//         event.preventDefault();
//         const data = {
//             "movieName": event.target.movieName.value,
//         }

//         // event.target.reset();
//         await axios.get('https://localhost:7222/api/MovieBooking/Movies/Search/MovieName?movieName=' + data["movieName"],
//             {
//                 headers: {
//                     'Authorization': 'Bearer ' + storedJwtToken,
//                 }
//             })
//             .then((response) => {
//                 for (let data in response.data) {
//                     message.push(response.data[data]);
//                 }
//                 console.log(message);
//                 setShowResult(true);
//             })
//             .catch(error => {
//                 setErrorMessage("No Such Movies Found");
//                 setShowError(true);
//             });
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <h1>Search Movies</h1>
//                 <br />
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <label>Movie Name</label>
//                             </td>
//                             <td>
//                                 <input type='text' name='movieName' placeholder='movieName'></input>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <input type='submit' value='Search'></input>
//             </form>
//             {/* {(showResult == true) &&
//                 <div>
//                     {
//                         message.map(e => {
//                             <div>
//                                 {e.name}
//                                 {e.theatreName}
//                                 {e.isAvailable}
//                             </div>
//                         })}
//                 </div>
//             } */}
//             {showError == true && errorMessage}
//         </>
//     )
// }

// export default SearchMovie;


import React, { useState } from "react";
import axios from "axios";
import useStore from "../../StateStorage";

const SearchMovie = () => {
  const [message, setMessage] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const { storedJwtToken } = useStore((state) => ({
    storedJwtToken: state.jwtToken,
  }));

  const handleSubmit = async (event) => {
    setShowResult(false);
    setShowError(false);
    setMessage("");
    event.preventDefault();
    const data = {
      movieName: event.target.movieName.value,
    };

    // event.target.reset();
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
        for (let data in response.data) {
          message.push(response.data[data]);
        }
        console.log(message);
        setShowResult(true);
      })
      .catch((error) => {
        setErrorMessage("No Such Movies Found");
        setShowError(true);
      });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "40px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    width: "300px",
    marginBottom: "20px",
    fontSize: "14px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const messageStyle = {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4caf50",
  };

  const errorStyle = {
    marginTop: "20px",
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
            Search
          </button>
        </form>
        {showResult && (
          <div>
            {message.map((e) => (
              <div key={e.id}>
                {e.name}
                {e.theatreName}
                {e.isAvailable}
              </div>
            ))}
          </div>
        )}
        {showError && <p style={errorStyle}>{errorMessage}</p>}
      </div>
    </>
  );
};

export default SearchMovie;