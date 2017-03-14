import React, { Component } from 'react';

import { Container, Col, Row, Form, InputGroup, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as GroupActions from '../actions/groupactions'
import * as SettingsActions from '../actions/settingsactions'

class SettingsModal extends Component {

  constructor(props) {
    super()
    this.state = {
      settings: {}
    }
    this.edit = this.edit.bind(this)
    this.intervalChange = this.intervalChange.bind(this)
    this.toggleAutoTransfer = this.toggleAutoTransfer.bind(this)
  }

  edit() {
    SettingsActions.editSettings(this.state.settings)
    this.props.toggler()
  }

  intervalChange(event) {
    var settings = this.state.settings
    settings.interval = event.target.value
    this.setState({
      settings: settings
    })
  }

  toggleAutoTransfer(event) {
    var settings = this.state.settings
    settings.auto_transfer = !settings.auto_transfer
    this.setState({
      settings: settings
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.settings === undefined) {
      return
    }
    this.setState({
      settings: nextProps.settings
    })
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggler}>
          <ModalHeader>
            Group Settings
          </ModalHeader>
          <ModalBody>
                <Label>Interval</Label>
                <Input type="number" value={this.state.settings.interval} onChange={this.intervalChange}/>
                <Row>
                  <Col>
                    <Label>Auto Transfer</Label>
                  </Col>
                  <Col>
                    <Input type="checkbox" checked={this.state.settings.auto_transfer} onChange={this.toggleAutoTransfer}/>
                  </Col>
                </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.edit}>Save</Button>
            <Button color="secondary" onClick={this.props.toggler}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SettingsModal;
