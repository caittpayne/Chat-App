import React, { Component }from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditRoom extends Component {
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
        <div><i className='fas fa-pencil-alt' onClick={this.toggle}></i></div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalBody>
            <input type='text' defaultValue={this.props.roomName} id={this.props.roomKey}/>
            <button type='button' onClick={() =>{{this.handleClick()}; {this.props.editRooms(this.props.room, document.getElementById(this.props.roomKey).value)}}}>Submit</button>
            <button type='button' onClick={() =>{{this.handleClick()}; {this.props.deleteRooms(this.props.room, this.props.index)}}}>Delete</button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalEditRoom;
