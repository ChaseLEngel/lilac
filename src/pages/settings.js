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
      <div>
        <h3>Group Settings</h3>
        <Form>
          <FormGroup>
            <Row>
              <Col sm="auto">
                <Label for="interval">Check Interval</Label>
              </Col>
              <Col sm="auto">
                <Input type="number" value={this.state.settings.interval} onChange={this.intervalChange}/>
              </Col>
            </Row>
            <Row>
              <Col sm="11">
                <Label for="autotransfer">Auto Transfer</Label>
              </Col>
              <Col sm="auto">
                <Input type="checkbox" checked={this.state.settings.auto_transfer} onChange={this.autoTransferChange}/>
              </Col>
            </Row>
            <Row>
             <Button color="primary" onClick={this.edit}>Save</Button>
            </Row>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Settings
