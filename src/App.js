import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

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
        <Row>
          <Col>
            <Header />
            <Navbar />
            <CreateGroup toggle={this.toggleCreateGroup} show={this.state.showCreateGroup}/>
            <Button onClick={this.toggleCreateGroup}>New Group</Button>
          </Col>
        </Row>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default App;
