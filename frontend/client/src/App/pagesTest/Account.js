import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    }
}));

function Account() {
    const [data, setData] = useState({
        id: '',
        username: '',
        password: '',
        phone_number: '',
        email: '',
        role: ''
    });
    const [loggedIn, setLoggedIn] = useState();
    let history = useHistory();
    const classes = useStyles();

    const getUserInfo = () => {
        axios.get('/api/users/profile').then((res) =>  {
            if (res.data.username) {
                setData({
                    id: res.data.id,
                    username: res.data.username,
                    phone_number: res.data.phone_number,
                    email: res.data.email    
                });
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

    const redirectToMyListings = () => {
        history.push('/editlistings');
    }

    useEffect(() => {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("account");
        toSelect.className = "selected";
        getUserInfo()
    }, []);
    return (
        <main>
            <div className="userInfo">
                <div style={{position: "relative", display: "block"}}>{ data.username }</div>
                <div style={{position: "relative", display: "block"}}>{ data.phone_number }</div>
                <div style={{position: "relative", display: "block"}}>{ data.email }</div>
                { loggedIn ? 
                <div className={classes.root}>
                <Button variant="contained" color="primary" onClick={redirectToMyListings}>
                    Редакция на моите обяви
                </Button>
                <Button variant="contained" color="secondary" onClick={logout}>
                    Изход
                </Button>
            </div>
                : <div></div> }
                
            </div>
        </main>
    );
}

export default Account;