import React, { Component } from 'react';

import { ListGroup, Card, CardBlock, CardHeader, CardTitle, Button } from 'reactstrap';

import CreateRequest from './create';
import Request from './request';

import RequestStore from '../../store/requeststore';

import * as RequestActions from '../../actions/requestactions';

class RequestList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      requests: [],
      showCreateRequest: false
    }
  }

  toggleCreateRequest = () => {
    this.setState({
      showCreateRequest: !this.state.showCreateRequest
    })  
  }

  getRequests = () => {
    var group_id = this.props.group_id
    this.setState({
      requests: RequestStore.getRequests(group_id)
    })
  }

  componentWillMount() {
    RequestStore.on("change", this.getRequests)
  }

  componentDidMount() {
    RequestActions.getRequests(this.props.group_id)
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
    return (
      <div>
        <CreateRequest toggler={this.toggleCreateRequest} show={this.state.showCreateRequest} group_id={this.props.group_id}/>
        <Card>
          <CardBlock>
            <CardHeader>
              Requests 
              <Button size="sm" color="primary" onClick={this.toggleCreateRequest}>+</Button>
            </CardHeader>
          </CardBlock>
          <CardBlock>
            <ListGroup>
            {this.requestsList()}
            </ListGroup>
          </CardBlock>
        </Card>
      </div>
    )
  }

}

export default RequestList;
