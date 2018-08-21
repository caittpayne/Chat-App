import React, { Component } from 'react';
import { Container, Row, Col, Button, Input, Form, FormGroup } from 'reactstrap';
import ModalMessage from './Modal/ModalMessage';
import './main.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state= {
      messages: [],
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

      sendMessage(newMessage) {
        this.messagesRef.push({
          content: newMessage,
          roomId: this.props.activeRoomId,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          username: this.props.user.displayName
        });

        document.getElementById('newText').value='';
      }

      editMessage(message, data) {
        const newArr = [...this.state.messages];
        const index = newArr.indexOf(message);
        newArr[index].content = data;

        this.messagesRef.child(message.key).update({ content: data });
        this.setState({
          messages: newArr,
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
        time = `${yyyy}-${mm}-${dd}, ${h}:${min} ${ampm}`;

        return time;
      }

      pickARoom() {
        if(this.props.activeRoomId === 'undefined') {
          return 'show';
        }
        else {
           return 'hide';
         }
      }

      disableSend() {
        if(this.props.activeRoomId === 'undefined' ) {
          return true;
        }
        else {

          return false;
        }
      }

    render() {
      return (
        <div>
        <Container fluid id='messageContainer'>
          <Row className={`align-items-center chooseARoom ${this.pickARoom()}`}>
            <Col lg='12'>
              <i className='far fa-comment fa-10x'/>
              <h2>Choose a Channel</h2>
            </Col>
          </Row>
              {this.state.messages
              .filter(message => message.roomId === this.props.activeRoomId)
              .map((message, index) =>
                <Row key={index} className='messageRow'>
                  <Col>
                    <Row>
                      <Col sm='1'>
                        <img src={this.props.user.photoURL} className='userPhoto' alt='User profile' />
                      </Col>
                      <Col sm='9'>
                        <h6 id='username'>{message.username}</h6>
                        <p className='content'>{message.content}</p>
                      </Col>
                      <Col sm='2'>
                        <p className='content'>{this.formatTime(message.sentAt)}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={{size: 1, offset: 11}}>
                        <ModalMessage
                          message={message}
                          index={index}
                          messageKey={message.key}
                          messageContent={message.content}
                          editMessage={() => this.editMessage(message, document.getElementById(message.key).value)}
                          deleteMessage={() => this.deleteMessage(message, index)} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
          }
          </Container>
          <Container id='sendContainer'>
          <Row>
            <Col>
              <Form>
                <FormGroup row>
                  <Col sm={10}>
                    <Input type='text' id='newText'/>
                  </Col>
                  <Col sm={2}>
                    <Button
                      disabled={this.disableSend()}
                      active id='sendButton'
                      onClick={() => this.sendMessage(document.getElementById('newText').value)}
                      >Send</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </Row>
    </Container>
    </div>
    )
  }
}

export default MessageList;
