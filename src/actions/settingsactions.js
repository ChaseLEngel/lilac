import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getSettings(group_id) {
  api.settings(group_id).then((response) => {
    dispatcher.dispatch({type: "GET_SETTINGS", settings: response.data});
  })
}

export function editSettings(settings) {
  api.editSettings(settings).then((response) => {
    dispatcher.dispatch({type: "EDIT_SETTINGS", settings: response.data});
  })
}
