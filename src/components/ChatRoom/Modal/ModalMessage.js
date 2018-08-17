import React, { Component }from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalMessage extends Component {
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
          <input type='text' defaultValue={this.props.messageContent} id={this.props.messageKey}/>
          <button type='button' onClick={() =>{{this.handleClick()}; {this.props.editMessage(this.props.message, document.getElementById(this.props.messageKey).value)}}}>Submit</button>
          <button type='button' onClick={() =>{{this.handleClick()}; {this.props.deleteMessage(this.props.message)}}}>Delete</button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalMessage;
