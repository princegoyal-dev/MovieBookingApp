import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = async (event) => {
        setShowResult(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "firstName": event.target.firstName.value,
            "lastName": event.target.lastName.value,
            "email": event.target.email.value,
            "loginId": event.target.loginId.value,
            "password": event.target.password.value,
            "contact": event.target.contactNo.value
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/Register', data)
        .then((response) => {
            setMessage("User Created Successfully");
        })
        .catch(error => {
            setMessage("Some Error Occured");
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Register Page</h1>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>First Name</label>
                            </td>
                            <td>
                                <input type='text' name='firstName' placeholder='first name'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Last Name</label>
                            </td>
                            <td>
                                <input type='text' name='lastName' placeholder='last name'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Email</label>
                            </td>
                            <td>
                                <input type='email' name='email' placeholder='email'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Username</label>
                            </td>
                            <td>
                                <input type='text' name='loginId' placeholder='loginid'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Password</label>
                            </td>
                            <td>
                                <input type='password' name='password' placeholder='password'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Contact No.</label>
                            </td>
                            <td>
                                <input type='text' name='contactNo' placeholder='ContactNo.'></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type='submit' value='Register'></input>
            </form>
            {showResult && message}
        </>
    )
}

export default Register;