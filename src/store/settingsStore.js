import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class GroupStore extends EventEmitter {

  constructor() {
    super()
    this.settings = []
  }

  getSettings(group_id) {
    return this.settings.find(function(element) {
      return element.group_id == group_id
    })
  }

  editSettings(settings) {
    this.settings = this.settings.filter(function(element) {
      return element.settings_id != settings.settings_id
    })
    this.settings.push(settings)
  }

  handleActions(action) {
    switch(action.type) {
      case "GET_SETTINGS": {
        this.settings.push(action.settings)
        this.emit("change")
        break
      }
      case "EDIT_SETTINGS": {
        this.editSettings(action.settings)
        this.emit("change")
        break
      }
      default: {}
    }
  }

}

const groupStore = new GroupStore();
dispatcher.register(groupStore.handleActions.bind(groupStore));

export default groupStore;
