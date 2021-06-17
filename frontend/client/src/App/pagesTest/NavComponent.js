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

const PhotosButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/");
    }   
    return (
        <li onClick={ handleClick }> Снимки</li>
    );
}

const GearButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/");
    }   
    return (
        <li onClick={ handleClick }> Gear</li>
    );
}

const TriviaButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/trivia");
    }   
    return (
        <li id="trivia" onClick={ handleClick }> История</li>
    );
}

const TestCarButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/vehicletemplate");
    }   
    return (
        <li id="testcar" onClick={ handleClick }> TestCar</li>
    );
}

export { HomeButton, PublicButton, PhotosButton, GearButton, TriviaButton, TestCarButton };
