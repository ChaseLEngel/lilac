import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as GroupActions from '../actions/groupactions'

class EditGroup extends Component {

  constructor() {
    super()
    this.state = {
      show: false,
      group_id: "",
      name: "",
      link: "",
      download_path: "",
    }
    this.toggle = this.toggle.bind(this)
    this.handleDownloadPathChange = this.handleDownloadPathChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.editGroup = this.editGroup.bind(this)
  }

  editGroup() {
    var group = {
      group_id: this.state.group_id,
      name: this.state.name,
      link: this.state.link,
      download_path: this.state.download_path
    }
    GroupActions.editGroup(group)
    this.toggle()
  }

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      group_id: nextProps.group.group_id,
      name: nextProps.group.name,
      download_path: nextProps.group.download_path,
      link: nextProps.group.link
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

  handleLinkChange(event) {
    this.setState({
      link: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.show} toggle={this.toggle}>
          <ModalHeader>
            Edit Group
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="editGroupName">Name</Label>
                <Input type="text" name="editGroupName" id="editGroupName" value={this.state.name} onChange={this.handleNameChange}/>
                <Label for="editGroupLink">RSS Link</Label>
                <Input type="text" name="editGrouplink" id="editGroupLink" value={this.state.link} onChange={this.handleLinkChange}/>
                <Label for="editGroupDownloadPath">Download Path</Label>
                <Input type="text" name="editGroupdownloadPath" id="editGroupDownloadPath" value={this.state.download_path} onChange={this.handleDownloadPathChange}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editGroup}>Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditGroup;
