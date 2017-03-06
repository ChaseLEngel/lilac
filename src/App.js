import React, { Component } from 'react';

import { Button } from 'reactstrap';

import Header from './components/header';
import CreateGroup from './components/creategroup';
import Navbar from './components/navbar';

class App extends Component {

  constructor() {
    super()
    this.state = {
      showCreateGroup: false
    }

    this.toggleCreateGroup = this.toggleCreateGroup.bind(this)
  }

  toggleCreateGroup() {
    this.setState({
      showCreateGroup: !this.state.showCreateGroup
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Button onClick={this.toggleCreateGroup}>New Group</Button>
        <CreateGroup show={this.state.showCreateGroup}/>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
