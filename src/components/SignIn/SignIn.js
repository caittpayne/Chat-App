import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { fade: 'fadeOut'};

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
    this.fade();
  }

  fade() {
    for(let i = 1; i < 6; i++) {
      setTimeout(() => {
        const g = document.getElementById(`item${i}`);
        g.classList.toggle('fadeIn')
          setTimeout(() => {
              g.classList.remove('fadeIn');
          }, 1000);
          if(i === 5) {
            setTimeout(() => {
              this.display();
            }, 2000);
          }
      }, 2000 * i);
  }
}

display() {
  const login = document.getElementById('item6');
  login.classList.toggle('fadeIn');

  this.hideGreetings();
}

hideGreetings() {
  const greet = document.getElementById('greetings');
  greet.classList.toggle('hide');
}

  render() {
    return(
      <Container className={this.props.hideLogin} id='landing' fluid='true'>
        <Container id='greetings'>
          <Row className='align-items-center greetContainer'>
            <Col lg='12'>
              <Row className='align-items-center' id='test'>
                <Col><h1 id='item1' className={this.state.fade}>Hello</h1></Col>
                <Col><h1 id='item2'className={this.state.fade}>Hola</h1></Col>
              </Row>
              <Row className='align-items-center'>
                <Col><h1 id='item5' className={this.state.fade}>Namaste</h1></Col>
              </Row>
              <Row className='align-items-center'>
                <Col><h1 id='item4' className={this.state.fade}>Hallo</h1></Col>
                <Col><h1 id='item3' className={this.state.fade}>Bonjour</h1></Col>
              </Row>
            </Col>
          </Row>
          </Container>
          <Container id='item6' className={this.state.fade}>
            <Row className='align-items-center signInForm'>
              <Col lg='12'>
                <Row className='align-items-center faRow'>
                  <Col><i className='far fa-comment fa-10x'></i></Col>
                </Row>
                <Row className='align-items-center signRow'>
                  <Col><h3>Sign in to join the conversation.</h3></Col>
                </Row>
                <Row className='align-items-center signRow'>
                  <Col><Button className='button .btn-round' onClick={() => this.props.signIn()}>Sign In</Button></Col>
                </Row>
              </Col>
            </Row>
          </Container>
      </Container>
    )
  }
}

export default SignIn;
