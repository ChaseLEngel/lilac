import React, { Component } from 'react';

import { Button } from 'reactstrap';

import RequestList from '../components/requestlist'

import EditGroup from '../components/editgroup';

import GroupStore from '../store/groupStore';

import * as RequestActions from '../actions/requestactions';
import * as GroupActions from '../actions/groupactions';

class Group extends Component {

  constructor(props) {
    super()
    this.state = {
      showModal: false,
      group: {},
      requests: [],
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  delete() {
    GroupActions.deleteGroup(this.state.group.group_id)
  }

  check() {
    GroupActions.check(this.state.group.group_id)
  }

  getGroup(group_id) {
    this.setState({
      group: GroupStore.getGroup(group_id),
    })
  }

  componentWillReceiveProps(nextProps) {
    var nextGroup_id = nextProps.params.group_id
    RequestActions.getRequests(nextGroup_id)
    this.getGroup(nextGroup_id)
  }

  render() {
    return (
      <div>
        <EditGroup group={this.state.group} show={this.state.showModal} />
        <Button onClick={this.toggleModal.bind(this)}>Edit</Button>
        <Button onClick={this.delete.bind(this)}>Delete</Button>
        <Button onClick={this.check.bind(this)}>Check</Button>
        <p>{this.state.group.download_path}</p>
        <p>{this.state.group.link}</p>
        <RequestList group_id={this.state.group.group_id} />
      </div>
    );
  }
}

export default Group;
