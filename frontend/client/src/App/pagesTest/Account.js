import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';

function Account() {
    const [data, setData] = useState();

    const getUserInfo = () => {
        axios.get('/api/users/profile').then((res) =>  {
            setData(res.data.username);
            console.log(res.data.username);
        });
    }
    useEffect(() => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("account");
        toSelect.className = "selected";
        getUserInfo()
    });
    return (
        <main>
            <div>{ data } </div>
        </main>
    );
}

export default Account;