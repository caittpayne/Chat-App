
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Key from './config.js';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import logo from './logo.svg';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// Initialize Firebase
var config = Key;

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      activeRoomId: 'undefined',
      activeRoomName: '',
      user: '',
      hide: 'hide'
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
      user: user,
    })
        if(this.state.user !== null) {
          this.setState({ hide: 'show'})
          console.log(this.state.user)
        }
        else {
          this.setState({ hide: 'hide'})
        }
  }

  render() {
    return (
      <section>
        <RoomList
          firebase={firebase}
          user={this.state.user}
          hide={this.state.hide}
          activeRoomId={this.state.activeRoomId}
          roomClick={(room, roomName) => this.roomClick(room, roomName)}
        />
        <MessageList
          firebase={firebase}
          hide={this.state.hide}
          activeRoomId={this.state.activeRoomId}
          activeRoomName={this.state.activeRoomName}
          user={this.state.user}
        />
        <User
        firebase={firebase}
        setUser={(user) => this.setUser(user)}
        user={this.state.user}
        hide={this.state.hide}
         />
      </section>
    )
  }
}

export default App;
