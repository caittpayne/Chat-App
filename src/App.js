
import React, { Component } from 'react';
import * as firebase from 'firebase';
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
      hideSignIn: 'show',
      userList: []
    }

    this.usersRef = firebase.database().ref('users');

  }

  componentDidMount() {
    this.usersRef.on('child_added', snapshot => {
      const user = snapshot.val();
      user.key = snapshot.key;
      this.setState({ userList: this.state.userList.concat( user )})
    });
  }

  checkUser() {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.createUser(user.displayName, user.photoURL);
    }
    return;
    });
  }

  createUser(userName, userPhoto) {
    for(let i = 0; i < this.state.userList.length; i++) {
      if(this.state.userList[i].displayName === userName) {
        return true;
      }
    }
    this.usersRef.push({
         admin: 'false',
         displayName: userName,
         photoURL: userPhoto
       });
  }

  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup( provider );
    this.checkUser();
  }

  signOut() {
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

  editUser(checked, index, user) {
    const newArr = [...this.state.userList];
    newArr[index].admin = checked;

    this.usersRef.child(user).update({ admin: checked });
    this.setState({
      userList: newArr,
  });
}

  addUserRooms(room) {
    if (room.isPrivate === true) {
      const users = document.getElementsByName('addUserRoom');
      for (let i = 0; i < users.length; i++) {
        if(users[i].checked === true) {
          const newArr = [...this.state.userList];
          newArr[i].rooms = {
            name: room.name,
            key: room.key
          }
          console.log(users[i])
          this.usersRef.child(users[i].id).child('rooms').push({ name: room.name, key: room.key });
          this.setState({
            userList: newArr
          });
        }
      }
    }
}

  adminFunctions() {
    if(this.state.user) {
    const x =  this.state.userList
        .filter(user => user.displayName === this.state.user.displayName)
        .map(user => user.admin);
        if(x[0] === true) {
          return 'show'
        }
        else {
          return 'hide'
        }
    }
    return;
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
          createUser={() => this.createUser()}
        />
        <ChatRoom
          firebase={firebase}
          user={this.state.user}
          hideChat={this.state.hideChatRoom}
          signOut={() => this.signOut()}
          userList={this.state.userList}
          editUser={(checked, index, user) => this.editUser(checked, index, user)}
          adminFunctions={() => this.adminFunctions()}
          addUserRooms={(isPrivate) => this.addUserRooms(isPrivate)}
        />
      </div>
    )
  }
}

export default App;
