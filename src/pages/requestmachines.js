import React, { Component } from 'react'

import {  Card, CardBlock, Label, InputGroup, InputGroupAddon, InputGroupButton, Row, Col, Button, Input } from 'reactstrap'

import { browserHistory } from 'react-router'

import * as RequestMachineActions from '../actions/requestmachineactions'
import * as MachineActions from '../actions/machineactions'

import MachineStore from '../store/machinestore'
import RequestMachineStore from '../store/requestmachinestore'

class RequestMachines extends Component {

  constructor(props) {
    super()
    this.state = {
      machines: MachineStore.getMachines(),
      selected: RequestMachineStore.getRequestMachines(props.params.request_id)
    }
  }

  destinationChange = (event) => {
    var id = event.target.name
    var destination = event.target.value

    var obj = this.find(id)
    obj.destination = destination

    var selected = this.delete(id)
    selected.push(obj)
    this.setState({
      selected: selected
    })
  }

  save = () => {
    RequestMachineActions.createRequestMachines(this.props.params.request_id, this.state.selected)
    browserHistory.goBack()
  }

  find = (id) => {
    return this.state.selected.find(function(element) {
      return element.machine_id == id
    })
  }

  delete = (id) => {
    return this.state.selected.filter(function(element) {
      return element.machine_id != id
    })
  }

  select = (event) => {
    var id = event.target.name
    var selected = this.state.selected
    if(this.find(id) === undefined) {
      var obj = {}
      obj.machine_id = id
      obj.destination = ""
      selected.push(obj)
    } else {
      selected = this.delete(id)
    }
    this.setState({
      selected: selected
    })
  }

  getMachines = () => {
    this.setState({
      machines: MachineStore.getMachines()
    })
  }

  getRequestMachines = () => {
    this.setState({
      selected: RequestMachineStore.getRequestMachines(this.props.params.request_id)
    })
  }

  active = (id) => {
    if(this.find(id) === undefined) {
      return false
    }
    return true
  }

  getValue = (id) => {
    var selected = this.find(id)
    if(selected === undefined) {
      return ""
    }
    return selected.destination
  }

  componentWillMount() {
    MachineStore.on("change", this.getMachines)
    RequestMachineStore.on("change", this.getRequestMachines)
  }
  
  componentWillUnmount() {
    MachineStore.removeListener("change", this.getMachines)
    RequestMachineStore.removeListener("change", this.getRequestMachines)
  }

  componentDidMount() {
    MachineActions.getMachines()
    RequestMachineActions.getRequestMachines(this.props.params.request_id)
  }

  machineList = () => {
    return this.state.machines.map((machine) => {
      return (
        <InputGroup>
          <InputGroupAddon>
            <Row>
              <Col sm={{size: 'auto'}}>
                <Label>{machine.host}</Label>
              </Col>
              <Col style={{paddingLeft: '0px'}} lg={{size: 'auto'}}>
                <Input addon type="checkbox" name={machine.machine_id} active={this.active(machine.machine_id)} onClick={this.select} />
              </Col>
            </Row>
          </InputGroupAddon>
          <Input 
            name={machine.machine_id}
            disabled={!this.active(machine.machine_id)}
            placeholder="Destination"
            type="text"
            value={this.getValue(machine.machine_id)}
            onChange={this.destinationChange}
          />
        </InputGroup>
      )})
  }
  
  render() {
    return (
      <Card>
        <CardBlock>
          {this.machineList()}
        </CardBlock>
        <CardBlock>
          <Button style={{justifyContent: 'right'}} color="secondary" onClick={this.save}>Save</Button>
        </CardBlock>
      </Card>
    )
  }
}

export default RequestMachines
