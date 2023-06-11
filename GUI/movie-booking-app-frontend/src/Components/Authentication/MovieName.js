import React, { Fragment, useState } from 'react'
import axios from 'axios';

const MovieName = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = async (event) => {
        setShowResult(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "name": event.target.name.value,
            "theaterName": event.target.theaterName.value,
            "isAvailable": event.target.isAvailable.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/Movies/Search/MovieName', data)
        .then((response) => {
            setMessage("{name}, {theaterName}, {isAvailable}");
        })
        .catch(error => {
            setMessage("Some Error Occured");
        });
    };

function MovieName() {
    return (
        <form onSubmit={handleSubmit}>
            <h1>Search Movies</h1>
            <br />
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Movie Name</label>
                        </td>
                        <td>
                            <input type='text' name='movieName' placeholder='movieName'></input>
                        </td>
                    </tr>
                </tbody>
            </table>  
            <input type='submit'>Search</input>  
        </form>
    )
}

export default Login;