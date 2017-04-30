import React, { Component } from 'react'

import {ListGroup, ListGroupItem, Row, Col, Button} from 'reactstrap'

import Helpers from '../../helpers'

import RequestStore from '../../store/requeststore'

import * as HistoryActions from '../../actions/historyactions'

class History extends Component {

  deleteHistory = () => {
    var group_id = RequestStore.getRequest(this.props.history.request_id).group_id
    HistoryActions.deleteHistory(
      group_id,
      this.props.history.request_id,
      this.props.history.match_history_id
    )
  }

  render() {
    return (
      <ListGroup style={ListGroupStyle}>
        <ListGroupItem style={ListGroupItemStyle}>
          <div>
            {this.props.history.file}
          </div>
          <div>
            {Helpers.formatTimestamp(this.props.history.timestamp)}
          </div>
          <div>
            <Button size='sm' onClick={this.deleteHistory}>Delete</Button>
          </div>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

const ListGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const ListGroupItemStyle = {
  flex: 1,
  justifyContent: 'space-between',
  background: '#FCFCFC'
}

export default History;
