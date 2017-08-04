import { EventEmitter } from "events";

import dispatcher from '../dispatcher';

import { browserHistory } from 'react-router';

class LoginStore extends EventEmitter {

  saveToken = (token) => {
    localStorage.setItem('lilacToken', token);
  }

  tokenExists = () => {
    var ret = this.getToken() != null
    return ret
  }

  getToken = () => {
    return localStorage.getItem('lilacToken')
  }

  deleteToken = () => {
    localStorage.removeItem('lilacToken')
  }

  handleActions(action) {
    switch(action.type) {
      case "LOGIN": {
        if(action.status.code == 401) {
          return
        }
        this.saveToken(action.data.token)
        browserHistory.push('/')
        this.emit("change")
        break
      }
      default: {}
    }
  }
}

const loginStore = new LoginStore();
dispatcher.register(loginStore.handleActions.bind(loginStore));
export default loginStore;
