import React, { Component } from 'react'

class Machine extends Component {

  render() {
    return (
      <div>
        <p>{this.props.machine.hostname}</p>
        <p>{this.props.machine.credentials}</p>
      </div>
    )
  }
}

export default Machine
