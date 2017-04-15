import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router'

import { ButtonGroup, Button, Container, Row, Col } from 'reactstrap';

import RequestList from '../components/request/list'
import EditGroup from '../components/group/edit';
import Settings from '../components/group/settings';

import GroupStore from '../store/groupStore';
import SettingsStore from '../store/settingsStore';

import Helpers from '../helpers';

import * as RequestActions from '../actions/requestactions';
import * as GroupActions from '../actions/groupactions';
import * as SettingsActions from '../actions/settingsactions';

class Group extends Component {

  constructor(props) {
    super()
    this.state = {
      showEditModal: false,
      group: GroupStore.getGroup(props.params.group_id),
      requests: [],
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.getGroup = this.getGroup.bind(this)
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  delete() {
    GroupActions.deleteGroup(this.state.group.group_id)
    browserHistory.replace("/")
  }

  check() {
    GroupActions.check(this.state.group.group_id)
  }

  getGroup(group_id) {
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
    GroupActions.getGroup(nextGroup_id)
    RequestActions.getRequests(nextGroup_id)
    this.getGroup(nextGroup_id)
  }

  render() {
    return (
      <div>
        <Row>
          <EditGroup toggler={this.toggleEditModal} group={this.state.group} show={this.state.showEditModal} />
          <ButtonGroup>
            <Button onClick={this.toggleEditModal.bind(this)}>Edit</Button>
            <Button onClick={this.delete.bind(this)}>Delete</Button>
            <Button onClick={this.check.bind(this)}>Check</Button>
            <Button tag={Link} to={"/groups/"+this.state.group.group_id+"/settings"}>Settings</Button>
          </ButtonGroup>
        </Row>
        <p>Download Path: {this.state.group.download_path}</p>
        <p>Last Checked: {Helpers.formatTimestamp(this.state.group.last_checked)}</p>
        <p>RSS Link: {this.state.group.link}</p>
        <RequestList group_id={this.state.group.group_id} />
      </div>
    );
  }
}

export default Group;
