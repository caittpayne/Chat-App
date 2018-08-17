
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import RoomList from './RoomList';
import MessageList from './MessageList';
import UserInformation from './UserInformation';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state={
      activeRoomId: 'undefined',
      activeRoomName: '',
    }
  }

  roomClick(room, roomName) {
    this.setState({
      activeRoomId: room,
      activeRoomName: roomName
    })
  }

  render() {
    return (
      <Container className={this.props.hideChat} id='chatContainer' fluid='true'>
        <Row>
          <Col id='rooms'>
            <UserInformation
              user={this.props.user}
              hideChat={this.props.hideChat}
              signOut={() => this.props.signOut()}
              />
              <RoomList
              firebase={this.props.firebase}
              user={this.props.user}
              activeRoomId={this.state.activeRoomId}
              roomClick={(room, roomName) => this.roomClick(room, roomName)}
              />
          </Col>
          <Col id='messages'>
            <MessageList
              firebase={this.props.firebase}
              activeRoomId={this.state.activeRoomId}
              activeRoomName={this.state.activeRoomName}
              user={this.props.user}
            />
        </Col>
      </Row>
    </Container>
    )
  }
}

export default ChatRoom;