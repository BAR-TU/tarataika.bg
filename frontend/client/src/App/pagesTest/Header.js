import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Home from './Home';
import Trivia from './Trivia';
import VehicleTemplate from './VehicleTemplate'

function Header() {
    return (
        <Router>
            <header>                                                                                                                 
                <h1>Tarataika.bg</h1>
            
                <nav>
                    <ul className="menu">
                        <li className="selected" id="home"> <Link to="/">Начало</Link></li>
                        <li>  <Link to="/">Публикуване</Link></li>
                        <li>  <Link to="/">Photos</Link></li>
                        <li>  <Link to="/">Gear</Link></li>
                        <li id="trivia">  <Link to="/trivia">История</Link></li>
                        <li id="testcar">  <Link to="/vehicletemplate">TestCar</Link></li>
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

export default Header;