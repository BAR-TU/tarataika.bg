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
        if(sessionStorage.getItem("loggedIn") === "true"){
          history.push("/publish");
        } else {
          alert("Влезте в своя профил!");
        }
    }   
    return (
        <li id="publish" onClick={ handleClick }> Публикуване</li>
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
    const [error, setError] = useState();

    const handleClick = () => {
      axios.post('/api/users/login', {
        username: props.username,
        password: props.password
      }, {withCredentials: true}).then((res) => {
        if (res.status === 200) { 
          history.push("/account");
        }
      }).catch((error) => {
        setError(error);
        history.push('/login')
      });
    }   
    return (
      <div style={{display: "inline"}}>
        <Button variant="outlined" color="primary" onClick={handleClick}>
        Вход
        </Button>
        { error ? 
          <div style={{display: "block", margin: "20px"}}>Неправилно име или парола!</div> :
          <div></div>  
        }
      </div>
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
