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
  },

  // from http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/
  formatBytes(bytes) {
    var sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }
}

module.exports = helpers;
