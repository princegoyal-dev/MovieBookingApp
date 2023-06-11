import React, { Fragment, useState } from 'react'
import axios from 'axios';

const Forgot = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

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
        await axios.post('https://localhost:7222/api/MovieBooking/{loginId}/Forgot', data)
        .then((response) => {
            setMessage("Password Reset Successful");
        })
        .catch(error => {
            setMessage("Some Error Occured");
        });
    };

function Forgot() {
    return (
        <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>loginId</label>
                        </td>
                        <td>
                            <input type='text' name='loginId' placeholder='loginId'></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <label>New Password</label>
                        </td>
                        <td>
                            <input type='text' name='newPassword' placeholder='newPassword'></input>
                        </td>
                    </tr>
                </tbody>
            </table>  
            <input type='submit'>Submit</input>  
        </form>
    )
}

export default Forgot;