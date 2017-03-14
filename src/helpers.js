var helpers = {
  formatTimestamp(timestamp) {
    var value = Date.parse(timestamp)    
    var date = new Date(parseFloat(value))
    if(value == -62135596800000) {
      return "Never"
    }
    return (date.getMonth() + 1) + "/" +
      date.getDate() + "/" +
      date.getFullYear() + " " +
      date.getHours() + ":" +
      date.getMinutes() + ":" +
      date.getSeconds()
  }
}

module.exports = helpers;
