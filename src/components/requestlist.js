import React, { Component } from 'react';

import { ListGroup, Button } from 'reactstrap';

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
          <Button onClick={this.toggleCreateRequest}>New Request</Button>
        <CreateRequest toggler={this.toggleCreateRequest} show={this.state.showCreateRequest} group_id={this.props.group_id}/>
        <ListGroup>
          {requests}
        </ListGroup>
      </div>
    )
  }

}

export default RequestList;
