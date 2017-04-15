import * as AlertActions from '../actions/alertactions'

const URL = "http://localhost:8080"

function contact(url, method, body) {
  var json = JSON.stringify(body)
  return fetch(url, {method: method, body: json})
    .then((response) => response.json())
    .then((json) => {
      if(json.status.code != 200 || json.status.error != "") {
        AlertActions.alert(json.status.error)
      }
      return json
    })
    .catch((error) => {
      AlertActions.alert("Couldn't contact server.")
      console.error(error)
    });
}

var api = {
  checkGroup(group_id) {
    var uri = URL+"/groups/"+group_id+"/check"
    return contact(uri, 'POST')
  },
  groups() {
    var uri = URL+"/groups"
    return contact(uri, 'GET')
  },
  group(group_id) {
    var uri = URL+"/groups/"+group_id
    return contact(uri, 'GET')
  },
  requests(group_id) {
    var uri = URL+"/groups/"+group_id+"/requests"
    return contact(uri, 'GET')
  },
  request(group_id, request_id) {
    var uri = URL+"/groups/"+group_id+"/requests/"+request_id
    return contact(uri, 'GET')
  },
  history(group_id, request_id) {
    var uri = URL+"/groups/"+group_id+"/requests/"+request_id+"/history"
    return contact(uri, 'GET')
  },
  createGroup(group) {
    var uri = URL+"/groups"
    return contact(uri, 'POST', group)
  },
  deleteGroup(group_id) {
    var uri = URL+"/groups/"+group_id
    return contact(uri, 'DELETE')
  },
  createRequest(group_id, request) {
    var uri = URL+"/groups/"+group_id+"/requests"
    return contact(uri, 'POST', request)
  },
  deleteRequest(group_id, request_id) {
    var uri = URL+"/groups/"+group_id+"/requests/"+request_id
    return contact(uri, 'DELETE')
  },
  editGroup(group) {
    var uri = URL+"/groups/"+group.group_id
    return contact(uri, 'PUT', group)
  },
  editRequest(request) {
    var uri = URL+"/groups/"+request.group_id+"/requests/"+request.request_id
    return contact(uri, 'PUT', request)
  },
  settings(group_id) {
    var uri = URL+"/groups/"+group_id+"/settings"
    return contact(uri, 'GET')
  },
  editSettings(settings) {
    // Backend expects integer not string for interval.
    settings.interval = parseInt(settings.interval)
    var uri = URL+"/groups/"+settings.group_id+"/settings"
    return contact(uri, 'POST', settings)
  },
  machines() {
    var uri = URL+"/machines"
    return contact(uri, 'GET')
  },
  editMachine(machine) {
    var uri = URL+"/machines/"+machine.machine_id
    return contact(uri, 'PUT', machine)
  },
  deleteMachine(machine_id) {
    var uri = URL+"/machines/"+machine_id
    return contact(uri, 'DELETE')
  },
  createMachine(machine) {
    var uri = URL+"/machines"
    return contact(uri, 'POST', machine)
  },
  createRequestMachines(request_id, request_machines) {
    var uri = URL+"/requests/"+request_id+"/machines"
    return contact(uri, 'POST', request_machines)
  },
  requestMachines(request_id) {
    var uri = URL+"/requests/"+request_id+"/machines"
    return contact(uri, 'GET')
  }
}

module.exports = api;
