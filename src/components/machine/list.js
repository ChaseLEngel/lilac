import React, { Component } from 'react'

import { ListGroup, Button } from 'reactstrap'

import Machine from './machine'

import MachineStore from '../../store/machinestore'

class MachineList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      machines: []
    }
    this.getMachines = this.getMachines.bind(this)
  }

  getMachines() {
    this.setState({
      machines: MachineStore.getMachines(this.props.group_id)
    })
  }

  componentWillMount() {
    MachineStore.on("change", this.getMachines)
  }

  componentWillUnmount() {
    MachineStore.removeListener("change", this.getMachines)
  }

  machineList() {
    return this.state.machines.map((machine) => {
      return <Machine key={machine.machine_id} machine={machine} />
    })
  }

  render() {
    var machine_list = this.machineList()
    return (
      <div>
        <h4>Machines</h4>
        {machine_list.length}
        {machine_list}
      </div>
    )
  }
}

export default MachineList
