import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function check(group_id) {
  api.checkGroup(group_id).then((response) => {
    dispatcher.dispatch({
      type: "CHECK_GROUP",
      status: response.status,
      data: {}
    });
  })
}

export function getGroups() {
  api.groups().then((response) => {
    dispatcher.dispatch({
      type: "GET_GROUPS",
      status: response.status,
      data: response.data
    });
  })
}

export function getGroup(id) {
  api.group(id).then((response) => {
    dispatcher.dispatch({
      type: "GET_GROUP",
      status: response.status,
      data: response.data
    });
  })
}

export function createGroup(group) {
  api.createGroup(group).then((response) => {
    dispatcher.dispatch({
      type: "CREATE_GROUP",
      status: response.status,
      data: response.data
    });
  })
}

export function deleteGroup(group_id) {
  api.deleteGroup(group_id).then((response) => {
    dispatcher.dispatch({
      type: "DELETE_GROUP",
      status: response.status,
      data: response.data
    });
  })
}

export function editGroup(group) {
  api.editGroup(group).then((response) => {
    dispatcher.dispatch({
      type: "EDIT_GROUP",
      status: response.status,
      data: response.data
    });
  })
}

export function insertMachines(group, machines) {
  api.groupInsertMachines(group, machines).then((response) => {
    dispatcher.dispatch({
      type: "INSERT_MACHINES",
      status: machines,
      data: {}
    });
  })
}

export function deleteMachine(group, machine) {
  api.groupDelteMachine(group).then((response) => {
    dispatcher.dispatch({
      type: "DELETE_MACHINE",
      status: response.status,
      data: {}
    });
  })
}

export function getMachines(group) {
  api.groupMachines(group).then((response) => {
    dispatcher.dispatch({
      type: "GET_GROUP_MACHINES",
      status: response.status,
      data: response.data
    });
  })
}
