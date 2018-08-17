import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
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
      return <h3>{this.props.user.displayName}</h3>
    }
    else {
      return
    }
  }

  render() {
    return (
      <Container className={this.props.hideChat}>
        <Row>
          <Col>{this.displayUsername()}
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} size='sm'>
              <DropdownToggle caret>
              </DropdownToggle>
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
