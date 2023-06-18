import React, { useState } from 'react'
import axios from 'axios';
import useStore from '../../StateStorage';

const Add = () => {

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
            "name": event.target.name.value,
            "theatreName": event.target.theatreName.value,
            "ticketsAlloted": event.target.ticketsAlloted.value,
            "ticketsBooked": event.target.ticketsBooked.value,
        }
        setShowResult(true);
        // event.target.reset();
        await axios.post('https://localhost:7222/api/MovieBooking/movie/add', data
            ,
            {
                headers: {
                    'Authorization': 'Bearer ' + storedJwtToken,
                }
            })
            .then((response) => {
                setMessage("Movie Added Sucessfully");
            })
            .catch(error => {
                setMessage("Some Error Occured");
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Add Movies</h1>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Name</label>
                            </td>
                            <td>
                                <input type='text' name='name' placeholder='name'></input>
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
                                <label>Tickets Alloted</label>
                            </td>
                            <td>
                                <input type='number' name='ticketsAlloted' placeholder='ticketsAlloted'></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Tickets Booked</label>
                            </td>
                            <td>
                                <input type='number' name='ticketsBooked' placeholder='ticketsBooked'></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type='submit' value='Add Movie'></input>
            </form>
            {showResult && message}
        </>
    )
}

export default Add;