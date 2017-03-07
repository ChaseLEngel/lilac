import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as RequestActions from '../actions/requestactions'

class EditRequest extends Component {

  constructor() {
    super()
    this.state = {
      show: false,
      request_id: "",
      name: "",
      regex: "",
      download_path: "",
    }
    this.toggle = this.toggle.bind(this)
    this.handleDownloadPathChange = this.handleDownloadPathChange.bind(this)
    this.handleRegexChange = this.handleRegexChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.editRequest = this.editRequest.bind(this)
  }

  editRequest() {
    var request = {
      request_id: this.state.request_id,
      group_id: this.state.group_id,
      name: this.state.name,
      regex: this.state.regex,
      download_path: this.state.download_path
    }
    RequestActions.editRequest(request)
    this.toggle()
  }

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      request_id: nextProps.request.request_id,
      name: nextProps.request.name,
      download_path: nextProps.request.download_path,
      group_id: nextProps.request.group_id,
      regex: nextProps.request.regex
    })
    if(nextProps.show != this.state.show) {
      this.toggle()
    }
  }

  handleDownloadPathChange(event) {
    this.setState({
      download_path: event.target.value
    })
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
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
            Edit Request
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="editRequestName">Name</Label>
                <Input type="text" name="editRequestName" id="editRequestName" value={this.state.name} onChange={this.handleNameChange}/>
                <Label for="editRequestRegex">Regex</Label>
                <Input type="text" name="editRequestregex" id="editRequestRegex" value={this.state.regex} onChange={this.handleRegexChange}/>
                <Label for="editRequestDownloadPath">Download Path</Label>
                <Input type="text" name="editRequestdownloadPath" id="editRequestDownloadPath" value={this.state.download_path} onChange={this.handleDownloadPathChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editRequest}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditRequest;
