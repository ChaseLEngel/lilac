import { EventEmitter } from "events";

import dispatcher from '../dispatcher';

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

  editGroup(group) {
    this.deleteGroup(group.group_id)
    this.groups.push(group)
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
      case "CHECK_GROUP": {
        break
      }
      case "CREATE_GROUP": {
        this.groups.push(action.data)
        this.emit("change")
        break
      }
      case "DELETE_GROUP": {
        this.deleteGroup(action.data.group_id)
        this.emit("change")
        break
      }
      case "GET_GROUPS": {
        this.groups = action.data
        this.emit("change")
        break
      }
      case "GET_GROUP": {
        this.getGroup(action.data)
        this.emit("change")
        break
      }
      case "EDIT_GROUP": {
        this.editGroup(action.data)
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
