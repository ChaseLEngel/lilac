import React, { Component } from 'react'

import { Card, CardHeader, CardBlock, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

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
  }

  getSettings = () => {
    this.setState({
      settings: SettingsStore.getSettings(this.state.group_id)
    })
  }

  edit = () => {
    SettingsActions.editSettings(this.state.settings)
    browserHistory.push("/groups/"+this.state.group_id)
  }

  intervalChange = (event) => {
    var settings = this.state.settings
    settings.interval = event.target.value
    this.setState({
      settings: settings
    })
  }

  autoTransferChange = (event) => {
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
        <Card>
          <CardHeader>Group Settings</CardHeader>
          <CardBlock>
            <Row>
              <Col>
                <label>Check Interval</label>
              </Col>
              <Col lg={{ size: 'auto', offset: 1 }}>
                <Input type="number" value={this.state.settings.interval} onChange={this.intervalChange}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Auto Transfer</label>
              </Col>
              <Col lg={{ size: 'auto', offset: 1 }}>
                <Input type="checkbox" checked={this.state.settings.auto_transfer} onChange={this.autoTransferChange}/>
              </Col>
            </Row>
          </CardBlock>
        </Card>

        <Card>
          <CardHeader>Telegram</CardHeader>
          <CardBlock>
            <Row>
              <Col>
                <label>API Token</label>
              </Col>
              <Col lg={{ size: '5', offset: 1 }}>
                <Input type="text" value="" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Chat ID</label>
              </Col>
              <Col lg={{ size: '3', offset: 1 }}>
                <Input type="text" value="" />
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Message</label>
              </Col>
              <Col lg={{ size: '7', offset: 1 }}>
                <Input type="textarea" value="" />
              </Col>
            </Row>
          </CardBlock>
        </Card>
        <Button color="primary" onClick={this.edit}>Save</Button>
     </div>
    )
  }
}

const formStyle = {
}

const formRowStyle = {
}

export default Settings
