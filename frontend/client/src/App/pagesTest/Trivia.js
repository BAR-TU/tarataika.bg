import React from "react";
import MazdaRotaries from './MazdaRotaries';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

class Trivia extends React.Component {
    componentDidMount() {
        var selected = document.getElementsByClassName("selected");
        selected[0].className = "";
        var toSelect = document.getElementById("trivia");
        toSelect.className = "selected";
    }
    render() {
        return (
            <Router>
                <main>
                    <div>
                        <ul>
                            <li id="mazdarotaries"> <Link to="/mazdarotaries">Mazda</Link></li>
                        </ul>
                    </div>
                </main>
                <Switch>
                    <Route path="/mazdarotaries"><MazdaRotaries /></Route>
                </Switch>
            </Router>
        );
    }
}

export default Trivia;