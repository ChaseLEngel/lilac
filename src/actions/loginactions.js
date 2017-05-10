import dispatcher from "../dispatcher";

import api from "../utilities/api"

export function login(user, password) {
  api.login(user, password).then((response) => {
    dispatcher.dispatch({
      type: "LOGIN",
      status: response.status,
      data: response.data
    });
  })
}
