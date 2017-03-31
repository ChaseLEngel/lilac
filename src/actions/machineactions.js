import dispatcher from '../dispatcher'

import api from '../utilities/api'

export function getMachines() {
  api.machines().then((response) => {
    dispatcher.dispatch({
      type: "GET_MACHINES",
      status: response.status,
      data: response.data
    });
  })
}
export function deleteMachine(machine_id) {
  api.deleteMachine(machine_id).then((response) => {
    dispatcher.dispatch({
      type: "DELETE_MACHINE",
      status: response.status,
      data: response.data
    });
  })
}

export function editMachine(machine) {
  api.editMachine(machine).then((response) => {
    dispatcher.dispatch({
      type: "EDIT_MACHINE",
      status: response.status,
      data: response.data
    });
  })
}

export function createMachine(machine) {
  api.createMachine(machine).then((response) => {
    dispatcher.dispatch({
      type: "CREATE_MACHINE",
      status: response.status,
      data: response.data
    });
  })
}
