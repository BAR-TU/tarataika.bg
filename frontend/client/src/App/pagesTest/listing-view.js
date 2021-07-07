import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router, Route
} from 'react-router-dom';
import VehicleTemplate from './VehicleTemplate/VehicleTemplate';

const ResultsView = ({ result }) => {
    let history = useHistory();
    const redirectToTemplate = () => {
        history.push({
            pathname: '/vehicleTemplate',
            search: '',
            state: { id: result.id }
        });
    }

  return(
    <Router>
    <div className="listin" onClick={redirectToTemplate}>
    { result.vip_status === true && (
        <>
          <span id="vip">VIP</span>
        </>
      )}
      <div className="field">
        <span className="label">Марка: </span>
        <span className="value">{result.make.make}</span>
      </div>
      <div className="field content">
        <span className="label">Модел: </span>
        <span className="value">{result.model.model}</span>
      </div>
      <div className="field">
        <span className="label">Цена: </span>
        <span className="value">{result.price}</span>
      </div>
    </div>

    <Route path="/vehicleTemplate"><VehicleTemplate /></Route>
    </Router>
  );
};

ResultsView.propTypes = {
  result: PropTypes.object.isRequired
}

export default ResultsView;