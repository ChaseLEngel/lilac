import React, { Component } from 'react';

import HistoryStore from '../store/historystore';

class History extends Component {

  render() {
    var history = this.props.history
    return (
      <div>
        <p>{history.file} {history.timestamp}</p>
      </div>
    );
  }
}

export default History;
