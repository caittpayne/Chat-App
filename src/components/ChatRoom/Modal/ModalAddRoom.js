import React, { Component }from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import './main.css';

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
      <div className='createContainer'>
        <Button className='modalButton' onClick={this.toggle}>Create New</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalBody className='modalContainer'>
            <form>
              <input className='formInput' type='text' id='new' />
            </form>
            <Button className='modalButton' onClick={() => {this.handleClick(); this.props.createRooms(document.getElementById('new').value)}}>Create</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalAddRoom;
