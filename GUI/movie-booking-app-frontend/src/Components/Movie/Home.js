import useStore from "../../StateStorage";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Home = () => {
    let navigate = useNavigate();
    const { storedUsername, removeValues } = useStore((state) => ({
        storedUsername: state.loginId,
        removeValues: state.removeValues,
    }));

    useEffect(() => {
        if (storedUsername == "") {
            navigate('/Login');
        }
    });
    const forgotClicked = () => {
        navigate('/Forgot');
    }
    const logoutClicked = () => {
        removeValues();
        navigate('/Login');
    }
    const bookTicketClicked = () => {
        navigate('/BookTicket');
    }
    const searchMovieClicked = () => {
        navigate('/SearchMovie');
    }
    const updateTicketClicked = () => {
        navigate('/UpdateTicket');
    }
    return(
        <>
        <button onClick={forgotClicked} type="button" value="ChangePassword">
            Change Password
        </button>
        <button onClick={logoutClicked} type="button" value="Logout">
            Logout
        </button>
        <button onClick={bookTicketClicked} type="button" value="BookTicket">
            Book Ticket
        </button>       
        <button onClick={searchMovieClicked} type="button" value="SearchMovie">
            Search Movie
        </button>
        <button onClick={updateTicketClicked} type="button" value="UpdateTicket">
            Update Ticket
        </button>
        </>
    )
};

export default Home;