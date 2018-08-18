import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Username extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  displayUsername() {
    if(this.props.user) {
      return <p><img src={this.props.user.photoURL} className='userPhoto' alt='User account photo'/>Hello, {this.props.user.displayName}</p>
    }
    else {
      return;
    }
  }

  render() {
    return (
      <Container fluid className={this.props.hideChat}>
        <Row>
          <Col sm='10'>{this.displayUsername()}</Col>
          <Col sm='2'>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size='sm' id='dropdownContainer'>
              <DropdownToggle id='signOutDropdown'><i className="fas fa-angle-down roomIcon"></i></DropdownToggle>
              <DropdownMenu>
                <DropdownItem><span onClick={() => this.props.signOut()}>Sign Out</span></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Username;
