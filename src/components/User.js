import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signOut();
    console.log('sign out')
  }

  displayUsername() {
    if(this.props.user) {
      return <h3>{this.props.user.displayName}</h3>
    }
    else {
      return <h3>Guest</h3>
    }
  }

  render() {
    return(
      <section>
        <section>
          <button id='signIn' onClick={() => this.signIn()}>Sign In</button>
          <button id='signOut' onClick={() => this.signOut()}>Sign Out</button>
        </section>
        <section>
          {this.displayUsername()}
        </section>
      </section>
    )
  }
}

export default User
