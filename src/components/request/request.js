import React, { Component } from 'react';

import { ButtonGroup, Row, Col, ListGroupItem, Collapse, Button } from 'reactstrap';

import * as HistoryActions from '../../actions/historyactions';

import * as RequestActions from '../../actions/requestactions';

import HistoryStore from '../../store/historystore';

import EditRequest from './edit';
import History from './history';

class Request extends Component {

  constructor(props) {
    super()
    var group_id = props.request.group_id
    var request_id = props.request.request_id
    this.state = {
      showEditModal: false,
      showHistory: false,
      request: props.request,
      history: HistoryStore.getHistory(request_id),
    }
    this.collapseHistory = this.collapseHistory.bind(this)
    this.getHistory = this.getHistory.bind(this)
    this.deleteRequest = this.deleteRequest.bind(this)
    this.toggleEditModal = this.toggleEditModal.bind(this)
  }

  getHistory() {
    var request_id = this.state.request.request_id
    this.setState({
      history: HistoryStore.getHistory(request_id)
    })
  }

  toggleEditModal() {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  deleteRequest() {
    var group_id = this.state.request.group_id
    var request_id = this.state.request.request_id
    RequestActions.deleteRequest(group_id, request_id)
  }

  collapseHistory() {
    this.setState({
      showHistory: !this.state.showHistory
    })
  }

  componentWillMount() {
    HistoryStore.on("change", this.getHistory)
  }

  componentWillUnmount() {
    HistoryStore.removeListener("change", this.getHistory)
  }

  componentDidMount() {
    var group_id = this.state.request.group_id
    var request_id = this.state.request.request_id
    HistoryActions.getHistory(group_id, request_id)
  }

  render() {
    var historyList = this.state.history.map((history) => {
      return <History key={history.match_history_id} history={history} />
    })
    return (
      <div>
        <ListGroupItem>
          <EditRequest toggler={this.toggleEditModal} request={this.state.request} show={this.state.showEditModal} />
          <Row size="lg">
            <Col sm="auto"> {this.props.request.name} </Col>
            <Col sm="auto"> {this.props.request.regex} </Col>
            <Col sm="auto"> {this.props.request.download_path} </Col>
            <Col sm="auto">
              <ButtonGroup size='sm'>
                <Button onClick={this.toggleEditModal}>Edit</Button>
                <Button onClick={this.deleteRequest}>Delete</Button>
                <Button onClick={this.collapseHistory}>History</Button>
              </ButtonGroup>
              <Row>
                <Collapse isOpen={this.state.showHistory}>
                  {historyList}
                </Collapse>
              </Row>
            </Col>
          </Row>
      </ListGroupItem>
      </div>
    );
  }
}

export default Request;
