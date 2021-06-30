import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router, Route
} from 'react-router-dom';
import VehicleTemplate from './VehicleTemplate/VehicleTemplate';
import axios from 'axios';

const MostViewed = (props) => {
    let history = useHistory();
    const [result, setResult] = useState('');
    
    useEffect(() => {
        let query = '/api/listings/info/';
        query += props.id;
        axios.get(query)
        .then(details => {
            setResult(details.data);
            console.log(details.data);
        });
      }, []);

    
    const redirectToTemplate = () => {
        history.push({
            pathname: '/vehicleTemplate',
            search: '',
            state: { id: props.id }
        });
    }

  return(
    <Router>
    <div className="recentSearches" onClick={ redirectToTemplate }>
      { result.vip_status === true && (
        <>
          <span id="vip">VIP</span>
        </>
      )}
      { result && (
      <>
        <div className="field">
          <span className="label">Марка: </span>
          <span className="value">{ result.make.make }</span>
        </div>
        <div className="field content">
          <span className="label">Модел: </span>
          <span className="value">{ result.model.model }</span>
        </div>
        <div className="field">
          <span className="label">Цена: </span>
          <span className="value">{ result.price }</span>
        </div>
      </>
      )}
    </div>

    <Route path="/vehicleTemplate"><VehicleTemplate /></Route>
    </Router>
  );
};


export default MostViewed;