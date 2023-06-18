import React, { useState } from 'react'
import axios from 'axios';
import useStore from '../../StateStorage';

const Login = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const {storedUsername, addValues} = useStore(
        (state) => ({
            storedUsername: state.loginId,
            addValues: state.addValues
        })
    )
    
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
            "loginId": event.target.loginId.value,
            "password": event.target.password.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.get('https://localhost:7222/api/MovieBooking/Login?loginId=' + data["loginId"] + '&password=' + data["password"])
            .then((response) => {
                addValues(data["loginId"], response.data);
                setMessage("Login Successful");
            })
            .catch(error => {
                setMessage("Some Error Occured");
            });
    };
    return (
            <>
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
                                    <input type='password' name='password' placeholder='Password'></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type='submit' value='Login'></input>
                </form>
                {showResult && message}
            </>
    )
}

export default Login;