import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function check(group_id) {
  api.checkGroup(group_id).then((response) => {
    dispatcher.dispatch({type: "CHECK_GROUP", data: {}});
  })
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
