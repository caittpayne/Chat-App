import React, { Component }from 'react';
import { Container, Button, Modal, ModalBody } from 'reactstrap';
import './main.css';

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
          <ModalBody className='modalContainer'>
            <form>
              <textarea className='formInput' rows='5' defaultValue={this.props.messageContent} id={this.props.messageKey}/>
            </form>
            <div>
              <Button className='modalButton' onClick={() =>{this.handleClick(); this.props.editMessage(this.props.message, document.getElementById(this.props.messageKey).value)}}>Submit</Button>
            </div>
            <Button className='deleteButton' onClick={() =>{this.handleClick(); this.props.deleteMessage(this.props.message, this.props.index)}}>Delete</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalMessage;
