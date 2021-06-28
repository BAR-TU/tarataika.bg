import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';

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

const SearchResultsButton = () => {
    let history = useHistory(); 
    const handleClick = () => {
        history.push("/listingsresults");
    }   
    return (
        <li id="searchresults" onClick={ handleClick }> Търсене</li>
    );
}

const AccountButton = (props) => {
    let history = useHistory(); 
    
    const handleClick = () => {
      if(props.token !== '') {
        history.push("/login")
      } else {
        history.push("/account");
      }
    }   
    return (
        <li id="account" onClick={ handleClick }> Акаунт</li>
    );
}

const LoginBtn = (props) => {
    let history = useHistory(); 
    const handleClick = () => {
      axios.post('/api/users/login', {
        username: props.username,
        password: props.password
      }, {withCredentials: true}).then(() => {
        history.push('/account');
      }, (error) => {
        console.log(error);
      })
    }   
    return (
      <Button variant="outlined" color="primary" onClick={handleClick}>
      Вход
    </Button>
    );
  }
  const RegBtn = () => {
    let history = useHistory(); 
    const handleClick = () => {
     history.push("/register");
    }   
    return (
  <Button variant="outlined" color="primary" onClick={handleClick}>
          Регистрация
        </Button>
    );
  }

  const RegisterBtn = () => {
    let history = useHistory(); 
    const handleClick = () => {
     history.push("/login");
    }   
    return (
  <Button variant="outlined" color="primary" onClick={handleClick}>
          Регистрация
        </Button>
    );
  }

export { HomeButton, PublicButton, SearchResultsButton, AccountButton, LoginBtn, RegBtn, RegisterBtn };
