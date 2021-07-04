import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Account() {
    const [data, setData] = useState();
    const [loggedIn, setLoggedIn] = useState();
    let history = useHistory();

    const getUserInfo = () => {
        axios.get('/api/users/profile').then((res) =>  {
            if (res.data.username) {
                setData(res.data.username);
                sessionStorage.setItem('loggedIn', 'true');
                setLoggedIn(true);
                sessionStorage.setItem('user', JSON.stringify(res.data));
            }
        });
    }
    
    const logout = () => {
        axios.post('api/users/logout').then((res) => {
            sessionStorage.setItem('loggedIn', 'false');
            sessionStorage.removeItem('user');
            setData(res.data);
            setLoggedIn(false);
            history.push({
                pathname: '/login',
                search: '',
                state: { response: res.data }
            });
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
            <div>{ data }</div>
            { loggedIn ? 
            <input id="logoutbtn" type="button" onClick={logout} value="Изход" ></input>
            : <div></div> }
        </main>
    );
}

export default Account;