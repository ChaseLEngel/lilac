import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as  MachineActions from '../../actions/machineactions'

class CreateMachineModal extends Component {

  constructor() {
    super()
    this.state = {
      machine: {host: "", user: "", port: ""}
    }
  }

  closeModal = () => {
    this.setState({
      machine: {host: "", user: "", port: ""}
    })
    this.props.toggler()
  }
  
  create = () => {
    MachineActions.createMachine(this.state.machine) 
  }

  hostChange = (event) => {
    var machine = this.state.machine
    machine.host = event.target.value
    this.setState({
      machine: machine
    })
  }

  userChange = (event) => {
    var machine = this.state.machine
    machine.user = event.target.value
    this.setState({
      machine: machine
    })
  }

  portChange = (event) => {
    var machine = this.state.machine
    machine.port = event.target.value
    this.setState({
      machine: machine
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.closeModal}>
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
            <Button color="primary" onClick={this.create}>Create</Button>
            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default CreateMachineModal;
