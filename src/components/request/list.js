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
    var sorted = this.state.requests.sort(function (a, b) { return a.name > b.name })
    return sorted.map((request) => {
      return <Request key={request.request_id} request={request}/>
    })
  }

  render() {
    return (
      <Card>
        <CreateRequest toggler={this.toggleCreateRequest} show={this.state.showCreateRequest} group_id={this.props.group_id}/>
        <CardBlock style={{paddingBottom: '0px'}}>
          <CardHeader>
            Requests 
            <Button size="sm" color="secondary" onClick={this.toggleCreateRequest}>New</Button>
          </CardHeader>
        </CardBlock>
        <CardBlock style={{paddingTop: '0px'}}>
          <ListGroup>
            {this.requestsList()}
          </ListGroup>
        </CardBlock>
      </Card>
    )
  }

}

export default RequestList;
