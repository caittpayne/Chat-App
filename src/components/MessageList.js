import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      messages: []
    }

    this.messagesRef = this.props.firebase
      .database()
      .ref('rooms')
  }

    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        snapshot.forEach(messageSnapshot => {
          const message = messageSnapshot.val();
          this.setState({ messages: this.state.messages.concat( message )})
        });
      });
    }

    render() {
      return (
        <section>
          <section className={this.props.activeRoom === 'undefined' ? 'hide' : 'roomName'}>
            <h2>{this.props.activeRoomName}</h2>
          </section>
          <section className='messageList'>
          {
            this.state.messages
              .filter(message => message.roomId == this.props.activeRoomId)
              .map((message, index) =>
                <div key={index}>
                  <p>{message.username}</p>
                  <p>{message.content}</p>
                  <p>{message.sentAt}</p>
                  </div>
                )
              }
          </section>
        </section>
      )
    }
}

export default RoomList
