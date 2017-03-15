import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class AlertStore extends EventEmitter {

  constructor() {
    super()
    this.alert = ""
  }

  setAlert(message) {
      this.alert = message
      this.emit("change")
  }

  getAlert() {
    return this.alert
  }

}

const alertStore = new AlertStore();

export default alertStore;
