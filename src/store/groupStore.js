import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class GroupStore extends EventEmitter {

  constructor() {
    super()

    this.groups = []
  }

  getGroup(id) {
    var group = this.groups.find(function(element) {
      return element.group_id == id
    })
    return group
  }

  getGroups() {
    return this.groups;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_GROUP": {
        this.createGroup(action.name)
      }
      case "GET_GROUPS": {
        this.groups = action.groups
        this.emit("change")
      }
      case "GET_GROUP": {
        this.getGroup(action.group)
        this.emit("change")
      }
    }
  }

}

const groupStore = new GroupStore();
dispatcher.register(groupStore.handleActions.bind(groupStore));

window.dispatcher = dispatcher;

export default groupStore;
