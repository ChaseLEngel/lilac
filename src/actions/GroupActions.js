import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function createGroup(name) {
  dispatcher.dispatch({
    type: "CREATE_GROUP",
    name,
  });
}

export function deleteGroup(id) {
  dispatcher.dispatch({
    type: "DELETE_GROUP",
    id,
  });
}

export function getGroups() {
  api.groups().then((response) => {
    dispatcher.dispatch({type: "GET_GROUPS", groups: response.data});
  })
}

export function getGroup(id) {
  api.group(id).then((response) => {
    dispatcher.dispatch({type: "GET_GROUP", group: response.data});
  })
}
