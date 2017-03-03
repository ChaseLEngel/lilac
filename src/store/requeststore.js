import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class RequestStore extends EventEmitter {

  constructor() {
    super()
    this.requests = new Array()
  }

  getRequest(request_id) {
    return this.requests.find(function(element) {
      return element.request_id == request_id
    })
  }

  insertRequests(requests) {
    var currentRequests = this.requests
    if(this.requests == null || this.requests.length == 0) {
      this.requests = requests
      return
    }
    requests.forEach(function(request) {
      var found = false
      currentRequests.forEach(function(element) {
        if(request.request_id === element.request_id) {
          found = true
        }
      })
      if(found === false) {
        currentRequests.push(request)
      }
    })
  }

  getRequests(group_id) {
    var requests = new Array()
    if(this.requests == null || this.requests.length == 0) {
      return []
    }
    this.requests.forEach(function(element) {
      if(element.group_id == group_id) {
        requests.push(element)
      }
    })
    return requests
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_REQUESTS": {
        this.insertRequests(action.requests)
        this.emit("change")
        break
      }
      default: {}
    }
  }

}

const requestStore = new RequestStore();
dispatcher.register(requestStore.handleActions.bind(requestStore));

export default requestStore;
