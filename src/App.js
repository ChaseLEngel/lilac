import React, { Component } from 'react';

import { Alert, Container, Row, Col, Button } from 'reactstrap';

import Header from './components/header';
import CreateGroup from './components/creategroup';
import Navbar from './components/navbar';

import AlertStore from './store/alertstore';

class App extends Component {

  constructor() {
    super()
    this.state = {
      showCreateGroup: false,
      alertShow: false,
      alertMessage: ""
    }
    this.toggleCreateGroup = this.toggleCreateGroup.bind(this)
    this.alertDismiss = this.alertDismiss.bind(this)
    this.getAlert = this.getAlert.bind(this)
  }

  getAlert() {
    this.setState({
      alertMessage: AlertStore.getAlert(),
      alertShow: true
    })
  }

  alertDismiss() {
    this.setState({
      alertShow: !this.state.alertShow
    }) 
  }

  componentWillMount() {
    AlertStore.on("change", this.getAlert)
  }

  componentWillUnmount() {
    AlertStore.removeListener("change", this.getAlert)
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
                {this.state.alertMessage}
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
