import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as GroupActions from '../../actions/groupactions'

class CreateGroup extends Component {

  constructor() {
    super()
    var group = {name: "", link: "", download_path: ""}
    this.state = {
      group: group
    }
  }

  closeModal = () => {
    this.setState({
      group: {name: "", link: "", download_path: ""}
    })
    this.props.toggler()
  }

  create = () => {
    GroupActions.createGroup(this.state.group)
    this.closeModal()
  }

  downloadPathChange = (event) => {
    var group = this.state.group
    group.download_path = event.target.value
    this.setState({
      group: group
    })
  }

  nameChange = (event) => {
    var group = this.state.group
    group.name = event.target.value
    this.setState({
      group: group
    })
  }

  linkChange = (event) => {
    var group = this.state.group
    group.link = event.target.value
    this.setState({
      group: group
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.closeModal}>
          <ModalHeader>
            New Group
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="groupname">Name</Label>
                <Input type="text" name="name" id="groupname" value={this.state.group.name} onChange={this.nameChange}/>
                <Label for="grouplink">RSS Link</Label>
                <Input type="text" name="link" id="grouplink" value={this.state.group.link} onChange={this.linkChange}/>
                <Label for="groupdownloadPath">Download Path</Label>
                <Input type="text" name="downloadPath" id="groupdownloadPath" value={this.state.group.download_path} onChange={this.downloadPathChange}/>
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

export default CreateGroup;
