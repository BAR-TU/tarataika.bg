import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router, Route
} from 'react-router-dom';
import VehicleTemplate from './VehicleTemplate/VehicleTemplate';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ReactTooltip from "react-tooltip";

const useStyles = makeStyles((theme) => ({
    margin: {
      marginLeft: theme.spacing(20),
      position: 'absolute',

    },
    extendedIcon: {
      marginRight: theme.spacing(1),

    },
    margin1: {
      marginLeft: theme.spacing(15),
      position: 'absolute',
    }
  }));

const EditMyListingsView = ({ result }) => {
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
      
    }, [])

    const redirectToTemplate = () => {
        history.push({
            pathname: '/vehicleTemplate',
            search: '',
            state: { id: result.id }
        });
    }

    async function editListing () {
      history.push({
        pathname: '/updatelisting',
        search: '',
        state: { id: result.id }
      });
    }

    async function deleteListing () {
      let query = '/api/listings/delete/';
        query += result.id;

        if (window.confirm('Наистина ли искате да изтриете тази обява?')) {
          await axios.delete(query)
          .then((res) => {
            history.push({
              pathname: '/editlistings',
              search: '',
              state: { message: res.data }
            });
          });
        } else {
        }
    }

  return(
    <Router>
    <div className="editmylistin">
        <div className="infoforedit" onClick={redirectToTemplate}>
        { result.vip_status === true && (
        <>
          <span id="vip">VIP</span>
        </>
      )}
            <div className="makefield">
              <span className="label">Марка: </span>
              <span className="value">{result.make.make}</span>
            </div>
            <div className="modelfield content">
              <span className="label">Модел: </span>
              <span className="value">{result.model.model}</span>
            </div>
            <div className="pricefield">
              <span className="label">Цена: </span>
              <span className="value">{result.price}</span>
            </div>
        </div>
      <IconButton aria-label="delete" data-tip data-for="deletelisting" className={classes.margin} onClick={deleteListing}>
        <ReactTooltip id="deletelisting" place="bottom" effect="solid">
          Изтрий
        </ReactTooltip>
        <DeleteIcon/>
      </IconButton>

      <IconButton aria-label="edit" data-tip data-for="editlisting" className={classes.margin1} onClick={editListing}>
        <ReactTooltip id="editlisting" place="bottom" effect="solid">
          Редактирай
        </ReactTooltip>
        <CreateOutlinedIcon/>
      </IconButton>
    </div>

    <Route path="/vehicleTemplate"><VehicleTemplate /></Route>
    </Router>
  );
};

EditMyListingsView.propTypes = {
  result: PropTypes.object.isRequired
}

export default EditMyListingsView;