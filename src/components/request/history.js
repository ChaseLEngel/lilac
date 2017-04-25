import React, { Component } from 'react';

import {ListGroup, ListGroupItem, Row, Col, Button} from 'reactstrap';

import Helpers from '../../helpers';

class History extends Component {

  sendToMachines() {
   
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
            <Button>Send to machines</Button>
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
