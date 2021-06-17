import React from 'react';
import './App.css';
import Header from './pagesTest/Header';

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