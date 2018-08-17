import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import ModalEditRoom from './Modal/ModalEditRoom';
import ModalAddRoom from './Modal/ModalAddRoom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './main.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
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

  render() {
    return (
      <Container>
        <Row>
        <Row>
          <Col><h4>Channels</h4></Col>
        </Row>
        {
          this.state.rooms.map((room, index) =>
            <Container key={index}>
              <div onClick={() => this.props.roomClick(room.key, room.name)}>{room.name}</div>
              <div>
                <ModalEditRoom
                  room={room}
                  index={index}
                  roomName={room.name}
                  roomKey={room.key}
                  editRooms={() => this.editRooms(room, document.getElementById(room.key).value)}
                  deleteRooms={() => this.deleteRooms(room, index)}
                />
              </div>
            </Container>
          )
        }
        </Row>
        <Row>
          <ModalAddRoom
            createRooms={() => this.createRooms(document.getElementById('new').value)}/>
        </Row>
      </Container>
    )
  }
}

export default RoomList;
