import React, { Component } from 'react';

import {ListGroup, ListGroupItem, Row, Col} from 'reactstrap';

import Helpers from '../../helpers';

class History extends Component {

  render() {
    return (
      <ListGroup style={ListGroupStyle}>
        <ListGroupItem style={ListGroupItemStyle}>
          {this.props.history.file}
          {Helpers.formatTimestamp(this.props.history.timestamp)}
        </ListGroupItem>
      </ListGroup>
    );
  }
}

const ListGroupStyle = {
  display: 'flex',
  flexDirection: 'row'
}

const ListGroupItemStyle = {
  flex: 1
}

export default History;
