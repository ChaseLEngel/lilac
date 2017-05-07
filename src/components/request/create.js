import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as RequestActions from '../../actions/requestactions'

class CreateRequest extends Component {

  constructor() {
    super()
    var request = {regex: "", download_path: "", name: ""}
    this.state = {
      request: request
    }
  }

  create = () => {
    RequestActions.createRequest(this.props.group_id, this.state.request)
    this.closeModal()
  }

  closeModal = () => {
    this.setState({
      request: {regex: "", download_path: "", name: ""}
    })
    this.props.toggler()
  }

  nameChange = (event) => {
    var request = this.state.request
    request.name = event.target.value
    this.setState({
      request: request
    })
  }

  downloadPathChange = (event) => {
    var request = this.state.request
    request.download_path = event.target.value
    this.setState({
      request: request
    })
  }

  regexChange = (event) => {
    var request = this.state.request
    request.regex = event.target.value
    this.setState({
      request: request
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.closeModal} >
          <ModalHeader>
            New Request
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="requestName">Name</Label>
                <Input type="text" name="name" id="requestName" value={this.state.request.name} onChange={this.nameChange}/>
                <Label for="requestRegex">Reqular Expression</Label>
                <Input type="text" name="regex" id="requestRegex" value={this.state.request.regex} onChange={this.regexChange}/>
                <Label for="requestDownloadPath">Download Path (optional)</Label>
                <Input type="text" name="downloadPath" id="requestDownloadPath" value={this.state.request.download_path} onChange={this.downloadPathChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.create}>Create</Button>
            <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateRequest;
