import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class HistoryStore extends EventEmitter {

  constructor() {
    super()
    this.history = new Array()
  }

  getHistory() {
    return this.history;
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_HISTORY": {
        this.history = action.history
        this.emit("change")
        break
      }
      default: {}
    }
  }

}

const historyStore = new HistoryStore();
dispatcher.register(historyStore.handleActions.bind(historyStore));

export default historyStore;
