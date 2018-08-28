import React, { Component }from 'react';
import { Row, Col, Button, Modal, ModalBody, Form, Input, Table } from 'reactstrap';
import './main.css';

class Admin extends Component {

  findChecks() {
  const boxes = document.getElementsByName('addAdmin');
  for (let i = 0; i < boxes.length; i++) {
    this.props.editUser(boxes[i].checked, i, boxes[i].id);
  }
}

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} >
          <ModalBody className='modalContainer'>
            <Row>
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Admin</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.userList
                    .map((user, index) =>
                      <tr key={index}>
                        <td>{user.displayName}</td>
                        <td>
                          <Form>
                            <Input
                              type='checkbox'
                              name='addAdmin'
                              id={user.key}
                              defaultChecked={this.props.userList[index].admin}
                            />
                          </Form>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </Row>
              <Row>
                <Col>
                  <Button className='modalButton' onClick={() =>{this.props.handleClick(); this.findChecks()}}>Save</Button>
                </Col>
              </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default Admin;
