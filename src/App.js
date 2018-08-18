
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Key from './config.js';
import SignIn from './components/SignIn/SignIn';
import ChatRoom from './components/ChatRoom/ChatRoom';
import './App.css';

// Initialize Firebase
var config =  {
   apiKey: "AIzaSyBLukQvoFO_SkxrpflRE1RX8iceeENdhCQ",
   authDomain: "bloc-chat-react-4cbb2.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-4cbb2.firebaseio.com",
   projectId: "bloc-chat-react-4cbb2",
   storageBucket: "bloc-chat-react-4cbb2.appspot.com",
   messagingSenderId: "325252341280"
 };

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
