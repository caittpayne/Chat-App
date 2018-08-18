import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalEditRoom from './Modal/ModalEditRoom';
import ModalAddRoom from './Modal/ModalAddRoom';
import './main.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      roomHovered: false,
      activeRoom: false
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )})
    });
  }

  createRooms(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
    document.getElementById('new').value='';
  }

  editRooms(room, data) {
    const array = [...this.state.rooms];
    const i = array.indexOf(room);
    array[i].name = data;

    this.roomsRef.child(room.key).update({ name: data });
    this.setState({
      rooms: array
    });
  }

  deleteRooms(room, index) {
      const newList = [...this.state.rooms];
      this.roomsRef.child(room.key).remove();
      newList.splice(index, 1);
      this.setState({ rooms: newList });
  }

  showEdit(index) {
    this.setState({ roomHovered: index });
  }

  hideEdit(index) {
    this.setState({ roomHovered: false })
  }

  roomHovered(index) {
      if(this.state.roomHovered ===  index) {
        return 'fadeIn';
        console.log('fadeIn')
      }
      else {
        return 'fadeOutEdit';
        console.log('fadeout')
      }
   }

   activeRoom(index) {
     this.setState({ activeRoom: index})
   }

   highlightRoom(index) {
     if(this.state.activeRoom ===  index) {
       return 'highlight';
     }
     else {
       return;
     }
   }

  render() {
    return (
      <Container id='roomList'>
        <Row>
          <Col id='channels'><h4>Channels</h4></Col>
        </Row>
        {
          this.state.rooms.map((room, index) =>
            <Row  className={this.highlightRoom(index)} key={index} onMouseEnter={() => this.showEdit(index)} onMouseLeave={() => this.hideEdit(index)}>
              <Col sm='10'>
                <div onClick={() => {this.props.roomClick(room.key, room.name); this.activeRoom(index)}}>{room.name}</div>
              </Col>
              <Col sm='2' className={this.roomHovered(index)}>
                <ModalEditRoom
                  room={room}
                  index={index}
                  roomName={room.name}
                  roomKey={room.key}
                  editRooms={() => this.editRooms(room, document.getElementById(room.key).value)}
                  deleteRooms={() => this.deleteRooms(room, index)}
                />
              </Col>
            </Row>
          )
        }
        <Row>
          <Col>
            <ModalAddRoom createRooms={() => this.createRooms(document.getElementById('new').value)}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default RoomList;
