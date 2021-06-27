import React, { useEffect } from 'react';
import Login from './Login';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
import Register from './Register';

function Account() {
    useEffect(() => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("account");
        toSelect.className = "selected";
    });
    return (
            <main>
            <Login/>
            </main>
    );
}

export default Account;