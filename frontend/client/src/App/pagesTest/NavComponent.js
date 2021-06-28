import React, { useState } from 'react';
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

const AccountButton = () => {
    let history = useHistory(); 
    
    const handleClick = () => {
      if(sessionStorage.getItem('loggedIn') !== 'true') {
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
      }, {withCredentials: true}).then((res) => {
        if (res.status === 200) { 
          history.push({
          pathname: '/account',
          search: '',
          state: { username: props.username }
        });
        }
      }, (error) => {
        console.log(error);
        history.push('/login')
      });
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

  const RegisterBtn = (props) => {
    let history = useHistory();
    const [respond, setRespond] = useState('');
    
    const handleClick = () => {
      axios.post('/api/users/register', {
        username: props.username,
        password: props.password,
        phone_number: props.phone_number,
        email: props.email
      }).then((res) => {
        console.log(res);
        history.push({
          pathname: '/login',
          search: '',
          state: { response: res.data }
        });
      }
    ).catch(
      function (error) {
        setRespond('Неуспешна регистрация!');
      });
  }
    return (
      <div>
  <Button variant="outlined" color="primary" onClick={handleClick}>
          Регистрация
        </Button>
        <div>{respond}</div>
        </div>
    );
  }

export { HomeButton, PublicButton, SearchResultsButton, AccountButton, LoginBtn, RegBtn, RegisterBtn };
