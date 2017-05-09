import React, { Component } from 'react';

import { Row, Col, Input, Button } from 'reactstrap'

import * as LoginActions from '../actions/loginactions'

import LoginStore from '../store/loginstore'

const h1Style = {
  marginBottom: '-15px',
}

const LoginStyle = {
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  height: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

class Login extends Component {

  constructor() {
    super()
    this.state = {
      user: "",
      password: ""
    }
  }

  userChange = (event) => {
    this.setState({
      user: event.target.value
    })
  }

  passwordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  login = () => {
    LoginActions.login(this.state.user, this.state.password)
  }

  render() {
    return (
      <div style={LoginStyle}>
        <Row>
          <Col>
            <h1 style={h1Style}>Lilac</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <Input placeholder='User' type='text' onChange={this.userChange}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input placeholder='Password' type='password' onChange={this.passwordChange}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color='secondary' onClick={this.login}>Login</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
