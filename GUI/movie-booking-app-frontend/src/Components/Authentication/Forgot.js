// import React, { Fragment, useState } from 'react'
// import axios from 'axios';
// import useStore from '../../StateStorage';

// const Forgot = () => {

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
//             "loginId": event.target.loginId.value,
//             "newPassword": event.target.newPassword.value,
//         }
//         setShowResult(true);
//         // event.target.reset();
//         await axios.get('https://localhost:7222/api/MovieBooking/' + data["loginId"] + '/Forgot?newPassword=' + data["newPassword"],
//             {
//                 headers: {
//                     'Authorization': 'Bearer ' + storedJwtToken,
//                 }
//             })
//             .then((response) => {
//                 setMessage("Password Reset Successful");
//             })
//             .catch(error => {
//                 setMessage("Some Error Occured");
//             });
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <h1>Forgot Password</h1>
//                 <br />
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td>
//                                 <label>loginId</label>
//                             </td>
//                             <td>
//                                 <input type='text' name='loginId' placeholder='loginId'></input>
//                             </td>
//                         </tr>
//                         <tr>
//                             <td>
//                                 <label>New Password</label>
//                             </td>
//                             <td>
//                                 <input type='password' name='newPassword' placeholder='newPassword'></input>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <input type='submit'></input>
//             </form>
//             {showResult && message}
//         </>
//     )
// }

// export default Forgot;


import React, { Fragment, useState } from 'react'
import axios from 'axios';
import useStore from '../../StateStorage';

const Forgot = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const { storedJwtToken } = useStore(
        (state) => ({
            storedJwtToken: state.jwtToken
        })
    )

    const handleSubmit = async (event) => {
        setShowResult(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "loginId": event.target.loginId.value,
            "newPassword": event.target.newPassword.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.get('https://localhost:7222/api/MovieBooking/' + data["loginId"] + '/Forgot?newPassword=' + data["newPassword"],
            {
                headers: {
                    'Authorization': 'Bearer ' + storedJwtToken,
                }
            })
            .then((response) => {
                setMessage("Password Reset Successful");
            })
            .catch(error => {
                setMessage("Some Error Occured");
            });
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: "url('background-image.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };
    
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '40px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    };
    
    const titleStyle = {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
    };
    
    const inputStyle = {
        padding: '10px',
        borderRadius: '3px',
        border: '1px solid #ccc',
        width: '300px',
        marginBottom: '20px',
        fontSize: '14px',
    };
    
    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    };
    
    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    };
    
    const messageStyle = {
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#4caf50',
    };

    return (
        <>
            <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
            <h1 style={titleStyle}>Forgot Password</h1>
            <input style={inputStyle} type="text" name="loginId" placeholder="loginId" />
            <input style={inputStyle} type="password" name="newPassword" placeholder="newPassword" />
            <button style={buttonStyle} type="submit">
            Reset Password
            </button>
            </form>
            {showResult && <p style={messageStyle}>{message}</p>}
            </div>
        </>
    );
};

export default Forgot;