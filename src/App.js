import React, { Component } from 'react';
import * as firebase from 'firebase';
import Key from './config.js';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import logo from './logo.svg';
import './App.css';

// Initialize Firebase
var config = Key;

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      activeRoomId: 'undefined',
      activeRoomName: 'Choose a Room',
      user: 'Guest'
    }

  }

  roomClick(room, roomName) {
    this.setState({
      activeRoomId: room,
      activeRoomName: roomName
    })
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  render() {
    return (

      <section>
        <RoomList
          firebase={firebase}
          activeRoomId={this.state.activeRoomId}
          roomClick={(room, roomName) => this.roomClick(room, roomName)}
        />
        <MessageList
          firebase={firebase}
          activeRoomId={this.state.activeRoomId}
          activeRoomName={this.state.activeRoomName}
          user={this.state.user}
        />

        <User
        firebase={firebase}
        setUser={(user) => this.setUser(user)}
        user={this.state.user}
         />
      </section>

    )
  }
}

export default App;
