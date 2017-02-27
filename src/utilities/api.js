var api = {
  groups() {
      return fetch('http://localhost:8080/groups')
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        });
  },
  group(groupId) {
    var url = "http://localhost:8080/groups/"+groupId
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        });
  },
  requests(requestId) {
    return fetch("http://localhost:8080/groups/"+requestId+"/requests")
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  },
  history(groupId, requestId) {
    var url = "http://localhost:8080/groups/"+groupId+"/requests/"+requestId+"/history"
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  }
}

module.exports = api;
