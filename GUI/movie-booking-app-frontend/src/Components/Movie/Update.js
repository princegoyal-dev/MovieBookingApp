import React, { Fragment, useState } from 'react'
import axios from 'axios';

const Update = () => {

    const [message, setMessage] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = async (event) => {
        setShowResult(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "id": event.target.id.value,
            "namemovieName": event.target.movieName.value,
            "theaterName": event.target.theaterName.value,
            "numberOfTickets": event.target.numberOfTickets.value,
            "seatNumber": event.target.seatNumber.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/ticket/update', data)
            .then((response) => {
                setMessage("Ticket Updation Sucessful");
            })
            .catch(error => {
                setMessage("Ticket Updation failed");
            });
    };

    function Update() {
        return (
            <form onSubmit={handleSubmit}>
                <h1>Update Ticket</h1>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Booking Id</label>
                            </td>
                            <td>
                                <input type='text' name='id' placeholder='id'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Movie Name</label>
                            </td>
                            <td>
                                <input type='text' name='movieName' placeholder='movieName'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Theatre Name</label>
                            </td>
                            <td>
                                <input type='text' name='theatreName' placeholder='theatreName'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Number of Tickets</label>
                            </td>
                            <td>
                                <input type='number' name='numberOfTickets' placeholder='numberOfTickets'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Seat Number</label>
                            </td>
                            <td>
                                <input type='text' name='seatNumber' placeholder='seatNumber'></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type='submit'>Submit</input>
            </form>
        )
    }

    export default Login;