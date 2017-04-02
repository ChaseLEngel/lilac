import React, { Component } from 'react'

//import * as GroupActions from '../../actions/groupactions'

//import GroupMachineStore from '../../store/groupmachinestore'

class MachineList extends Component {

  constructor() {
    super()
    this.state = {
      machines: []
    }
    this.getMachines = this.getMachines.bind(this)
  }

  getMachines() {
    //GroupMachines.getMachines(this.props.group.group_id) 
  }

  componentWillMount() {
    //GroupMachineStore.on("change", this.getMachines)
  }

  componentWillUnmount() {
    //GroupMachineStore.removeListener("change", this.getMachines)
  }

  componentDidMount() {
    //GroupActions.getMachines(this.props.group.group_id)
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default MachineList;
