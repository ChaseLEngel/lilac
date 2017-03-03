import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getHistory(group_id, request_id) {
  api.history(group_id, request_id).then((response) => {
    dispatcher.dispatch({
      type: "GET_HISTORY",
      history: response.data
    });
  })
}
