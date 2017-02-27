import React, { Component } from 'react';

import api from '../utilities/api';

import Request from '../components/request'

class Group extends Component {

  constructor() {
    super()
    this.state = {
      group: {},
      requests: []
    }
  }

  componentWillReceiveProps(nextProps) {
    api.group(nextProps.params.groupId).then((response) => {
      this.setState ({
        group: response.data
      })
    })
    api.requests(nextProps.params.groupId).then((response) => {
      this.setState ({
        requests: response.data
      })
    })
  }

  render() {
    var group = this.state.group
    var requestList = this.state.requests.map((request) =>
      <Request key={request.request_id} groupId={group.group_id} request={request}/>
    ) 
    return (
      <div>
        <p>Name: {group.name}</p>
        <p>Link: {group.link}</p>
        <p>Download Path: {group.download_path}</p>
        <h4>Requests({requestList.length})</h4>
        {requestList}
      </div>
    );
  }
}

export default Group;
