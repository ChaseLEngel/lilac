import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as  MachineActions from '../../actions/machineactions'

class EditMachineModal extends Component {

  constructor(props) {
    super()
    var machine = {host: "", user: "", port: ""}
    this.state = {
      machine: machine
    }
    this.hostChange = this.hostChange.bind(this)
    this.userChange = this.userChange.bind(this)
    this.portChange = this.portChange.bind(this)
    this.edit = this.edit.bind(this)
  }

  edit() {
    MachineActions.editMachine(this.state.machine)
    this.props.toggler()
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      machine: nextProps.machine
    })
  }

  hostChange(event) {
    var machine = this.state.machine
    machine.host = event.target.value
    this.setState({
      machine: machine
    })
  }

  userChange(event) {
    var machine = this.state.machine
    machine.user = event.target.value
    this.setState({
      machine: machine
    })
  }

  portChange(event) {
    var machine = this.state.machine
    machine.port = event.target.value
    this.setState({
      machine: machine
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggler}>
          <ModalHeader>
            New Machine
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="machinehost">Host</Label>
                <Input type="text" name="host" id="machinehost" value={this.state.machine.host} onChange={this.hostChange}/>
                <Label for="machineport">Port</Label>
                <Input type="text" name="port" id="machineport" value={this.state.machine.port} onChange={this.portChange}/>
                <Label for="machineuser">User</Label>
                <Input type="text" name="user" id="machineuser" value={this.state.machine.user} onChange={this.userChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.edit}>Save</Button>
            <Button color="secondary" onClick={this.props.toggler}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default EditMachineModal;
