import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'

import AlertStore from './alertstore'

class MachineStore extends EventEmitter {

  constructor() {
    super()
    this.machines = []
  }

  getMachines() {
    return this.machines
  }

  getMachine(machine_id) {
    return this.machines.find(function(element) {
      return element.machine_id == machine_id
    })
  }

  deleteMachine(machine_id) {
    this.machines = this.machines.filter(function(element) {
      return element.machine_id != machine_id
    })
  }

  editMachine(machine) {
    this.deleteMachine(machine.machine_id)
    this.machines.push(machine)
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_MACHINES": {
        this.machines = action.data
        this.emit("change")
        break
      }
      case "CREATE_MACHINE": {
        this.machines.push(action.data)
        this.emit("change")
        break
      }
      case "EDIT_MACHINE": {
        this.editMachine(action.data)
        this.emit("change")
        break
      }
      case "DELETE_MACHINE": {
        this.deleteMachine(action.data.machine_id)
        this.emit("change")
        break
      }
      default: {}
    }
    if(action.status.error != "") {
      AlertStore.setAlert(action.status.error)
    }
  }
}

const machineStore = new MachineStore()

dispatcher.register(machineStore.handleActions.bind(machineStore))

export default machineStore
