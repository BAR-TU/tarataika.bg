import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { RegisterBtn } from './NavComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

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


const Register = () => {
  const classes = useStyles();

  useEffect(() => {
    var selected = document.getElementsByClassName("selected");
    selected[0].className = "";
    var toSelect = document.getElementById("account");
    toSelect.className = "selected";
});

  return (
    <Router>
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-username-input"
          label="Потребителско име"
          type="text"
          autoComplete="current-username"
        />
        <TextField
          id="standard-password-input"
          label="Парола"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
        />
        <TextField
          id="standard-password-input"
          label="Тел. Номер"
          type="phone_number"
          autoComplete="current-phone_number"
        />
      </div>
      <div className={classes.root}>
        <RegisterBtn/>
    </div>
    </form>
      <Switch>
      <Route path="/"></Route>
  </Switch>
</Router>
  );
}

export default Register;