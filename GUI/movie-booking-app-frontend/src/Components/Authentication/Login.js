import React, { Fragment, useState } from 'react'
import axios from 'axios';

const Login = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = async (event) => {
        setShowResult(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "loginId": event.target.loginId.value,
            "password": event.target.password.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/Login', data)
        .then((response) => {
            setMessage("Authentication Successful");
        })
        .catch(error => {
            setMessage("Some Error Occured");
        });
    };

function Login() {
    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
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
                           <label>Password</label>
                        </td>
                        <td>
                            <input type='text' name='Password' placeholder='Password'></input>
                        </td>
                    </tr>
                </tbody>
            </table>  
            <input type='submit'>Login</input>  
        </form>
    )
}

export default Login;