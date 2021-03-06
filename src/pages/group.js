import React, { Component } from 'react'

import { Link, browserHistory } from 'react-router'

import { ButtonGroup, Button } from 'reactstrap'

import RequestList from '../components/request/list'
import EditGroup from '../components/group/edit'

import GroupStore from '../store/groupStore'

import Helpers from '../helpers'

import * as RequestActions from '../actions/requestactions'
import * as GroupActions from '../actions/groupactions'

const linkStyle = {
  color: 'black'
}

const jumbotronStyle = {
  marginBottom: 0,
  paddingTop: '2rem',
  paddingBottom: '1rem',
}

class Group extends Component {

  constructor(props) {
    super()
    this.state = {
      showEditModal: false,
      group: GroupStore.getGroup(props.params.group_id) || {},
      requests: [],
    }
  }

  toggleEditModal = () => {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  delete = () => {
    GroupActions.deleteGroup(this.state.group.group_id)
    browserHistory.replace("/")
  }

  check = () => {
    GroupActions.check(this.state.group.group_id)
  }

  getGroup = (group_id) => {
    if(group_id === undefined) {
      group_id = this.state.group.group_id
    }
    this.setState({
      group: GroupStore.getGroup(group_id)
    })
  }

  componentWillMount() {
    GroupStore.on("change", this.getGroup)
  }

  componentWillUnmount() {
    GroupStore.removeListener("change", this.getGroup)
  }

  componentWillReceiveProps(nextProps) {
    var nextGroup_id = nextProps.params.group_id
    RequestActions.getRequests(nextGroup_id)
    this.getGroup(nextGroup_id)
  }

  render() {
    return (
      <div>
        <div style={jumbotronStyle} className='jumbotron'>
          <h4>{this.state.group.name}</h4>
          <EditGroup toggler={this.toggleEditModal} group={this.state.group} show={this.state.showEditModal} />
          <ButtonGroup>
            <Button onClick={this.toggleEditModal}>Edit</Button>
            <Button onClick={this.delete}>Delete</Button>
            <Button onClick={this.check}>Check</Button>
            <Button tag={Link} to={"/groups/"+this.state.group.group_id+"/settings"}>Settings</Button>
          </ButtonGroup>
          <p>Download Path: {this.state.group.download_path}</p>
          <p>Last Checked: {Helpers.formatTimestamp(this.state.group.last_checked)}</p>
          <p>RSS Link: <a style={linkStyle} href={this.state.group.link} target="_blank">{this.state.group.link}</a></p>
        </div>
        <RequestList group_id={this.state.group.group_id} />
      </div>
    );
  }
}

export default Group;
