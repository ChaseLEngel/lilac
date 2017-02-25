import React, { Component } from 'react';

import Header from './components/header';
import Navbar from './components/navbar';

import api from './utilities/api';

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    api.groups().then((response) => {
      this.setState ({
        data: response.data
      })
    })

  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar groups={this.state.data}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
