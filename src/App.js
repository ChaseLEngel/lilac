import React, { Component } from 'react';

import { Alert, Container, Row, Col, Button } from 'reactstrap';

import Header from './components/header';
import CreateGroup from './components/creategroup';
import Navbar from './components/navbar';

class App extends Component {

  constructor() {
    super()
    this.state = {
      showCreateGroup: false,
      alertShow: false
    }
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this)
    this.alertDismiss = this.alertDismiss.bind(this)
    this.alert = this.alert.bind(this)
  }

  alert() {
    this.setState({
      alertShow: true
    })

  }

  alertDismiss() {
    this.setState({
      alertShow: !this.state.alertShow
    }) 
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
        <Button onClick={this.alert}>Alert!</Button>
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              <Alert 
                transitionAppearTimeout={5}
                transitionEnterTimeout={5}
                isOpen={this.state.alertShow}
                toggle={this.alertDismiss}
                transitionLeaveTimeout={2} 
                color="danger">
                  Oh No!
              </Alert>
            </Col>
          </Row>
        <Row>
          <Col lg="2">
            <Navbar />
            <CreateGroup toggler={this.toggleCreateGroup} show={this.state.showCreateGroup}/>
            <Button onClick={this.toggleCreateGroup}>New Group</Button>
          </Col>
          <Col lg="auto">
          {this.props.children}
        </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
