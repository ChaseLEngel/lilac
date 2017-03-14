import React, { Component } from 'react';

import { ButtonGroup, Button, Container, Row, Col } from 'reactstrap';

import RequestList from '../components/requestlist'

import EditGroup from '../components/editgroup';
import Settings from '../components/settings';

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
      showSettingsModal: false,
      group: {},
      settings: {},
      requests: [],
    }
    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this)
    this.getGroup = this.getGroup.bind(this)
    this.getSettings = this.getSettings.bind(this)
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  toggleSettingsModal() {
    this.setState({
      showSettingsModal: !this.state.showSettingsModal
    }) 
  }

  delete() {
    GroupActions.deleteGroup(this.state.group.group_id)
  }

  check() {
    GroupActions.check(this.state.group.group_id)
  }

  getGroup(group_id) {
    if(group_id === undefined) {
      group_id = this.state.group.group_id
    }
    this.setState({
      group: GroupStore.getGroup(group_id),
    })
  }

  getSettings(group_id) {
    if(group_id === undefined) {
      group_id = this.state.group.group_id
    }
    this.setState({
      settings: SettingsStore.getSettings(group_id)
    })
  }

  componentWillMount() {
    GroupStore.on("change", this.getGroup)
    SettingsStore.on("change", this.getSettings)
  }

  componentWillUnmount() {
    GroupStore.removeListener("change", this.getGroup)
    SettingsStore.removeListener("change", this.getSettings)
  }

  componentWillReceiveProps(nextProps) {
    var nextGroup_id = nextProps.params.group_id
    GroupActions.getGroup(nextGroup_id)
    RequestActions.getRequests(nextGroup_id)
    this.getGroup(nextGroup_id)
    SettingsActions.getSettings(nextGroup_id)
    this.getSettings(nextGroup_id)
  }

  render() {
    return (
      <div>
        <Row>
          <EditGroup toggler={this.toggleEditModal} group={this.state.group} show={this.state.showEditModal} />
          <Settings toggler={this.toggleSettingsModal} settings={this.state.settings} show={this.state.showSettingsModal}/>
          <ButtonGroup>
            <Button onClick={this.toggleEditModal.bind(this)}>Edit</Button>
            <Button onClick={this.delete.bind(this)}>Delete</Button>
            <Button onClick={this.check.bind(this)}>Check</Button>
            <Button onClick={this.toggleSettingsModal.bind(this)}>Settings</Button>
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
