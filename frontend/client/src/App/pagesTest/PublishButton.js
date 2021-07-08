import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const PublishButton = (props) => {
    let history = useHistory();

    useEffect(() => {

    }, [])

    async function handleClick() {

        if (props.update === undefined) {
            await axios.post('/api/listings/addlisting', props).then(() => {
                history.push({
                    pathname: '/listingsresults',
                    search: '',
                    state: { details: props}
                });
            }).catch((err) => {
                console.log(err);
            });
            
        } else if (props.update === 'true') {
            history.push({
                pathname: '/editlistings',
                search: '',
                state: { details: props}
            });
        }
    }

    return (
            <button style={{height: "20px", width: "200px"}} 
            disabled={!props.category || !props.make || !props.model || !props.price || !props.year || !props.engine || !props.power || !props.mileage || !props.gearbox || !props.location || !props.paint || !props.ecategory} 
            id="publishbutton" onClick={ handleClick }>
            Публикувай
            </button>
    );
}

export default PublishButton;