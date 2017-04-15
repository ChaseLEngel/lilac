import { EventEmitter } from "events";

import dispatcher from '../dispatcher';

class RequestMachineStore extends EventEmitter {

  constructor() {
    super()
    this.request_machines = []
  }

  getRequestMachines(request_id) {
    var found = this.request_machines.filter(function(element) {
      return element.request_id == request_id
    })
    if(found === undefined) {
      return []
    }
    return found
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_REQUEST_MACHINES": {
        this.request_machines = action.data
        this.emit("change")
        break
      }
      case "CREATE_REQUEST_MACHINES": {
        this.request_machines = action.data
        this.emit("change")
        break
      }
      default: {}
    }
  }

}

const requestMachineStore = new RequestMachineStore();
dispatcher.register(requestMachineStore.handleActions.bind(requestMachineStore));

export default requestMachineStore;
