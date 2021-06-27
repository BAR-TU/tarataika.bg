import React from 'react';
import { useHistory } from "react-router-dom";

const HomeButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
     history.push("/");
    }   
    return (
       <li className="selected" id="home" onClick={ handleClick }> Начало</li>
    );
}

const PublicButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/");
    }   
    return (
        <li onClick={ handleClick }> Публикуване</li>
    );
}

const SearchResultsButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/listingsresults");
    }   
    return (
        <li id="searchresults" onClick={ handleClick }> Търсене</li>
    );
}

const AccountButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/account");
    }   
    return (
        <li id="trivia" onClick={ handleClick }> Акаунт</li>
    );
}

export { HomeButton, PublicButton, SearchResultsButton, AccountButton };
