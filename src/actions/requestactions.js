import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getRequests(group_id) {
  api.requests(group_id).then((response) => {
    dispatcher.dispatch({
      type: "GET_REQUESTS",
      requests: response.data
    });
  })
}
