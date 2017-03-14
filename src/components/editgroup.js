import React, { Component } from 'react';

import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as GroupActions from '../actions/groupactions'

class EditGroup extends Component {

  constructor(props) {
    super()
    var group = {group_id: "", name: "", link: "", download_path: ""}
    this.state = {
      group: group
    }
    this.downloadPathChange = this.downloadPathChange.bind(this)
    this.linkChange = this.linkChange.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.edit= this.edit.bind(this)
  }

  edit() {
    GroupActions.editGroup(this.state.group)
    this.props.toggler()
  }

  downloadPathChange(event) {
    var group = this.state.group
    group.download_path = event.target.value
    this.setState({
      group: group
    })
  }

  nameChange(event) {
    var group = this.state.group
    group.name = event.target.value
    this.setState({
      group: group
    })
  }

  linkChange(event) {
    var group = this.state.group
    group.link = event.target.value
    this.setState({
      group: group
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      group: nextProps.group
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggler}>
          <ModalHeader>
            Edit Group
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="editGroupName">Name</Label>
                <Input type="text" name="editGroupName" id="editGroupName" value={this.state.group.name} onChange={this.nameChange}/>
                <Label for="editGroupLink">RSS Link</Label>
                <Input type="text" name="editGrouplink" id="editGroupLink" value={this.state.group.link} onChange={this.linkChange}/>
                <Label for="editGroupDownloadPath">Download Path</Label>
                <Input type="text" name="editGroupdownloadPath" id="editGroupDownloadPath" value={this.state.group.download_path} onChange={this.downloadPathChange}/>
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

export default EditGroup;
