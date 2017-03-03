import React, { Component } from 'react';

import Request from '../components/request';

import GroupStore from '../store/groupStore';
import RequestStore from '../store/requeststore';

import * as GroupActions from '../actions/groupactions';
import * as RequestActions from '../actions/requestactions';

class Group extends Component {

  constructor() {
    super()
    // Allow getRequest to access this instance.
    this.getRequests = this.getRequests.bind(this)
    this.state = {
      group: {},
      requests: [],
    }
  }

  check() {
    GroupActions.check(this.state.group.group_id)
  }

  getRequests() {
    var group_id = this.props.params.group_id
    this.setState({
      requests: RequestStore.getRequests(group_id),
    })
  }

  getGroup(group_id) {
    this.setState({
      group: GroupStore.getGroup(group_id),
    })
  }

  componentWillMount() {
    RequestStore.on("change", this.getRequests)
  }

  componentWillUnmount() {
    RequestStore.removeListener("change", this.getRequests)
  }

  componentWillReceiveProps(nextProps) {
    var nextGroup_id = nextProps.params.group_id
    RequestActions.getRequests(nextGroup_id)
    this.getGroup(nextGroup_id)
  }

  render() {
    var requestList = this.state.requests.map((request) => {
      return <Request key={request.request_id} request={request} />
    })
    return (
      <div>
        <button onClick={this.check.bind(this)}>Check</button>
        <p>{this.state.group.download_path}</p>
        <p>{this.state.group.link}</p>
        {requestList}
      </div>
    );
  }
}

export default Group;
