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

  apiTokenChange = (event) => {
    var settings = this.state.settings
    settings.telegram_api_token = event.target.value
    this.setState({
      settings: settings
    })
  }

  chatIdChange = (event) => {
    var settings = this.state.settings
    settings.telegram_chat_id = event.target.value
    this.setState({
      settings: settings
    })
  }

  telegramMessageChange = (event) => {
    var settings = this.state.settings
    settings.telegram_message = event.target.value
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
                <Input type="text" value={this.state.settings.telegram_api_token} onChange={this.apiTokenChange}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Chat ID</label>
              </Col>
              <Col lg={{ size: '3', offset: 1 }}>
                <Input type="text" value={this.state.settings.telegram_chat_id} onChange={this.chatIdChange}/>
              </Col>
            </Row>
            <Row>
              <Col>
                <label>Message</label>
              </Col>
              <Col lg={{ size: '7', offset: 1 }}>
                <Input type="textarea" value={this.state.settings.telegram_message} onChange={this.telegramMessageChange}/>
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
