import React from 'react';
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


const Login = () => {
  const classes = useStyles();

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
      </div>
      <div className={classes.root}>
        <RegBtn/>
        <LoginBtn/>
    </div>
    </form>
      <Switch>
      <Route path="/register"><Register /></Route>
      </Switch>
</Router>
  );
}

export default Login