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

    return (
        <>
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
                                <input type='password' name='newPassword' placeholder='newPassword'></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type='submit'></input>
            </form>
            {showResult && message}
        </>
    )
}

export default Forgot;