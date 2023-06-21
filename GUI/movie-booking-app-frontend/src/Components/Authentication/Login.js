// import React, { useState } from 'react'
// import axios from 'axios';
// import useStore from '../../StateStorage';

// const Login = () => {

//     const [message, setMessage] = useState("");
//     const [showResult, setShowResult] = useState(false);

//     const {storedUsername, addValues} = useStore(
//         (state) => ({
//             storedUsername: state.loginId,
//             addValues: state.addValues
//         })
//     )

//     // useEffect(() => {
//     //     // console.log("LoginPage: " + storedUsername);
//     //     if(storedUsername != "") {
//     //         navigate('/Home')
//     //     }
//     // });

//     const handleSubmit = async (event) => {
//         setShowResult(false);
//         setMessage("");
//         event.preventDefault();
//         const data = {
//             "loginId": event.target.loginId.value,
//             "password": event.target.password.value,
//         }
//         setShowResult(true);
//         // event.target.reset();
//         await axios.get('https://localhost:7222/api/MovieBooking/Login?loginId=' + data["loginId"] + '&password=' + data["password"])
//             .then((response) => {
//                 addValues(data["loginId"], response.data);
//                 setMessage("Login Successful");
//             })
//             .catch(error => {
//                 setMessage("Some Error Occured");
//             });
//     };
//     return (
//             <>
//                 <form onSubmit={handleSubmit}>
//                     <h1>Login Page</h1>
//                     <br />
//                     <table>
//                         <tbody>
//                             <tr>
//                                 <td>
//                                     <label>loginId</label>
//                                 </td>
//                                 <td>
//                                     <input type='text' name='loginId' placeholder='loginId'></input>
//                                 </td>
//                             </tr>
//                             <tr>
//                                 <td>
//                                     <label>Password</label>
//                                 </td>
//                                 <td>
//                                     <input type='password' name='password' placeholder='Password'></input>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     <input type='submit' value='Login'></input>
//                 </form>
//                 {showResult && message}
//             </>
//     )
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import useStore from "../../StateStorage";

const Login = () => {
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { storedUsername, addValues } = useStore((state) => ({
    storedUsername: state.loginId,
    addValues: state.addValues,
  }));

  // useEffect(() => {
  //     // console.log("LoginPage: " + storedUsername);
  //     if(storedUsername != "") {
  //         navigate('/Home')
  //     }
  // });

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
        setMessage("Some Error Occured");
      });
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage:
      "url('https://img.freepik.com/free-photo/videotape-with-3d-glasses-cinema-menu_23-2148133565.jpg?w=996&t=st=1687374016~exp=1687374616~hmac=1b4527361db7855b0832211ade1733898220955d3489e2876cbe8fa9a15cfeb1')",
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

  const footerStyle = {
    marginTop: "20px",
    color: "#777",
    fontSize: "12px",
    textAlign: "center",
  };

  return (
    <>
      <div style={containerStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <h1 style={titleStyle}>Login</h1>
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
            Login
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
