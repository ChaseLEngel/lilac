import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

import AlertStore from './alertstore'

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

  editRequest(request) {
    this.deleteRequest(request.request_id)
    this.requests.push(request)
  }

  deleteRequest(request_id) {
    this.requests = this.requests.filter(function(element) {
      return element.request_id != request_id
    })
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_REQUESTS": {
        this.insertRequests(action.data)
        this.emit("change")
        break
      }
      case "CREATE_REQUEST": {
        this.requests.push(action.data)
        this.emit("change")
        break
      }
      case "DELETE_REQUEST": {
        this.deleteRequest(action.data.request_id)
        this.emit("change")
        break
      }
      case "EDIT_REQUEST": {
        this.editRequest(action.data)
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
