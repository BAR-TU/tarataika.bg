import React from 'react';
import './App.css';
import Header from './pagesTest/Header';
import Footer from './pagesTest/Footer';
import { Helmet } from 'react-helmet';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet>
                <meta charset="utf-8"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap" rel="stylesheet"/>
                <title>
                    tarataika.bg
                </title>
            </Helmet>
        <Header></Header>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;