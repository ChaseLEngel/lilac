import dispatcher from "../dispatcher";

export function alert(message) {
  dispatcher.dispatch({type: "ALERT", data: message});
}
