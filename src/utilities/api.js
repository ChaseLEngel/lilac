var api = {
  contact(url, method, body) {
    var json = JSON.stringify(body)
    return fetch(url, {method: method, body: json})
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  },
  checkGroup(group_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/check"
    return this.contact(url, 'POST')
  },
  groups() {
    var url = 'http://localhost:8080/groups'
    return this.contact(url, 'GET')
  },
  group(group_id) {
    var url = "http://localhost:8080/groups/"+group_id
    return this.contact(url, 'GET')
  },
  requests(group_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/requests"
    return this.contact(url, 'GET')
  },
  request(group_id, request_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/requests/"+request_id
    return this.contact(url, 'GET')
  },
  history(group_id, request_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/requests/"+request_id+"/history"
    return this.contact(url, 'GET')
  },
  createGroup(group) {
    var url = "http://localhost:8080/groups"
    return this.contact(url, 'POST', group)
  },
  deleteGroup(group_id) {
    var url = "http://localhost:8080/groups/"+group_id
    return this.contact(url, 'DELETE')
  },
  createRequest(group_id, request) {
    var url = "http://localhost:8080/groups/"+group_id+"/requests"
    return this.contact(url, 'POST', request)
  },
  deleteRequest(group_id, request_id) {
    var url = "http://localhost:8080/groups/"+group_id+"/requests/"+request_id
    return this.contact(url, 'DELETE')
  }
}

module.exports = api;
