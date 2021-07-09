import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const PublishButton = (props) => {
    let history = useHistory();

    useEffect(() => {

    }, [])

    async function handleClick(e) {
            e.preventDefault();
        if (props.update === undefined) {
            history.push({
                pathname: '/editlistings',
                search: '',
                state: { details: props}
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
            <button
            disabled={!props.category || !props.make || !props.model || !props.price || !props.year || !props.engine || !props.power || !props.mileage || !props.gearbox || !props.location || !props.paint || !props.ecategory} 
            id="publishbutton" onClick={ handleClick }>
            Публикувай
            </button>
    );
}

export default PublishButton;