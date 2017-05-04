import React, { Component } from 'react';

import { Link } from 'react-router'

import { ButtonGroup, ListGroupItem, Collapse, Button } from 'reactstrap'

import * as HistoryActions from '../../actions/historyactions'
import * as RequestActions from '../../actions/requestactions'

import HistoryStore from '../../store/historystore'
import MachineStore from '../../store/machinestore'

import EditRequest from './edit'
import History from './history'

class Request extends Component {

  constructor(props) {
    super()
    var group_id = props.request.group_id
    var request_id = props.request.request_id
    this.state = {
      showEditModal: false,
      showHistory: false,
      request: props.request,
      history: HistoryStore.getHistory(request_id),
    }
  }

  getHistory = () => {
    var request_id = this.state.request.request_id
    this.setState({
      history: HistoryStore.getHistory(request_id)
    })
  }

  toggleEditModal = () => {
    this.setState({
      showEditModal: !this.state.showEditModal
    })
  }

  deleteRequest = () => {
    var group_id = this.state.request.group_id
    var request_id = this.state.request.request_id
    RequestActions.deleteRequest(group_id, request_id)
  }

  collapseHistory = () => {
    this.setState({
      showHistory: !this.state.showHistory
    })
  }

  historyCollapsed = () => {
    return this.state.showHistory
  }

  historyDisabled = () => {
    return this.state.history.length == 0 ? true : false
  }

  machineDisabled = () => {
    return MachineStore.getMachines().length == 0 ? true : false
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
        <EditRequest toggler={this.toggleEditModal} request={this.state.request} show={this.state.showEditModal} />
        <ListGroupItem className="justify-content-between">
          <div>{this.props.request.regex}</div>
          <div>{this.props.request.download_path}</div>
          <ButtonGroup size='sm'>
            <Button onClick={this.toggleEditModal}>Edit</Button>
            <Button onClick={this.deleteRequest}>Delete</Button>
            <Button active={this.historyCollapsed()} disabled={this.historyDisabled()} onClick={this.collapseHistory}>History</Button>
            <Button disabled={this.machineDisabled()}tag={Link} to={"/requests/"+this.state.request.request_id+"/machines"}>Machines</Button>
          </ButtonGroup>
        </ListGroupItem>
          <Collapse isOpen={this.state.showHistory}>
            {historyList}
          </Collapse>
      </div>
    );
  }
}

export default Request;
