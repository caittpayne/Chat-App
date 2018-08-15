import React, { Component } from 'react';
import './main.css';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      messages: [],
      edit: 'hideEdit'
    }

    this.messagesRef = this.props.firebase
      .database()
      .ref('messages')
  }

    componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message )})
      });
    }

    hideMessages() {
      if(this.props.user) {
        return 'show';
      }
      else {
        return 'hide';
      }
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

      openEdit() {
        this.setState({ edit: 'showEdit' })
      }

      editMessage(message, data) {
      const newArr = [...this.state.messages];
      const index = newArr.indexOf(message);
      newArr[index].content = data;

      this.messagesRef.child(message.key).update({ content: data });
      this.setState({
        messages: newArr,
        edit: 'hideEdit'
      });
    }

      deleteMessage(message, index) {
        const newList = [...this.state.messages];
        this.messagesRef.child(message.key).remove();
        newList.splice(index, 1);
        this.setState({ messages: newList });
      }

      formatTime(time) {
        var date = new Date(time),
          yyyy = date.getFullYear(),
          mm = ('0' + (date.getMonth() + 1)).slice(-2),
          dd = ('0' + date.getDate()).slice(-2),
          hh = date.getHours(),
          h = hh,
          min = ('0' + date.getMinutes()).slice(-2),
          ampm = 'AM';


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
        <section className={this.props.hide}>
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
                  <div>
                  <section className='editMessage'>
                    <button onClick={() => this.openEdit()}>Edit</button>
                    <button onClick={() => this.deleteMessage(message)}>Delete</button>
                  </section>
                    <form className={this.state.edit}>
                      <input type='text' id={message.key} defaultValue={message.content} />
                      <button type='button' onClick={() => this.editMessage(message, document.getElementById(message.key).value)}>Submit</button>
                    </form>
                  </div>
                  </div>
                )
              }
          </section>
          <section>
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
