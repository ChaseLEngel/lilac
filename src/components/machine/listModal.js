import React, { Component } from 'react';

import * as MachineActions from '../../actions/machineactions'
import * as GroupActions from '../../actions/groupactions'

import MachineStore from '../../store/machinestore'

import { ListGroup, ListGroupItem, FormGroup, Input, Modal, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap'

class ListMachinesModal extends Component {

  constructor(props) {
    super()
    this.state = {
      machines: []
    }
    this.listMachines = this.listMachines.bind(this)
    this.addMachines = this.addMachines.bind(this)
    this.addMachine = this.addMachine.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.find = this.find.bind(this)
    this.isActive = this.isActive.bind(this)
  }

  closeModal() {
    this.setState({
      machines: []
    })
    this.props.toggler()
  }

  addMachines() {
    GroupActions.insertMachines(this.props.group_id, this.state.machines)
    this.closeModal()
  }

  find(id) {
    return this.state.machines.find(function(element) {
      return element == id
    })
  }

  isActive(id) {
    if(this.find(id) === undefined) {
      return false
    }
    return true
  }

  addMachine(event) {
    var machines = this.state.machines
    var name = event.target.name
    if(this.find(name) === undefined) {
      machines.push(name)
    } else {
      machines = machines.filter(function(element) {
        return element != name
      })
    }
    this.setState({
      machines: machines
    })
  }

  listMachines() {
    return MachineStore.getMachines().map((machine) => {
      return <div key={machine.machine_id}>
        <ListGroupItem active={this.isActive(machine.machine_id)} tag="button" name={machine.machine_id} onClick={this.addMachine}>
          {machine.host}
        </ListGroupItem>
      </div>
    })
  }

  componentWillMount() {
    MachineActions.getMachines()
  }

  render() {
    return(
      <Modal isOpen={this.props.show} toggle={this.props.toggler}>
        <ModalBody>
          <ListGroup>
            <FormGroup>
              {this.listMachines()}
            </FormGroup>
          </ListGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addMachines}>Add</Button>
          <Button onClick={this.closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ListMachinesModal
