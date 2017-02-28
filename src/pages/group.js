import React, { Component } from 'react';


import GroupStore from '../store/groupStore';

class Group extends Component {

  constructor() {
    super()
    this.state = {
      group: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      group: this.getGroup(nextProps.params.groupId)
    })
  }

  getGroup(id) {
    return GroupStore.getGroup(id)
  }

  render() {
    if(this.state.group === undefined) {
      return null
    }
    return (
      <div>
        <p>{this.state.group.name}</p>
      </div>
    );
  }
}

export default Group;
