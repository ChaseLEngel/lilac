import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class AlertStore extends EventEmitter {

  constructor() {
    super()
    this.alert = ""
  }

  setAlert(message) {
      this.alert = message
  }

  getAlert() {
    return this.alert
  }

  handleActions(action) {
    switch(action.type) {
      case "ALERT": {
        this.setAlert(action.data)
        this.emit("change")
      }
    }
  }

}

const alertStore = new AlertStore();
dispatcher.register(alertStore.handleActions.bind(alertStore));
export default alertStore;
