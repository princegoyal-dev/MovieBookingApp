import React, { useState } from 'react'
import axios from 'axios';
import useStore from '../../StateStorage';

const SearchMovie = () => {

    const [message, setMessage] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const { storedJwtToken } = useStore(
        (state) => ({
            storedJwtToken: state.jwtToken
        })
    )

    const handleSubmit = async (event) => {
        setShowResult(false);
        setShowError(false);
        setMessage("");
        event.preventDefault();
        const data = {
            "movieName": event.target.movieName.value,
        }

        // event.target.reset();
        await axios.get('https://localhost:7222/api/MovieBooking/Movies/Search/MovieName?movieName=' + data["movieName"],
            {
                headers: {
                    'Authorization': 'Bearer ' + storedJwtToken,
                }
            })
            .then((response) => {
                for (let data in response.data) {
                    message.push(response.data[data]);
                }
                console.log(message);
                setShowResult(true);
            })
            .catch(error => {
                setErrorMessage("No Such Movies Found");
                setShowError(true);
            });
    };

    return (
        <>
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
                <input type='submit' value='Search'></input>
            </form>
            {/* {(showResult == true) &&
                <div>
                    {
                        message.map(e => {
                            <div>
                                {e.name}
                                {e.theatreName}
                                {e.isAvailable}
                            </div>
                        })}
                </div>
            } */}
            {showError == true && errorMessage}
        </>
    )
}

export default SearchMovie;