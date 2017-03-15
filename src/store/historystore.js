import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

import AlertStore from './alertstore'

class HistoryStore extends EventEmitter {

  constructor() {
    super()
    this.history = []
  }

  insertHistory(history) {
    var currentHistory = this.history
    if(this.history == null || this.history.length == 0) {
      this.history = history
      return
    }
    history.forEach(function(history) {
      var found = false
      currentHistory.forEach(function(element) {
        if(history.match_history_id === element.match_history_id) {
          found = true
        }
      })
      if(found === false) {
        currentHistory.push(history)
      }
    })
  }

  getHistory(request_id) {
    var history = new Array()
    if(this.history == null || this.history.length == 0) {
      return []
    }
    this.history.forEach(function(element) {
      if(element.request_id == request_id) {
        history.push(element)
      }
    })
    return history
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_HISTORY": {
        this.insertHistory(action.data)
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

const historyStore = new HistoryStore();
dispatcher.register(historyStore.handleActions.bind(historyStore));

export default historyStore;
