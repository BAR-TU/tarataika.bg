import axios from 'axios';
import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const PublishButton = (props) => {
    let history = useHistory();
    const handleClick = () => {
        console.log(props);
        axios.post('api/listings/addlisting', props)
        history.push({
            pathname: '/listingsresults',
            search: '',
            state: { details: props}
        });
    }

    return (
            <button style={{heigh: "20px", width: "200px"}} 
            disabled={!props.category || !props.make || !props.model || !props.price || !props.year || !props.engine || !props.power || !props.mileage || !props.gearbox || !props.location || !props.paint || !props.ecategory} 
            type="publish" id="publishbutton" onClick={ handleClick }>
            Публикувай
            </button>
    );
}

export default PublishButton;