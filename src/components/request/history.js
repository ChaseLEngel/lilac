import React, { Component } from 'react'

import {ListGroup, ListGroupItem, Button, ButtonGroup} from 'reactstrap'

import Helpers from '../../helpers'

import RequestStore from '../../store/requeststore'

import * as HistoryActions from '../../actions/historyactions'

import DetailsModal from './detailsModal'

class History extends Component {

  constructor(props) {
    super()
    this.state = {
      showDetailsModal: false
    }
  }

  deleteHistory = () => {
    var group_id = RequestStore.getRequest(this.props.history.request_id).group_id
    HistoryActions.deleteHistory(
      group_id,
      this.props.history.request_id,
      this.props.history.match_history_id
    )
  }

  toggleDetailsModal = () => {
    this.setState({
      showDetailsModal: !this.state.showDetailsModal
    })
  }

  render() {
    return (
      <div>
        <DetailsModal toggler={this.toggleDetailsModal} history={this.props.history} show={this.state.showDetailsModal} />
        <ListGroup style={ListGroupStyle}>
          <ListGroupItem style={ListGroupItemStyle}>
            <div>
              {this.props.history.title}
            </div>
            <div>
              {Helpers.formatTimestamp(this.props.history.timestamp)}
            </div>
            <div>
              <ButtonGroup size='sm'>
                <Button onClick={this.toggleDetailsModal}>Details</Button>
                <Button onClick={this.deleteHistory}>Delete</Button>
              </ButtonGroup>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
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
