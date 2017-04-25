import React, { Component } from 'react'

import { Card, CardBlock, CardHeader, Button, ListGroup, ListGroupItem} from 'reactstrap'

import MachineItem from '../components/machine/item'

import MachineStore from '../store/machinestore'

import CreateMachineModal from '../components/machine/createModal'

import * as MachineActions from '../actions/machineactions'

class Machines extends Component {

  constructor() {
    super()
    this.state = {
      machines: [],
      showCreateModal: false
    }
    this.getMachines = this.getMachines.bind(this)
    this.machineList = this.machineList.bind(this)
    this.toggleCreateModal = this.toggleCreateModal.bind(this)
  }

  toggleCreateModal() {
    this.setState({
      showCreateModal: !this.state.showCreateModal
    })
  }

  getMachines() {
    this.setState({
      machines: MachineStore.getMachines()
    })
  }

  componentWillMount() {
    MachineStore.on("change", this.getMachines)
    MachineActions.getMachines()
  }

  componentWillUnmount() {
    MachineStore.removeListener("change", this.getMachines)
  }

  machineList() {
    return this.state.machines.map((machine) => {
      return <MachineItem
        key={machine.machine_id}
        machine={machine}
        />
    })
  }

  render() {
    var machines = this.machineList()
    return (
      <Card>
          <CreateMachineModal toggler={this.toggleCreateModal} show={this.state.showCreateModal} />
        <CardHeader>
          Machines
          <Button color="secondary" size="sm" onClick={this.toggleCreateModal}>New</Button>
        </CardHeader>
        <CardBlock>
          <ListGroup>
            {machines}
          </ListGroup>
        </CardBlock>
      </Card>
    )
  }
}

export default Machines;
