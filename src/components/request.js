import React, { Component } from 'react';

import { Collapse, Button } from 'reactstrap';

import * as HistoryActions from '../actions/historyactions';

import * as RequestActions from '../actions/requestactions';

import HistoryStore from '../store/historystore';

import EditRequest from './editrequest';
import History from './history';

class Request extends Component {

  constructor(props) {
    super()
    var group_id = props.request.group_id
    var request_id = props.request.request_id
    this.state = {
      showModal: false,
      collapsed: false,
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
      showModal: !this.state.showModal
    })
  }

  deleteRequest() {
    var group_id = this.state.request.group_id
    var request_id = this.state.request.request_id
    RequestActions.deleteRequest(group_id, request_id)
  }

  collapseHistory() {
    this.setState({
      collapsed: !this.state.collapsed
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
        <EditRequest request={this.state.request} show={this.state.showModal} />
        <strong>{this.props.request.name}</strong>
        <Button size="sm" onClick={this.toggleEditModal}>Edit Request</Button>
        <Button size="sm" onClick={this.deleteRequest}>Delete Request</Button>
        <p>{this.props.request.regex}</p>
        <p>{this.props.request.download_path}</p>
        <Button size='sm' onClick={this.collapseHistory}>History</Button>
        <Collapse isOpen={this.state.collapsed}>
          {historyList}
        </Collapse>
      </div>
    );
  }
}

export default Request;
