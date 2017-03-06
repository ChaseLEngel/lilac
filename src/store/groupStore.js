import { EventEmitter } from "events";

import dispatcher from '../dispatcher'

class GroupStore extends EventEmitter {

  constructor() {
    super()
    this.groups = []
  }

  getGroup(id) {
    return this.groups.find(function(element) {
      return element.group_id == id
    })
  }

  deleteGroup(group_id) {
    this.groups = this.groups.filter(function(element) {
      return element.group_id != group_id
    })
  }

  getGroups() {
    return this.groups;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_GROUP": {
        this.groups.push(action.group)
        this.emit("change")
        break
      }
      case "DELETE_GROUP": {
        console.log("store handleactions:"+action.group.group_id)
        this.deleteGroup(action.group.group_id)
        this.emit("change")
        break
      }
      case "GET_GROUPS": {
        this.groups = action.groups
        this.emit("change")
        break
      }
      case "GET_GROUP": {
        this.getGroup(action.group)
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
