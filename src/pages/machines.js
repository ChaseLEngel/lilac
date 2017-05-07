import React, { Component } from 'react'

import { Card, CardBlock, CardHeader, Button, ListGroup } from 'reactstrap'

import MachineItem from '../components/machine/item'

import MachineStore from '../store/machinestore'

import CreateMachineModal from '../components/machine/createModal'

class Machines extends Component {

  constructor() {
    super()
    this.state = {
      machines: MachineStore.getMachines(),
      showCreateModal: false
    }
  }

  toggleCreateModal = () => {
    this.setState({
      showCreateModal: !this.state.showCreateModal
    })
  }

  getMachines = () => {
    this.setState({
      machines: MachineStore.getMachines()
    })
  }

  machineList = () => {
    return this.state.machines.map((machine) => {
      return <MachineItem
        key={machine.machine_id}
        machine={machine}
        />
    })
  }

  componentWillMount() {
    MachineStore.on("change", this.getMachines)
  }

  componentWillUnmount() {
    MachineStore.removeListener("change", this.getMachines)
  }

  render() {
    return (
      <Card>
          <CreateMachineModal toggler={this.toggleCreateModal} show={this.state.showCreateModal} />
        <CardHeader>
          Machines
          <Button color="secondary" size="sm" onClick={this.toggleCreateModal}>New</Button>
        </CardHeader>
        <CardBlock>
          <ListGroup>
            {this.machineList()}
          </ListGroup>
        </CardBlock>
      </Card>
    )
  }
}

export default Machines;
