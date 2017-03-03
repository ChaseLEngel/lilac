import React, { Component } from 'react';

class History extends Component {

  render() {
    return (
      <div>
        <p>{this.props.history.file}</p>
        <p>{this.props.history.timestamp}</p>
      </div>
    );
  }
}

export default History;
