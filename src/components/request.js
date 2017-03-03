import React, { Component } from 'react';

import * as HistoryActions from '../actions/historyactions';

import RequestStore from '../store/requeststore';
import HistoryStore from '../store/historystore';

import History from './history';

class Request extends Component {

  constructor(props) {
    super()

    this.getHistory = this.getHistory.bind(this)

    var group_id = props.request.group_id
    var request_id = props.request.request_id
    this.state = {
      request: props.request,
      history: HistoryStore.getHistory(request_id),
    }
  }

  getHistory() {
    var request_id = this.state.request.request_id
    this.setState({
      history: HistoryStore.getHistory(request_id)
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
        <strong>{this.props.request.name}</strong>
        <p>{this.props.request.regex}</p>
        <p>{this.props.request.download_path}</p>
        {historyList}
      </div>
    );
  }
}

export default Request;
