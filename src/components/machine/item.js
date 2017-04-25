import React, { Component } from 'react'

import { ButtonGroup, Button, Row, Col, ListGroupItem } from 'reactstrap'

import * as MachineActions from '../../actions/machineactions'

import EditMachineModal from './editModal'

class MachineItem extends Component {

  constructor(props) {
    super()
    this.state = {
      machine: props.machine,
      showEditModal: false
    }

    this.toggleEditModal = this.toggleEditModal.bind(this)
    this.delete = this.delete.bind(this)
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  delete() {
    MachineActions.deleteMachine(this.state.machine.machine_id)
  }

  render() {
    return (
      <div>
        <EditMachineModal toggler={this.toggleEditModal} machine={this.state.machine} show={this.state.showEditModal}/>
        <ListGroupItem className="justify-content-between">
          <div>{this.state.machine.host}</div>
          <ButtonGroup size="sm">
            <Button onClick={this.toggleEditModal}>Edit</Button>
            <Button onClick={this.delete}>Delete</Button>
          </ButtonGroup>
        </ListGroupItem>
      </div>
    )
  }
}

export default MachineItem;
