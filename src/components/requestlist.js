import React, { Component } from 'react';

import { Button } from 'reactstrap';

import CreateRequest from '../components/createrequest';
import Request from '../components/request';

import RequestStore from '../store/requeststore';

import * as RequestActions from '../actions/requestactions';

class RequestList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requests: [],
      showCreateRequest: false
    }

    this.getRequests = this.getRequests.bind(this)
    this.toggleCreateRequest = this.toggleCreateRequest.bind(this)
  }

  toggleCreateRequest() {
    this.setState({
      showCreateRequest: !this.state.showCreateRequest
    })  
  }

  getRequests() {
    var group_id = this.props.group_id
    this.setState({
      requests: RequestStore.getRequests(group_id)
    })
  }

  componentWillMount() {
    RequestStore.on("change", this.getRequests)
  }

  componentWillUnmount() {
    RequestStore.removeListener("change", this.getRequests)
  }

  requestsList() {
    return this.state.requests.map((request) => {
      return <Request key={request.request_id} request={request}/>
    })
  }

  render() {
    var requests = this.requestsList()
    return (
      <div>
        <h4>
          Requests ({requests.length})
          <Button onClick={this.toggleCreateRequest}>New Request</Button>
        </h4>
        <CreateRequest show={this.state.showCreateRequest} group_id={this.props.group_id}/>
        {requests}
      </div>
    )
  }

}

export default RequestList;
