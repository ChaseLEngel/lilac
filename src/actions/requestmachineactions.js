import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function getRequestMachines(request_id) {
  api.requestMachines(request_id).then((response) => {
    dispatcher.dispatch({
      type: "GET_REQUEST_MACHINES",
      status: response.status,
      data: response.data
    });
  })
}

export function createRequestMachines(request_id, request_machines) {
  api.createRequestMachines(request_id, request_machines).then((response) => {
    dispatcher.dispatch({
      type: "CREATE_REQUEST_MACHINES",
      status: response.status,
      data: response.data
    });
  })
}
