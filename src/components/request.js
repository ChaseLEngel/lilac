import React, { Component } from 'react';

import History from 'history'
import api from '../utilities/api'

class Request extends Component {

  constructor() {
    super()
    this.state = {
      history: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    api.history(this.props.groupId, this.props.request.request_id).then((response) => {
      this.setState ({
        history: response.data
      })
    })
  }

  render() {
    var request = this.props.request
    var historyList = this.state.history.map((history) =>
      <History key={history.history_id} history={history} />
    )
    return (
      <div>
        <p>Name: {request.name}</p>
        <p>Regex: {request.regex}</p>
        <p>Match Count: {request.match_count}</p>
        <p>Download Path: {request.download_path}</p>
        <h4>History</h4>
        {historyList}
      </div>
    );
  }
}

export default Request;
