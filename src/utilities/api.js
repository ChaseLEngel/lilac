var api = {
  checkGroup(group_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/check"
    return fetch(url, {method: 'POST'})
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  },
  groups() {
    return fetch('http://localhost:8080/groups')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  },
  group(group_id) {
    var url = "http://localhost:8080/groups/"+group_id
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        });
  },
  requests(group_id) {
    return fetch("http://localhost:8080/groups/"+group_id+"/requests")
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  },
  request(group_id, request_id) {
    return fetch("http://localhost:8080/groups/"+group_id+"/requests/"+request_id)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  },
  history(group_id, request_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/requests/"+request_id+"/history"
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  }
}

module.exports = api;
