import React, { Fragment, useState } from 'react'
import axios from 'axios';

const changePassword = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = async (event) => {
        setShowResult(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "loginId": event.target.loginId.value,
            "oldPassword": event.target.oldPassword.value,
            "newPassword": event.target.newPassword.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/{loginId}/changePassword', data)
        .then((response) => {
            setMessage("Password changed successfully");
        })
        .catch(error => {
            setMessage("Some Error Occured");
        });
    };

function changePassword() {
    return (
        <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
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
                           <label>oldPassword</label>
                        </td>
                        <td>
                            <input type='text' name='oldPassword' placeholder='oldPassword'></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                           <label>newPassword</label>
                        </td>
                        <td>
                            <input type='text' name='newPassword' placeholder='newPassword'></input>
                        </td>
                    </tr>
                </tbody>
            </table>  
            <input type='submit'>Change Password</input>  
        </form>
    )
}

export default Login;