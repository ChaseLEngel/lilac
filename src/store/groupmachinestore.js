import { EventEmitter } from "events";

import dispatcher from '../dispatcher';

class GroupMachineStore extends EventEmitter {
  constructor() {
    super()
    
  }
}

const groupMachineStore = new GroupMachineStore();
dispatcher.register(groupMachineStore.handleActions.bind(groupMachineStore));

export default groupMachineStore;
