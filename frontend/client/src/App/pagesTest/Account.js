import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Account() {
    const [data, setData] = useState();

    const getUserInfo = () => {
        axios.get('/api/users/profile').then((res) =>  {
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('user', JSON.stringify(res.data));
            setData(res.data.username);
        });
    }
    
    const logout = () => {
        sessionStorage.setItem('loggedIn', 'false');
        sessionStorage.removeItem('user');
        axios.post('api/users/logout').then((res) => {
            setData(res.data);
        })
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
            <input type="button" onClick={logout} value="Изход"></input>
        </main>
    );
}

export default Account;