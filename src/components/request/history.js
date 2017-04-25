import React, { Component } from 'react';

import {ListGroup, ListGroupItem, Row, Col, Button} from 'reactstrap';

import Helpers from '../../helpers';

class History extends Component {

  deleteHistory() {
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
  justifyContent: 'space-between'
}

export default History;
