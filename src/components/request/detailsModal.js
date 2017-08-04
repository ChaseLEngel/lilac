import React, { Component } from 'react'

import {Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import Helpers from '../../helpers'

class DetailsModal extends Component {

  render() {
    var history = this.props.history
    return (
        <Modal isOpen={this.props.show} toggle={this.props.toggler}>
          <ModalHeader>Torrent Details</ModalHeader>

          <ModalBody>
            <div>
              <Label>Name:</Label>
              {history.name}
            </div>

            <div>
              <Label>Size:</Label>
              {Helpers.formatBytes(history.size)}
            </div>

            <div>
              <Label>Files:</Label>
              {history.files.split(',').length}
            </div>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.props.toggler}>Close</Button>
          </ModalFooter>
        </Modal>
    )
  }
}

export default DetailsModal
