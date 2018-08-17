
import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import * as firebase from 'firebase';
import Key from './config.js';
import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';
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
      user: '',
      hideChatRoom: 'hide',
      hideSignIn: 'show'
    }

  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut();
  }

  setUser(user) {
    this.setState({
      user: user,
    })
        if(this.state.user !== null) {
          this.setState({
            hideChatRoom: 'show',
            hideSignIn: 'hide'
          })
        }
        else {
          this.setState({
            hideChatRoom: 'hide',
            hideSignIn: 'show'
          })
        }
  }

  render() {
    return (
      <div>
        <SignIn
          firebase={firebase}
          setUser={(user) => this.setUser(user)}
          user={this.state.user}
          hideChat={this.state.hideChatRoom}
          hideLogin={this.state.hideSignIn}
          signIn={() => this.signIn()}
        />
        <ChatRoom
          firebase={firebase}
          user={this.state.user}
          hideChat={this.state.hideChatRoom}
          signOut={() => this.signOut()}
        />
      </div>
    )
  }
}

export default App;
