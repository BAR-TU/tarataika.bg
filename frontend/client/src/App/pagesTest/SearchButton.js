import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const SearchButton = (props) => {
    let history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: '/listingsresults',
            search: '',
            state: { details: props}
        });
    }

    return (
        <Router>
            <input type="submit" value="Търси" id="submit" onClick={ handleClick }></input>
        </Router>
    );
}

export { SearchButton };