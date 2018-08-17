import React, { Component }from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalAddRoom extends Component {
  constructor(props) {
    super(props);

    this.state ={
      modal: false
    };

     this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick() {
    this.toggle();
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Create</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalBody>
            <form>
              <input type='text' id='new' />
            </form>
            <Button onClick={() => {{this.handleClick()}; {this.props.createRooms(document.getElementById('new').value)}}}>Create</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalAddRoom;
