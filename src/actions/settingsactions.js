import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getSettings(group_id) {
  api.settings(group_id).then((response) => {
    dispatcher.dispatch({
      type: "GET_SETTINGS",
      status: response.status,
      data: response.data
    });
  })
}

export function editSettings(settings) {
  api.editSettings(settings).then((response) => {
    dispatcher.dispatch({
      type: "EDIT_SETTINGS",
      status: response.status,
      data: response.data
    });
  })
}
