// import React, { useState } from 'react'
// import axios from 'axios';
// import useStore from '../../StateStorage';

// const Add = () => {

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
//             "name": event.target.name.value,
//             "theatreName": event.target.theatreName.value,
//             "ticketsAlloted": event.target.ticketsAlloted.value,
//             "ticketsBooked": event.target.ticketsBooked.value,
//         }
//         setShowResult(true);
//         // event.target.reset();
//         await axios.post('https://localhost:7222/api/MovieBooking/movie/add', data
//             ,
//             {
//                 headers: {
//                     'Authorization': 'Bearer ' + storedJwtToken,
//                 }
//             })
//             .then((response) => {
//                 setMessage("Movie Added Sucessfully");
//             })
//             .catch(error => {
//                 setMessage("Some Error Occured");
//             });
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <h1>Add Movies</h1>
//                 <br />
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <label>Name</label>
//                             </td>
//                             <td>
//                                 <input type='text' name='name' placeholder='name'></input>
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
//                                 <label>Tickets Alloted</label>
//                             </td>
//                             <td>
//                                 <input type='number' name='ticketsAlloted' placeholder='ticketsAlloted'></input>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label>Tickets Booked</label>
//                             </td>
//                             <td>
//                                 <input type='number' name='ticketsBooked' placeholder='ticketsBooked'></input>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <input type='submit' value='Add Movie'></input>
//             </form>
//             {showResult && message}
//         </>
//     )
// }

// export default Add;


import React, { useState } from "react";
import axios from "axios";
import useStore from "../../StateStorage";

const Add = () => {
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
      name: event.target.name.value,
      theatreName: event.target.theatreName.value,
      ticketsAlloted: event.target.ticketsAlloted.value,
      ticketsBooked: event.target.ticketsBooked.value,
    };
    setShowResult(true);
    // event.target.reset();
    await axios
      .post("https://localhost:7222/api/MovieBooking/movie/add", data, {
        headers: {
          Authorization: "Bearer " + storedJwtToken,
        },
      })
      .then((response) => {
        setMessage("Movie Added Sucessfully");
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
    backgroundImage: "url('background-image.jpg')",
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

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
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
          <h1 style={titleStyle}>Add Movies</h1>
          <br />
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    style={inputStyle}
                    placeholder="Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Theatre Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="theatreName"
                    style={inputStyle}
                    placeholder="Theatre Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Tickets Alloted</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="ticketsAlloted"
                    style={inputStyle}
                    placeholder="Tickets Alloted"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Tickets Booked</label>
                </td>
                <td>
                  <input
                    type="number"
                    name="ticketsBooked"
                    style={inputStyle}
                    placeholder="Tickets Booked"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="Add Movie" style={buttonStyle} />
        </form>
        {showResult && <p style={messageStyle}>{message}</p>}
      </div>
    </>
  );
};

export default Add;
