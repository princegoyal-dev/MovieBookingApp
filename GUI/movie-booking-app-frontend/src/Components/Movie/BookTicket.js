// import React, { useState } from 'react'
// import axios from 'axios';
// import useStore from '../../StateStorage';

// const BookTicket = () => {

//     const [message, setMessage] = useState("");
//     const [showResult, setShowResult] = useState(false);

//     const { storedJwtToken } = useStore(
//         (state) => ({
//             storedJwtToken: state.jwtToken
//         })
//     )

//     const handleSubmit = async (event) => {
//         setShowResult(false);
//         setMessage("");
//         event.preventDefault();
//         const data = {
//             "movieName": event.target.movieName.value,
//             "theatreName": event.target.theatreName.value,
//             "numberOfTickets": event.target.numberOfTickets.value,
//             "seatNumber": event.target.seatNumber.value,
//         }
//         setShowResult(true);
//         // event.target.reset();
//         await axios.post('https://localhost:7222/api/MovieBooking/ticket/bookticket', data,
//             {
//                 headers: {
//                     'Authorization': 'Bearer ' + storedJwtToken,
//                 }
//             })
//             .then((response) => {
//                 setMessage("Ticket Booking Successful");
//             })
//             .catch(error => {
//                 setMessage("Ticket Booking Failed");
//             });
//     };
//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <h1>Book Tickets</h1>
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
//                         <tr>
//                             <td>
//                                 <label>Theatre Name</label>
//                             </td>
//                             <td>
//                                 <input type='text' name='theatreName' placeholder='theatreName'></input>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label>Number of Tickets</label>
//                             </td>
//                             <td>
//                                 <input type='number' name='numberOfTickets' placeholder='numberOfTickets'></input>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label>Seat Number</label>
//                             </td>
//                             <td>
//                                 <input type='text' name='seatNumber' placeholder='seatNumber'></input>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <input type='submit' value='Book Ticket'></input>
//             </form>
//             {showResult && message}
//         </>
//     )
// }

// export default BookTicket;


import React, { useState } from "react";
import axios from "axios";
import useStore from "../../StateStorage";

const BookTicket = () => {
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
  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>Book Tickets</h1>
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
            Book Ticket
          </button>
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
      </div>
    </>
  );
};

export default BookTicket;