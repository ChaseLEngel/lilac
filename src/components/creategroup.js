import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as GroupActions from '../actions/groupactions'

class CreateGroup extends Component {

  constructor() {
    super()
    this.state = {
      show: false,
      download_path: "",
      link: "",
      name: ""
    }
    this.handleDownloadPathChange = this.handleDownloadPathChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.createGroup = this.createGroup.bind(this)
  }

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show != this.state.show) {
      this.toggle()
    }
  }

  createGroup() {
    var group = {
      name: this.state.name,
      download_path: this.state.download_path,
      link: this.state.link
    }
    GroupActions.createGroup(group)
    this.props.toggle()
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

  handleLinkChange(event) {
    this.setState({
      link: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.show} toggle={this.props.toggle}>
          <ModalHeader>
            New Group
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="groupName">Name</Label>
                <Input type="text" name="name" id="groupName" value={this.state.name} onChange={this.handleNameChange}/>
                <Label for="groupLink">RSS Link</Label>
                <Input type="text" name="link" id="groupLink" value={this.state.link} onChange={this.handleLinkChange}/>
                <Label for="groupDownloadPath">Download Path</Label>
                <Input type="text" name="downloadPath" id="groupDownloadPath" value={this.state.download_path} onChange={this.handleDownloadPathChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createGroup}>Create</Button>
            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateGroup;
