import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as RequestActions from '../actions/requestactions'

class CreateRequest extends Component {

  constructor(props) {
    super(props)
    // Allow getRequest to access this instance.
    this.state = {
      show: this.props.show,
      regex: "",
      download_path: "",
      name: ""
    }
    this.toggle = this.toggle.bind(this)
    this.handleRegexChange = this.handleRegexChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDownloadPathChange = this.handleDownloadPathChange.bind(this)
    this.createRequest = this.createRequest.bind(this)
  }

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  componentWillReceiveProps(nextProps) {
    this.toggle()
  }

  createRequest() {
    var request = {
      name: this.state.name,
      regex: this.state.regex,
      download_path: this.state.download_path,
    }
    RequestActions.createRequest(this.props.group_id, request)
    this.toggle()
  }


  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleDownloadPathChange(event) {
    this.setState({
      download_path: event.target.value
    })
  }

  handleRegexChange(event) {
    this.setState({
      regex: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.show} toggle={this.toggle}>
          <ModalHeader>
            New Request
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="requestName">Name</Label>
                <Input type="text" name="name" id="requestName" value={this.state.name} onChange={this.handleNameChange}/>
                <Label for="requestRegex">Reqular Expression</Label>
                <Input type="text" name="regex" id="requestRegex" value={this.state.regex} onChange={this.handleRegexChange}/>
                <Label for="requestDownloadPath">Download Path</Label>
                <Input type="text" name="downloadPath" id="requestDownloadPath" value={this.state.download_path} onChange={this.handleDownloadPathChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createRequest}>Create</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateRequest;