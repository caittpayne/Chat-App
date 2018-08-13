import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      messages: []
    }

    this.messagesRef = this.props.firebase
      .database()
      .ref('messages')
  }

    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        this.setState({ messages: this.state.messages.concat( message )})
      });
    }

      sendMessage(newMessage) {
        this.messagesRef.push({
          content: newMessage,
          roomId: this.props.activeRoomId,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          username: this.props.user.displayName
        });

        document.getElementById('newText').value='';
      }

      formatTime(time) {
        var date = new Date(time),
          yyyy = date.getFullYear(),
          mm = ('0' + (date.getMonth() + 1)).slice(-2),
          dd = ('0' + date.getDate()).slice(-2),
          hh = date.getHours(),
          h = hh,
          min = ('0' + date.getMinutes()).slice(-2),
          ampm = 'AM',
          time;


        if (hh > 12) {
          h = hh -12;
          ampm = 'PM';
        }
        else if (hh === 12) {
          h = 12;
          ampm = 'PM'
        }
        else if (hh === 0) {
          h = 12;
        }

        time = yyyy + '-' + mm + '-' + dd + ','+ ' ' + h + ':' + min + ' ' + ampm;

        return time;
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
              .filter(message => message.roomId === this.props.activeRoomId)
              .map((message, index) =>
                <div key={index}>
                  <p>{message.username}</p>
                  <p>{message.content}</p>
                  <p>{this.formatTime(message.sentAt)}</p>
                  </div>
                )
              }
          </section>
          <section className='send'>
            <form>
              <input type='text' id='newText'/>
              <button type='button' onClick={() => this.sendMessage(document.getElementById('newText').value)}>Send</button>
            </form>
          </section>
        </section>
      )
    }
}

export default RoomList
