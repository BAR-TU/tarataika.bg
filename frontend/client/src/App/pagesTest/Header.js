import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Home from './Home';
import Trivia from './Trivia';
<<<<<<< HEAD
import VehicleTemplate from './VehicleTemplate/VehicleTemplate'
=======
import VehicleTemplate from './VehicleTemplate/VehicleTemplate';
>>>>>>> 7283283ec668310430329ac1a9441c6adca2e7ca
import { HomeButton, PublicButton, SearchResultsButton, TestCarButton } from './NavComponent';

class Header extends React.Component {
    render() {
    return (
        <Router>
            <header>                                                                                                                 
                <h1>Tarataika.bg</h1>
            
                <nav>
                    <ul className="menu">
                        <HomeButton />
                        <SearchResultsButton />
                        <PublicButton />
                        <TestCarButton />
                    </ul>
                </nav>
            </header>

            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/trivia"><Trivia /></Route>
                <Route path="/vehicletemplate"><VehicleTemplate /></Route>
            </Switch>
        </Router>
    );
    }
}

export default Header;