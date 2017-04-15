import React, { Component } from 'react'

import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import { browserHistory } from 'react-router'

import SettingsStore from '../store/settingsStore'

import * as SettingsActions from '../actions/settingsactions'

class Settings extends Component {

  constructor(props) {
    super()
    this.state = {
      group_id: props.params.group_id,
      settings: []
    }
    this.getSettings = this.getSettings.bind(this)
    this.edit = this.edit.bind(this)
    this.intervalChange = this.intervalChange.bind(this)
    this.autoTransferChange = this.autoTransferChange.bind(this)
  }

  getSettings() {
    this.setState({
      settings: SettingsStore.getSettings(this.state.group_id)
    })
  }

  edit() {
    SettingsActions.editSettings(this.state.settings)
    browserHistory.push("/groups/"+this.state.group_id)
  }

  intervalChange(event) {
    var settings = this.state.settings
    settings.interval = event.target.value
    this.setState({
      settings: settings
    })
  }

  autoTransferChange(event) {
    var settings = this.state.settings
    settings.auto_transfer = !settings.auto_transfer
    this.setState({
      settings: settings
    })
  }

  componentWillMount() {
    SettingsStore.on("change", this.getSettings)
  }

  componentDidMount() {
    SettingsActions.getSettings(this.state.group_id)
  }

  componentWillUnmount() {
    SettingsStore.removeListener("change", this.getSettings)
  }

  render() {
    return (
        <Form>
        <h3>Group Settings</h3>
          <FormGroup>
            <Row>
              <Col sm="auto">
                <Label>Check Interval</Label>
              </Col>
              <Col sm="auto">
                <Input type="number" value={this.state.settings.interval} onChange={this.intervalChange}/>
              </Col>
            </Row>
            <Row>
              <Col sm="auto">
                <Label>Auto Transfer</Label>
              </Col>
              <Col sm="auto">
                <Input type="checkbox" checked={this.state.settings.auto_transfer} onChange={this.autoTransferChange}/>
              </Col>
            </Row>
            <legend>Notifications</legend>
            <Row>
              <Col lg="auto">
                <Label>Telegram API Token</Label>
              </Col>
              <Col lg="auto">
                <Input type="text" value="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11" />
              </Col>
            </Row>
            <Row>
              <Col lg="auto">
                <Label>Telegram Message</Label>
              </Col>
              <Col lg="auto">
                <Input type="textarea" value="Lilac downloaded %file%" />
              </Col>
            </Row>
            <Row>
             <Button color="primary" onClick={this.edit}>Save</Button>
            </Row>
          </FormGroup>
        </Form>
    )
  }
}

export default Settings
