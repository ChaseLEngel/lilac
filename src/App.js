import React, { Component } from 'react'

import { Alert } from 'reactstrap'

import { browserHistory } from 'react-router'

import Navbar from './components/nav/navbar'

import * as MachineActions from './actions/machineactions'

import AlertStore from './store/alertstore'
import GroupStore from './store/groupStore'

import styles from './styles/index.css'

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
  display: 'flex',
  height: '100%'
}

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

  loadGroup = () => {
    var groups = GroupStore.getGroups()
    if(groups.length == 0) {
      return
    }
    browserHistory.push('/groups/' + groups[0].group_id)
  }

  componentWillMount () {
    AlertStore.on("change", this.getAlert)
  }

  componentDidMount() {
    MachineActions.getMachines()
    this.loadGroup()
  }

  componentWillUnmount() {
    AlertStore.removeListener("change", this.getAlert)
  }

  render() {
    return (
      <div className="App" style={appStyle}>
        <div style={containerStyle}>
          <Navbar />
          <div style={contentStyle}>
            <Alert
              isOpen={this.state.alertShow}
              toggle={this.alertDismiss}
              style={alertStyle}
              color="danger">
              {this.state.alertMessage}
            </Alert>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
