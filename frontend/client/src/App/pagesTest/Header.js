import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Home from './Home';
import VehicleTemplate from './VehicleTemplate/VehicleTemplate';
import ListingsResults from './ListingsResults';
import { HomeButton, PublicButton, SearchResultsButton, AccountButton } from './NavComponent';
import { withRouter } from 'react-router-dom';
import Account from './Account';
import Login from './Login';
import Register from './Register';

class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            token: ''
        };
    }

    componentDidMount() {
        this.setState({token: localStorage.getItem('token')})
    }
    render() {
        const { token } = this.state;
    return (
        <Router>
            <header>                                                                                                                 
                <h1>Tarataika.bg</h1>
            
                <nav>
                    <ul className="menu">
                        <HomeButton />
                        <SearchResultsButton />
                        <PublicButton />
                        <AccountButton token={ token }/>
                    </ul>
                </nav>
            </header>

            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/listingsresults"><ListingsResults/></Route>
                <Route path="/login"><Login /></Route>
                <Route path="/vehicleTemplate"><VehicleTemplate /></Route>
                <Route path="/account"><Account /></Route>
                <Route path="/register"><Register/></Route>
            </Switch>
        </Router>
    );
    }
}

export default withRouter(Header);