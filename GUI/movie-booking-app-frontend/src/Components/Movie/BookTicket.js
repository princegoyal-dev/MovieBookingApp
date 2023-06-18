import React, { useState } from 'react'
import axios from 'axios';
import useStore from '../../StateStorage';

const BookTicket = () => {

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
            "movieName": event.target.movieName.value,
            "theatreName": event.target.theatreName.value,
            "numberOfTickets": event.target.numberOfTickets.value,
            "seatNumber": event.target.seatNumber.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/ticket/bookticket', data,
            {
                headers: {
                    'Authorization': 'Bearer ' + storedJwtToken,
                }
            })
            .then((response) => {
                setMessage("Ticket Booking Successful");
            })
            .catch(error => {
                setMessage("Ticket Booking Failed");
            });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Book Tickets</h1>
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
                <input type='submit' value='Book Ticket'></input>
            </form>
            {showResult && message}
        </>
    )
}

export default BookTicket;