import React, { Component }from 'react';
import { Button, Modal, ModalBody} from 'reactstrap';
import './main.css';

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
          <ModalBody className='modalContainer'>
            <form>
              <input className='formInput' type='text' defaultValue={this.props.roomName} id={this.props.roomKey}/>
            </form>
            <div>
            <Button className='modalButton' onClick={() =>{this.handleClick(); this.props.editRooms(this.props.room, document.getElementById(this.props.roomKey).value)}}>Submit</Button>
            </div>
            <Button className='deleteButton' onClick={() =>{this.handleClick(); this.props.deleteRooms(this.props.room, this.props.index)}}>Delete</Button>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalEditRoom;
