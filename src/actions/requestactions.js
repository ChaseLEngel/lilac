import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getRequests(group_id) {
  api.requests(group_id).then((response) => {
    dispatcher.dispatch({
      type: "GET_REQUESTS",
      status: response.status,
      data: response.data
    });
  })
}
export function createRequest(group_id, request) {
  api.createRequest(group_id, request).then((response) => {
    dispatcher.dispatch({
      type: "CREATE_REQUEST",
      status: response.status,
      data: response.data
    });
  })
}
export function deleteRequest(group_id, request_id) {
  api.deleteRequest(group_id, request_id).then((response) => {
    dispatcher.dispatch({
      type: "DELETE_REQUEST",
      status: response.status,
      data: response.data
    });
  })
}
export function editRequest(request) {
  api.editRequest(request).then((response) => {
    dispatcher.dispatch({
      type: "EDIT_REQUEST",
      status: response.status,
      data: response.data
    });
  })
}
