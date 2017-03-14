import React, { Component } from 'react';

import {Row, Col} from 'reactstrap';

import Helpers from '../helpers';

class History extends Component {

  render() {
    return (
      <Row>
        <Col sm="auto">
        {this.props.history.file}
        </Col>
        <Col sm="auto">
        {Helpers.formatTimestamp(this.props.history.timestamp)}
      </Col>
      </Row>
    );
  }
}

export default History;
