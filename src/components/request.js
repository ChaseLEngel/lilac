import React, { Component } from 'react';

import * as HistoryActions from '../actions/historyactions';

import RequestStore from '../store/requeststore';
import HistoryStore from '../store/historystore';

import History from './history';

class Request extends Component {

  constructor() {
    super()
    this.state = {
      request: {},
      history: HistoryStore.getHistory(),
    }
  }

  componentWillReceiveProps(nextProps) {
    var group_id = nextProps.params.group_id
    var request_id = nextProps.params.request_id
    HistoryActions.getHistory(group_id, request_id)
    this.setState({
      request: RequestStore.getRequest(request_id),
    })
  }

  historyList() {
    var history = this.state.history
    if(history == null) {
      return []
    }
    return history.map((history) =>
      <History key={history.match_history_id} history={history} />
    )
  }

  render() {
    var request = this.state.request
    var historyList = this.historyList()
    return (
      <div>
        <p>{request.name}</p>
        <p>{request.regex}</p>
        <p>{request.download_path}</p>
        <h4>History({historyList.length})</h4>
        {historyList}
      </div>
    );
  }
}

export default Request;
