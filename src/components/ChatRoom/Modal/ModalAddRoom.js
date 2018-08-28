import React, { Component }from 'react';
import { Button, Modal, ModalBody, Form, Input, FormGroup } from 'reactstrap';
import PrivateRoom from './PrivateRoom';
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
            <Form>
              <FormGroup>
                <Input className='formInput' type='text' id='newRoom' />
              </FormGroup>
              <FormGroup className={this.props.adminFunctions()}><PrivateRoom userList={this.props.userList}/></FormGroup>
              <FormGroup>
            <Button className='modalButton' onClick={() => {this.handleClick(); this.props.createRooms(document.getElementById('newRoom').value, document.getElementById('privateCheckbox').checked)}}>Create</Button>
            </FormGroup>
          </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalAddRoom;
