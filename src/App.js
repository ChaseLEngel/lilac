import React, { Component } from 'react';

import { Alert, Button } from 'reactstrap';

import Header from './components/header';
import CreateGroup from './components/group/create';
import Navbar from './components/nav/navbar';

import AlertStore from './store/alertstore';

import styles from './styles/index.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      showCreateGroup: false,
      alertShow: false,
      alertMessage: ""
    }
  }

  getAlert = () => {
    this.setState({
      alertMessage: AlertStore.getAlert(),
      alertShow: true
    })
  }

  alertDismiss = () => {
    this.setState({
      alertShow: !this.state.alertShow
    }) 
  }

  toggleCreateGroup = () => {
    this.setState({
      showCreateGroup: !this.state.showCreateGroup
    })
  }

  componentWillMount () {
    AlertStore.on("change", this.getAlert)
  }

  componentWillUnmount() {
    AlertStore.removeListener("change", this.getAlert)
  }

  render() {
    return (
      <div className="App" style={appStyle}>
        <Header />
        <Alert 
          isOpen={this.state.alertShow}
          toggle={this.alertDismiss}
          style={alertStyle}
          color="danger">
          {this.state.alertMessage}
        </Alert>
        <div style={containerStyle}>
            <Navbar />
            <div style={contentStyle}>
              {this.props.children}
            </div>
        </div>
      </div>
    );
  }
}

const appStyle = {
  height: '100%'
}

const contentStyle = {
  flex: 3,
}

const alertStyle = {
  marginBottom: 0
}

const sidebarStyle = {
  flex: 1,
}

const containerStyle = {
  display: "flex",
  height: '100%'
};

export default App;
