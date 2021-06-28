import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { LoginBtn, RegBtn } from './NavComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Register from './Register';

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


function Login() {
  const classes = useStyles();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const usernameChange = (e) => {
    setUsername(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  useEffect(() => {
    var selected = document.getElementsByClassName("selected");
    selected[0].className = "";
    var toSelect = document.getElementById("account");
    toSelect.className = "selected";

    if (location.state !== undefined) {
      setResponse(location.state.response);
    } else {
      setResponse('');
    }
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
        </div>
        <div className={classes.root}>
          <RegBtn/>
          <LoginBtn username={username} password={password}/>
      </div>
      </form>
      <div>{response}</div>
    </main>
  );
}

export default Login