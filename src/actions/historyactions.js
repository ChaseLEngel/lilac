import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getHistory(group_id, request_id) {
  api.history(group_id, request_id).then((response) => {
    dispatcher.dispatch({
      type: "GET_HISTORY",
      status: response.status,
      data: response.data
    });
  })
}

export function deleteHistory(group_id, request_id, history_id) {
  api.deleteHistory(group_id, request_id, history_id).then((response) => {
    dispatcher.dispatch({
      type: "DELETE_HISTORY",
      status: response.status,
      data: response.data
    });
  })
}
