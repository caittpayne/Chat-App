import React, { Component } from 'react';
import { Input, FormGroup, Label, Col } from 'reactstrap';
import './main.css';

class PrivateRoom extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: false };

    this.handleCheckClick = this.handleCheckClick.bind(this);
  }

  handleCheckClick() {
    this.setState({ checked: !this.state.checked });
  }

  showRoomUsers() {
    if(this.state.checked === true) {
      return 'show';
    }
    else {
      return 'hide';
    }
  }

  render() {
    return (
      <div className='test'>
      <FormGroup check>
        <Label check>
          <Input type='checkbox' checked={this.state.checked} onChange={this.handleCheckClick} id='privateCheckbox' />{' '}
          Private
        </Label>
      </FormGroup>
      <FormGroup className={this.showRoomUsers()}>
        <legend>Choose Users</legend>
      {
        this.props.userList
          .map((user, index) =>
            <FormGroup row key={index}>
              <Col>
                <Label check>
                  <Input type='checkbox' name='addUserRoom' id={user.key}/>{' '}
                  {user.displayName}
                </Label>
              </Col>
            </FormGroup>
          )
      }
      </FormGroup>
      </div>
    )
  }
}

export default PrivateRoom;
