import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pagesTest/Home';
import Header from './pagesTest/Header';
import List from './pages/List';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
      </div>
    );
  }
}

/*
class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/list' component={List}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}
*/
export default App;