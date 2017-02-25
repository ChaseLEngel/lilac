var api = {
  groups() {
      return fetch('http://localhost:8080/groups')
        .then((response) => response.json())
        .catch((error) => {
          console.error(error)
        });
  },

  requests(id) {
    return fetch("http://localhost:8080/groups/"+id+"/requests")
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      });
  }
}

module.exports = api;
