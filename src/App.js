import React, { Component } from 'react';

import Header from './components/header';
import Navbar from './components/navbar';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
