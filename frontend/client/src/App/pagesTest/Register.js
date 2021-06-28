import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { RegisterBtn } from './NavComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function Register() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const usernameChange = (e) => {
    setUsername(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const phoneNumberChange = (e) => {
    setPhone(e.target.value);
  }

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  useEffect(() => {
    var selected = document.getElementsByClassName("selected");
    selected[0].className = "";
    var toSelect = document.getElementById("account");
    toSelect.className = "selected";
});
  
  return (
      <main>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-username-input"
              label="Потребителско име"
              type="text"
              autoComplete="current-username"
              value={ username }
              onChange={ usernameChange }
            />
            <TextField
              id="standard-password-input"
              label="Парола"
              type="password"
              autoComplete="current-password"
              value={ password }
              onChange={ passwordChange }
            />
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              value={ email }
              onChange={ emailChange }
            />
            <TextField
              id="standard-password-input"
              label="Тел. Номер"
              type="phone_number"
              autoComplete="current-phone_number"
              value={ phone_number }
              onChange={ phoneNumberChange }
            />
          </div>
          <div className={classes.root}>
            <RegisterBtn username={username} password={password} phone_number={phone_number} email={email}/>
         </div>
        </form>
      </main>
  );
}

export default Register;