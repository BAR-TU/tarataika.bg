import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router, Route
} from 'react-router-dom';
import VehicleTemplate from './VehicleTemplate/VehicleTemplate';
import axios from 'axios';

const RecentResultsView = (props) => {
    let history = useHistory();
    const [result, setResult] = useState('');
    
    useEffect(() => {
      let query = '/api/listings/info/';
      query += props.id;
      axios.get(query)
      .then(details => {
        if (details.data === "")
        {
          let data = JSON.parse(localStorage.getItem('recentlyVisited'));
          let i = data.indexOf(props.id);
          data.splice(i , 1);
          localStorage.setItem('recentlyVisited', JSON.stringify(data));
        } else {
          setResult(details.data);
        }
      });
    }, [props.id]);

    
    const redirectToTemplate = () => {
        history.push({
            pathname: '/vehicleTemplate',
            search: '',
            state: { id: props.id }
        });
    }

return(
    <Router>
      { result && (
      <>
    <div className="recentSearches" onClick={ redirectToTemplate }>
      { result.vip_status === true && (
        <>
          <span id="vip">VIP</span>
        </>
      )}
      
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

    </div>
    </>
      )}
    <Route path="/vehicleTemplate"><VehicleTemplate /></Route>
    </Router>
  );
};


export default RecentResultsView;