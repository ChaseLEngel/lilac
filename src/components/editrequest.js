import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as RequestActions from '../actions/requestactions'

class EditRequest extends Component {

  constructor() {
    super()
    var request = {name: "", regex: "", download_path: ""}
    this.state = {
      request: request
    }
    this.downloadPathChange = this.downloadPathChange.bind(this)
    this.regexChange = this.regexChange.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.edit = this.edit.bind(this)
  }

  edit() {
    RequestActions.editRequest(this.state.request)
    this.props.toggler()
  }

  downloadPathChange(event) {
    var request = this.state.request
    request.download_path = event.target.value
    this.setState({
      request: request
    })
  }

  nameChange(event) {
    var request = this.state.request
    request.name = event.target.value
    this.setState({
      request: request
    })
  }

  regexChange(event) {
    var request = this.state.request
    request.regex = event.target.value
    this.setState({
      request: request
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      request: nextProps.request
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggler}>
          <ModalHeader>
            Edit Request
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="editRequestName">Name</Label>
                <Input type="text" name="editRequestName" id="editRequestName" value={this.state.request.name} onChange={this.nameChange}/>
                <Label for="editRequestRegex">Regex</Label>
                <Input type="text" name="editRequestregex" id="editRequestRegex" value={this.state.request.regex} onChange={this.regexChange}/>
                <Label for="editRequestDownloadPath">Download Path (optional)</Label>
                <Input type="text" name="editRequestdownloadPath" id="editRequestDownloadPath" value={this.state.request.download_path} onChange={this.downloadPathChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.edit}>Submit</Button>
            <Button color="secondary" onClick={this.props.toggler}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditRequest;
